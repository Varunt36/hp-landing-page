# Country Quota Check — Design Spec

**Date:** 2026-03-24
**Branch:** nikul-ui-admin

---

## Problem

The `country_quotas` table defines a maximum number of members (`max_members`) per country. Currently the registration form does not enforce this limit — a country can be overbooked.

---

## Goal

Block registration when a country's quota is exhausted, and give the user a clear message to contact their enquiry person.

---

## Scope

Frontend-only change. No backend or database schema changes required.

---

## Rules

1. **Only paid registrations count.** Join `registrations` with `payments` where `payments.status = 'paid'`.
2. **Strict group-size check.** If `max_members - used < requestedMembers` → block.
3. **Two trigger points:** on country selection change (inline warning) and on "Next" click (hard block with popup).
4. **Fail open.** If the Supabase query fails, allow the user to proceed. The backend enforces the real gate.

---

## New File: `src/api/quota.ts`

### Return type

```typescript
export interface QuotaResult {
  allowed: boolean
}
```

`remaining` is intentionally omitted — it is not displayed in any UI element and exposing it in the public interface would be dead surface area.

### Failure fallback

If any Supabase query throws (network error, RLS denial), catch the error, log it, and return `{ allowed: true }` — fail open so transient errors do not permanently block registration.

### Implementation

Two sequential Supabase JS client calls (no raw SQL, no RPC — both use the query builder API):

**Step 1 — fetch quota**

```typescript
const { data: quotaRow, error: quotaError } = await supabase
  .from('country_quotas')
  .select('max_members')
  .eq('country_code', countryCode)
  .single()

if (quotaError || !quotaRow) return { allowed: true }  // no quota row → unrestricted
```

**Step 2 — fetch registrations for the country**

```typescript
const { data: regs, error: regsError } = await supabase
  .from('registrations')
  .select('id, member_count')
  .eq('country', countryCode)

if (regsError) return { allowed: true }
if (!regs || regs.length === 0) return { allowed: quotaRow.max_members >= requestedMembers }
```

**Step 3 — fetch paid payment IDs**

Avoids embedded joins entirely (and the array-vs-object ambiguity they introduce). Queries `payments` directly:

```typescript
const regIds = regs.map(r => r.id)

const { data: paidPayments, error: pmtError } = await supabase
  .from('payments')
  .select('registration_id')
  .in('registration_id', regIds)
  .eq('status', 'paid')

if (pmtError) return { allowed: true }
```

**Step 4 — aggregate client-side**

```typescript
const paidIds = new Set((paidPayments ?? []).map(p => p.registration_id))
const used = regs
  .filter(r => paidIds.has(r.id))
  .reduce((sum, r) => sum + r.member_count, 0)

return { allowed: quotaRow.max_members - used >= requestedMembers }
```

### Country code contract

The `country` column in `registrations` stores ISO codes (e.g. `'DE'`, `'GB'`), matching `country_quotas.country_code`. This is guaranteed by `Step1GroupInfo.tsx` using `c.code` (not `c.label`) as the Select value. Do not change the Select value to `c.label`.

---

## Component Changes — `Step1GroupInfo.tsx`

### New local state

```typescript
const [quotaBlocked,  setQuotaBlocked]  = useState(false)
const [checkingQuota, setCheckingQuota] = useState(false)
const [popupOpen,     setPopupOpen]     = useState(false)
```

### Race condition handling — generation counter

Supabase JS v2 does not support `AbortSignal`, so AbortController cannot cancel in-flight requests. Instead, use a generation counter to discard stale results:

```typescript
const checkGenRef = useRef(0)

const runQuotaCheck = async (countryCode: string, members: number) => {
  const gen = ++checkGenRef.current
  setCheckingQuota(true)
  const result = await checkCountryQuota(countryCode, members)
  if (gen !== checkGenRef.current) {
    // Stale result — a newer check is already in flight or has completed.
    // Do NOT clear checkingQuota here — the winning call owns that state
    // and is still running (or has already cleared it). Touching it here
    // would prematurely remove the spinner while the winning call runs.
    // Do NOT touch quotaBlocked for the same reason.
    return
  }
  setQuotaBlocked(!result.allowed)
  setCheckingQuota(false)
}
```

