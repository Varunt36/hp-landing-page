import { supabase } from '../lib/supabase'

export type Member = {
  id: string
  first_name: string
  last_name: string
  ticket_number: string | null
  checked_in: boolean
  country: string
  group_reference: string
}

const MEMBER_SELECT = 'id, first_name, last_name, ticket_number, checked_in, registrations(country, reference)'

type RegRow = { country: string; reference: string } | null

function extractReg(registrations: unknown): RegRow {
  if (Array.isArray(registrations)) return registrations[0] ?? null
  return (registrations as RegRow) ?? null
}

function buildMember(row: {
  id: string
  first_name: string
  last_name: string
  ticket_number: string | null
  checked_in: boolean
  registrations: unknown
}): Member {
  const reg = extractReg(row.registrations)
  return {
    id:              row.id,
    first_name:      row.first_name,
    last_name:       row.last_name,
    ticket_number:   row.ticket_number,
    checked_in:      row.checked_in,
    country:         reg?.country ?? '—',
    group_reference: reg?.reference ?? '—',
  }
}

export async function fetchAllMembers(): Promise<Member[]> {
  const { data, error } = await supabase
    .from('members')
    .select(MEMBER_SELECT)
    .order('last_name', { ascending: true })

  if (error) throw new Error(error.message)
  return (data ?? []).map(buildMember)
}

export async function checkInByTicket(ticketNumber: string): Promise<Member> {
  const { data: found, error } = await supabase
    .from('members')
    .select(MEMBER_SELECT)
    .eq('ticket_number', ticketNumber.trim().toUpperCase())
    .limit(1)
    .single()

  if (error || !found) throw new Error('Ticket not found: ' + ticketNumber)
  if (found.checked_in) return buildMember(found)

  const { error: updateErr } = await supabase
    .from('members')
    .update({ checked_in: true })
    .eq('id', found.id)

  if (updateErr) throw new Error('Check-in update failed: ' + updateErr.message)
  return buildMember({ ...found, checked_in: true })
}
