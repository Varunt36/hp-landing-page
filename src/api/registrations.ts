// src/api/registrations.ts
import { supabase } from '../lib/supabaseClient'
import { type MemberDetail } from '../store/registrationStore'

export type { MemberDetail }

export interface RegistrationPayload {
  country:       string
  karyakarta:    string
  memberCount:   number
  members:       MemberDetail[]
  termsAccepted: boolean
}

export interface RegistrationResult {
  id:        string
  reference: string
}

export async function submitRegistration(
  payload: RegistrationPayload
): Promise<RegistrationResult> {
  const { data, error } = await supabase
    .from('registrations')
    .insert([{
      country:        payload.country,
      karyakarta:     payload.karyakarta,
      member_count:   payload.memberCount,
      members:        payload.members,
      terms_accepted: payload.termsAccepted,
      created_at:     new Date().toISOString(),
    }])
    .select('id')
    .single()

  if (error) throw new Error(error.message)

  const reference = `YDS-2026-${String((data as { id: string | number }).id).padStart(5, '0')}`
  return { id: String((data as { id: string | number }).id), reference }
}