`checkGenRef` is only incremented inside `runQuotaCheck` — never externally — to prevent the ref advancing without a corresponding async call that would eventually clear `checkingQuota`.

### Initial mount check

On mount, run the quota check for the current `country` and `memberCount` values (which default to `'DE'` and `1` from the store):

```typescript
useEffect(() => {
  runQuotaCheck(country, memberCount)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // Intentional mount-only check — changes are handled by onChange handlers above
}, [])
```

If the default country (`'DE'`) is already over quota, the user sees the inline warning immediately. This is intentional — a user who loads the page when Germany is full should know before interacting.

### On country change

```typescript
const handleCountryChange = (newCountry: string) => {
  setCountry(newCountry)
  runQuotaCheck(newCountry, memberCount)
}
```

### On member count change

```typescript
const handleMemberCountChange = (newCount: number) => {
  setMemberCount(newCount)
  runQuotaCheck(country, newCount)
}
```

### On Next click — validation order

1. **Synchronous field validation first** — if `karyakarta` is blank, show field error and return. No async call.
2. **Always re-check quota** — never trust cached `quotaBlocked` state. The quota may have freed up (a payment failed) or filled up (another group paid) since the last inline check. Always do a fresh Supabase check as the hard gate. `checkingQuota` is set to `true` immediately to disable the button and prevent double-clicks.

`handleNext` must be `async`:

```typescript
const handleNext = async () => {
  if (!karyakarta.trim()) {
    setKaryakartaError('Local karyakarta name is required.')
    return
  }

  // Always re-check — do not trust cached quotaBlocked state.
  // Disabling the button (checkingQuota=true) prevents concurrent calls.
  setCheckingQuota(true)
  const result = await checkCountryQuota(country, memberCount)
  setCheckingQuota(false)

  if (!result.allowed) {
    setQuotaBlocked(true)   // sync inline Alert with re-check result
    setPopupOpen(true)
    return
  }

  setQuotaBlocked(false)    // clear stale inline warning if quota freed up
  setGroupInfo({ country, karyakarta, memberCount })
  setStep(2)
}
```

### Inline Alert placement

The MUI `Alert` is rendered **inside** `<Box sx={step1Styles.fieldStack}>`, immediately after the country `<FormControl>` and before the karyakarta `<TextField>`. This keeps it within the shared gap spacing.

Shown only when `quotaBlocked && !checkingQuota`. Country name resolved via:

```typescript
COUNTRIES.find(c => c.code === country)?.label ?? country
```

Alert message:

```
Registration for [Country Name] is currently full. Please select a different country or contact your enquiry person.
```

`severity="warning"`.

### Next button loading state

While `checkingQuota === true`, the Next button is `disabled` and renders a `CircularProgress` (size 20) in place of the arrow label.

---

## Popup — MUI Dialog

In MUI v5, `disableBackdropClick` was removed. The correct approach is a no-op `onClose` combined with `disableEscapeKeyDown`. The no-op suppresses both backdrop clicks and Escape key (even though `disableEscapeKeyDown` also handles Escape — belt and suspenders):

```tsx
<Dialog
  open={popupOpen}
  onClose={() => {}}        // no-op: suppresses backdrop click AND Escape (MUI v5 pattern)
  disableEscapeKeyDown      // extra guard for Escape key
  aria-describedby="quota-dialog-description"
>
  <DialogContent>
    <Typography id="quota-dialog-description">
      Jay Swaminarayan Bhagat,<br />
      Registration is not possible please contact responsible enquiry person.
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setPopupOpen(false)}>Close</Button>
  </DialogActions>
</Dialog>
```

After clicking Close the user remains on Step 1 and can select a different country.

---

## Files Changed

| File | Change |
|------|--------|
| `src/api/quota.ts` | **New file** — exports `checkCountryQuota()` and `QuotaResult` |
| `src/components/form/Step1GroupInfo.tsx` | Add quota check logic, inline Alert, Dialog popup |

No changes to: `src/api/registrations.ts`, store, other steps, backend, DB schema.
