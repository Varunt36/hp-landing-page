import { useState } from 'react'
import { isRegistrationOpenNow } from '../utils/registrationGate'

// One-time-per-mount snapshot of whether registration is open.
// Navbar and HeroSection don't have an "opening" event to re-check
// against (unlike the registration modal), so a mount-time check is
// the right granularity here.
export function useRegistrationOpen(): boolean {
  return useState(() => isRegistrationOpenNow())[0]
}
