import { supabase } from '../lib/supabase'

export type Member = {
  id: string
  first_name: string
  last_name: string
  ticket_number: string | null
  checked_in: boolean
  country: string
  group_reference: string
  gender: string
  dob: string
}

export async function fetchAllMembers(): Promise<Member[]> {
  const { data: members, error } = await supabase
    .from('members')
    .select('id, first_name, last_name, ticket_number, checked_in, registration_id, gender, dob')
    .order('first_name', { ascending: true })

  if (error) throw new Error(error.message)
  if (!members?.length) return []

  // Fetch only the registrations we need, keyed by UUID
  const regIds = [...new Set(members.map(m => m.registration_id as string))]
  const { data: regs } = await supabase
    .from('registrations')
    .select('id, reference, country')
    .in('id', regIds)

  const regMap = new Map((regs ?? []).map(r => [r.id as string, r]))

  return members.map(row => {
    const reg = regMap.get(row.registration_id as string)
    return {
      id:              row.id,
      first_name:      row.first_name,
      last_name:       row.last_name,
      ticket_number:   row.ticket_number ?? null,
      checked_in:      row.checked_in,
      country:         reg?.country   ?? '—',
      group_reference: reg?.reference ?? '—',
      gender:          row.gender  as string,
      dob:             row.dob     as string,
    }
  })
}

export interface PaidMember {
  first_name:    string
  last_name:     string
  gender:        string
  ticket_number: string | null
  checked_in:    boolean
}

export async function fetchPaidMembersByCountry(countryCode: string): Promise<PaidMember[]> {
  // 1. Get paid registration IDs
  const { data: paidPayments } = await supabase
    .from('payments')
    .select('registration_id')
    .eq('status', 'paid')
  if (!paidPayments?.length) return []

  const paidRegIds = paidPayments.map(p => p.registration_id as string)

  // 2. Filter to this country
  const { data: countryRegs } = await supabase
    .from('registrations')
    .select('id')
    .eq('country', countryCode)
    .in('id', paidRegIds)
  if (!countryRegs?.length) return []

  const regIds = countryRegs.map(r => r.id as string)

  // 3. Fetch members for those registrations
  const { data: members } = await supabase
    .from('members')
    .select('first_name, last_name, gender, ticket_number, checked_in')
    .in('registration_id', regIds)
    .order('last_name', { ascending: true })
  if (!members) return []

  return members.map(m => ({
    first_name:    m.first_name    as string,
    last_name:     m.last_name     as string,
    gender:        m.gender        as string,
    ticket_number: m.ticket_number as string | null,
    checked_in:    m.checked_in    as boolean,
  }))
}

export interface CountryRegistrationStat {
  country:       string
  registrations: number   // number of registration groups
  members:       number   // sum of member_count across those groups
}

export async function fetchRegistrationStats(): Promise<CountryRegistrationStat[]> {
  const { data, error } = await supabase
    .from('registrations')
    .select('country, member_count')

  if (error || !data) return []

  const map: Record<string, { registrations: number; members: number }> = {}
  for (const row of data) {
    const c = row.country as string
    if (!map[c]) map[c] = { registrations: 0, members: 0 }
    map[c].registrations += 1
    map[c].members       += (row.member_count as number)
  }

  return Object.entries(map).map(([country, s]) => ({
    country,
    registrations: s.registrations,
    members:       s.members,
  }))
}

export async function checkInByTicket(ticketNumber: string): Promise<Member> {
  const ticket = ticketNumber.trim().toUpperCase()

  const { data: found, error } = await supabase
    .from('members')
    .select('id, first_name, last_name, ticket_number, checked_in, registration_id, gender, dob')
    .eq('ticket_number', ticket)
    .limit(1)
    .single()

  if (error || !found) throw new Error('Ticket not found: ' + ticketNumber)

  if (!found.checked_in) {
    const { error: updateErr } = await supabase
      .from('members')
      .update({ checked_in: true })
      .eq('id', found.id)
    if (updateErr) throw new Error('Check-in update failed: ' + updateErr.message)
  }

  const { data: reg } = await supabase
    .from('registrations')
    .select('id, reference, country')
    .eq('id', found.registration_id)
    .single()

  return {
    id:              found.id,
    first_name:      found.first_name,
    last_name:       found.last_name,
    ticket_number:   found.ticket_number ?? null,
    checked_in:      true,
    country:         reg?.country   ?? '—',
    group_reference: reg?.reference ?? '—',
    gender:          found.gender  as string,
    dob:             found.dob     as string,
  }
}
