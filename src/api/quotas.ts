import { supabase } from '../lib/supabase'

export interface CountryQuota {
  maxMembers: number
  used:       number
  remaining:  number
}

export async function fetchAvailableCountryCodes(): Promise<string[]> {
  const { data, error } = await supabase
    .from('country_quotas')
    .select('country_code')
  if (error || !data) return []
  return data.map(row => row.country_code as string)
}

export async function fetchCountryQuota(countryCode: string): Promise<CountryQuota | null> {
  const [quotaRes, countRes] = await Promise.all([
    supabase
      .from('country_quotas')
      .select('max_members')
      .eq('country_code', countryCode)
      .single(),
    supabase
      .from('registrations')
      .select('id', { count: 'exact', head: true })
      .eq('country', countryCode),
  ])

  if (quotaRes.error || !quotaRes.data) return null

  const used = countRes.count ?? 0
  const max  = quotaRes.data.max_members as number
  return { maxMembers: max, used, remaining: Math.max(0, max - used) }
}
