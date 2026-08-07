// src/utils/registrationGate.ts
// Single source of truth for whether registration is open.
// The cutoff is a hardcoded instant; the bypass is a shared secret
// code carried in the URL once, then remembered for the browser tab.

import { useRegistrationStore } from '../store/registrationStore'

const CLOSE_AT = new Date('2026-08-09T18:00:00+02:00')
const BYPASS_CODE = import.meta.env.VITE_REGISTRATION_BYPASS_CODE as string | undefined
const BYPASS_KEY = 'hp_reg_bypass'

export function isPastDeadline(): boolean {
  return Date.now() >= CLOSE_AT.getTime()
}

export function hasBypass(): boolean {
  try {
    return sessionStorage.getItem(BYPASS_KEY) === '1'
  } catch {
    return false
  }
}

// Call once on app load. If the URL carries a valid ?invite= code,
// remember it for the rest of this browser tab's session and strip
// the param from the address bar.
export function consumeInviteParam(): void {
  if (!BYPASS_CODE) return

  const params = new URLSearchParams(window.location.search)
  const invite = params.get('invite')
  if (invite?.trim() !== BYPASS_CODE?.trim()) return

  sessionStorage.setItem(BYPASS_KEY, '1')
  useRegistrationStore.getState().openModal()
  params.delete('invite')
  const query = params.toString()
  const newUrl = window.location.pathname + (query ? `?${query}` : '') + window.location.hash
  window.history.replaceState(window.history.state, '', newUrl)
}

// Snapshot helper — call once at the moment registration is entered
// (modal open), not on every render.
export function isRegistrationOpenNow(): boolean {
  return !isPastDeadline() || hasBypass()
}
