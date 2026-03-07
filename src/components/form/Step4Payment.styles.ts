// src/components/form/Step4Payment.styles.ts
import type { SxProps, Theme } from '@mui/material'

export const step4Styles: Record<string, SxProps<Theme>> = {
  // Step4Payment wrapper / nav
  tabsBar: { mb: 3 },
  navBox: { display: 'flex', justifyContent: 'space-between', mt: 4 },
  nextButton: { color: 'white' },

  // PaymentSummary
  summaryBox: { bgcolor: 'primary.main', color: 'white', borderRadius: 2, p: 3, mb: 3.5 },
  memberRow: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 0.5, py: 0.75 },
  divider: { borderColor: 'rgba(255,255,255,0.2)', my: 1.5 },
  totalRow: { display: 'flex', justifyContent: 'space-between', py: 0.75 },

  // PayPalPlaceholder
  paypalBox: { textAlign: 'center', py: 4 },
}
