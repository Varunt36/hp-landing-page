// src/pages/city-tour/CityTourSuccess.styles.ts
import { C } from '../../theme/theme'

export const cityTourSuccessStyles = {
  outer: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 },
  paper: { maxWidth: 480, width: '100%', p: 5, textAlign: 'center', borderRadius: 3 },
  icon:  { fontSize: 72, color: 'success.main', mb: 2 },

  referenceBox: {
    mt: 1,
    mb: 3,
    py: 1.5,
    px: 2,
    borderRadius: 2,
    background: C.lavender50,
    border: `1px solid ${C.lavender200}`,
  },

  referenceValue: {
    fontFamily: 'monospace',
    fontSize: '1.25rem',
    fontWeight: 700,
    color: C.purple800,
    letterSpacing: '0.03em',
  },
}
