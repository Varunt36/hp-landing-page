// src/api/registrations.ts
// All shared registration types live here so the data layer owns the contract.
// The store and components import from this file, not the other way around.

// Mirrors the per-member fields sent to the backend
export interface MemberDetail {
  firstName:  string
  middleName: string
  lastName:   string
  gender:     'male' | 'female'
  dob:        string
  email?:     string
  phone?:     string
  dialCode?:  string
}

export interface RegistrationPayload {
  country:       string
  karyakarta:    string
  memberCount:   number
  members:       MemberDetail[]
  termsAccepted: boolean
}

export interface RegistrationResult {
  reference:   string
  payment_url: string
}

const API_URL = import.meta.env.VITE_API_URL as string;

// Maps backend field paths like "members → 0 → phone" to a human label.
function friendlyField(field: string): string {
  const m = field.match(/members\s*→\s*(\d+)\s*→\s*(\w+)/);
  if (m) {
    const memberNum = Number(m[1]) + 1;
    const fieldMap: Record<string, string> = {
      phone: 'Phone number',
      email: 'Email',
      first_name: 'First name',
      last_name: 'Last name',
      dob: 'Date of birth',
      gender: 'Gender',
    };
    const label = fieldMap[m[2]] ?? m[2];
    return `Member ${memberNum} — ${label}`;
  }
  return field;
}

function parseApiError(body: Record<string, unknown>): string {
  // Backend format: { code, message, details: [{ field, message }] }
  if (typeof body.message === 'string') {
    const details = body.details;
    if (Array.isArray(details) && details.length > 0) {
      const msgs = details
        .map((d: unknown) => {
          if (!d || typeof d !== 'object') return null;
          const item = d as Record<string, unknown>;
          const field =
            typeof item.field === 'string' ? friendlyField(item.field) : '';
          const msg =
            typeof item.message === 'string'
              ? item.message.replace(/^Value error,\s*/i, '')
              : '';
          return field ? `${field}: ${msg}` : msg || null;
        })
        .filter(Boolean);
      if (msgs.length > 0) return msgs.join('\n');
    }
    return body.message;
  }
  // FastAPI fallback: { detail: string | array }
  const detail = body.detail;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    const msgs = detail
      .map((d: unknown) => {
        if (d && typeof d === 'object' && 'msg' in d)
          return String((d as { msg: unknown }).msg);
        return null;
      })
      .filter(Boolean);
    if (msgs.length > 0) return msgs.join('\n');
  }
  return 'Registration failed. Please check your details and try again.';
}

export async function submitRegistration(
  payload: RegistrationPayload,
): Promise<RegistrationResult> {
  if (!API_URL)
    throw new Error(
      'Registration failed. Please check your details and try again.',
    );

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const res = await fetch(`${API_URL}/create-payment`, {
      signal: controller.signal,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payment_method: 'stripe',
        country: payload.country,
        karyakarta: payload.karyakarta,
        terms_accepted: payload.termsAccepted,
        members: payload.members.map((m) => ({
          first_name: m.firstName,
          last_name: m.lastName,
          gender: m.gender,
          dob: m.dob,
          email: m.email || null,
          phone: m.phone
            ? `${(m.dialCode ?? '').replace(/\+/g, '')} ${m.phone}`.trim()
            : null,
        })),
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(parseApiError(err as Record<string, unknown>));
    }

    return res.json();
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error(
        'The request timed out. Please check your connection and try again.',
      );
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
