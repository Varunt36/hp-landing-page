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

const API_URL = import.meta.env.VITE_API_URL as string
if (!API_URL) throw new Error('VITE_API_URL environment variable is not set.')

// Converts the FastAPI `detail` field into a human-readable string.
// detail can be: a plain string, a validation error array (from Pydantic), or an arbitrary object.
function parseApiError(detail: unknown): string {
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail)) return detail.map((d: unknown) => {
    if (d && typeof d === 'object' && 'msg' in d) return String((d as { msg: unknown }).msg)
    return JSON.stringify(d)
  }).join(', ')
  if (detail != null) return JSON.stringify(detail)
  return 'Registration failed'
}

export async function submitRegistration(
  payload: RegistrationPayload
): Promise<RegistrationResult> {
  const res = await fetch(`${API_URL}/create-payment`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      payment_method: 'stripe',
      country:        payload.country,
      karyakarta:     payload.karyakarta,
      terms_accepted: payload.termsAccepted,
      members: payload.members.map(m => ({
        first_name:  m.firstName,
        middle_name: m.middleName || '',
        last_name:   m.lastName,
        gender:      m.gender,
        dob:         m.dob,
        email:       m.email  || null,
        phone:       m.phone  || null,
      })),
    }),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(parseApiError(err.detail))
  }

  return res.json()
}
