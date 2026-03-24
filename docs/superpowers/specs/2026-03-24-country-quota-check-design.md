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

1. **Only paid registrations count.** `registrations` joined with `payments` where `payments.status = 'paid'`.
2. **Strict group-size check.** If `max_members - used < requestedMembers` → quota exceeded (not just if it reaches 0).
3. **Two trigger points:** on country selection change (inline warning) and on "Next" click (hard block with popup).

---

## Data Query

`checkCountryQuota(countryCode: string, requestedMembers: number)` in `src/api/registrations.ts`:

```typescript
const { data } = await supabase
  .from('country_quotas')
  .select(`
    max_members,
    registrations!inner (
      member_count,
      payments!inner ( status )
    )
  `)
  .eq('country_code', countryCode)
  .eq('registrations.payments.status', 'paid')
  .single()
```

Or equivalently as a raw aggregation via `supabase.rpc` / chained query. The function returns:

```typescript
interface QuotaResult {
  allowed: boolean    // true if remaining >= requestedMembers
  remaining: number   // max_members - used
}
```

If `country_quotas` has no row for the country, the function returns `{ allowed: true, remaining: Infinity }` — unregistered countries are unrestricted.

---

## Component Changes — `Step1GroupInfo.tsx`

### New local state

```typescript
const [quotaBlocked,   setQuotaBlocked]   = useState(false)
const [checkingQuota,  setCheckingQuota]  = useState(false)
const [quotaChecked,   setQuotaChecked]   = useState(false)  // tracks if check ran
const [popupOpen,      setPopupOpen]      = useState(false)
```

### On country change

```typescript
const handleCountryChange = async (newCountry: string) => {
  setCountry(newCountry)
  setCheckingQuota(true)
  const result = await checkCountryQuota(newCountry, memberCount)
  setQuotaBlocked(!result.allowed)
  setCheckingQuota(false)
  setQuotaChecked(true)
}
```

Shows an MUI `Alert severity="warning"` below the country dropdown if `quotaBlocked`.

### On member count change

Re-runs the quota check (same country, new member count) so the inline warning stays accurate.

### On Next click

```typescript
const handleNext = async () => {
  if (!karyakarta.trim()) { ... return }

  setCheckingQuota(true)
  const result = await checkCountryQuota(country, memberCount)
  setCheckingQuota(false)

  if (!result.allowed) {
    setQuotaBlocked(true)
    setPopupOpen(true)
    return
  }

  setGroupInfo({ country, karyakarta, memberCount })
  setStep(2)
}
```

---

## Popup (MUI Dialog)

- **Title:** none (clean look)
- **Body:**
  > Jay Swaminarayan Bhagat,
  > Registration is not possible please contact responsible enquiry person.
- **Action:** Single "Close" button — dismisses dialog, user stays on Step 1
- `disableBackdropClick` / `onClose` guard so backdrop click does not close it

---

## Inline Warning (MUI Alert)

Shown below the country dropdown when `quotaBlocked && !checkingQuota`:

```
Registration for [Country Name] is currently full. Please select a different country or contact your enquiry person.
```

Severity: `warning`. Disappears when user selects a different (non-full) country.

---

## Loading State

- Next button shows a `CircularProgress` spinner and is `disabled` while `checkingQuota === true`
- Country dropdown is not disabled during check (user can change selection freely)

---

## Error Handling

If the Supabase query fails (network error, RLS denial), `checkCountryQuota` logs the error and returns `{ allowed: true, remaining: 0 }` — fail open so a network blip does not permanently block registration. The backend enforces the real gate at submission time.

---

## Files Changed

| File | Change |
|------|--------|
| `src/api/registrations.ts` | Add `checkCountryQuota()` function |
| `src/components/form/Step1GroupInfo.tsx` | Add quota check logic, inline Alert, Dialog popup |

No changes to: store, styles (unless minor), other steps, backend, DB schema.
