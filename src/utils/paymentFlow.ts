// src/utils/paymentFlow.ts
// Which checkout the user walked away from when they land on /payment/cancel.
//
// The backend hardcodes Stripe's cancel_url to /payment/cancel for both the
// main registration and the city tour, so the cancel page has nothing in the
// URL to tell them apart. Each flow stamps its own name here immediately
// before handing off to Stripe; sessionStorage survives the full-page redirect
// back into the same tab, the same way hp_confirm_ref does.

export type PaymentFlow = 'registration' | 'city-tour'

const KEY = 'hp_payment_flow'

// Always call this before a Stripe redirect, including for the main
// registration — otherwise a city tour attempt earlier in the same tab leaves
// a stale mark and sends the wrong "Try Again" destination.
export function markPaymentFlow(flow: PaymentFlow): void {
  try {
    sessionStorage.setItem(KEY, flow)
  } catch {
    // storage blocked — the cancel page falls back to the registration flow
  }
}

export function getPaymentFlow(): PaymentFlow {
  try {
    return sessionStorage.getItem(KEY) === 'city-tour' ? 'city-tour' : 'registration'
  } catch {
    return 'registration'
  }
}
