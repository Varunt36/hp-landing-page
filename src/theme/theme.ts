import { createTheme, responsiveFontSizes } from '@mui/material/styles'

// ─── CHANGE COLORS HERE ───────────────────────────────────
const BLUE        = '#365288'
const BLUE_DARK   = '#253a61'
const ORANGE      = '#F37C3E'
const OFF_WHITE   = '#F9F7F4'
// ─────────────────────────────────────────────────────────

// ─── CHANGE FONT HERE ────────────────────────────────────
const FONT_FAMILY = '"DM Sans", sans-serif'
// ─────────────────────────────────────────────────────────

const baseTheme = createTheme({
  palette: {
    primary:    { main: BLUE, dark: BLUE_DARK },
    secondary:  { main: ORANGE, contrastText: '#ffffff' },
    background: { default: OFF_WHITE, paper: '#ffffff' },
    text:       { primary: '#212121', secondary: '#666666' },
  },
  typography: {
    fontFamily: FONT_FAMILY,
    h1: { fontWeight: 700, fontSize: '2.75rem' },   // 44px desktop → scales down
    h2: { fontWeight: 700, fontSize: '2rem' },       // 32px desktop → scales down
    h3: { fontWeight: 700, fontSize: '1.625rem' },   // 26px desktop → scales down
    h4: { fontWeight: 700, fontSize: '1.375rem' },   // 22px desktop → scales down
    h5: { fontWeight: 700, fontSize: '1.125rem' },   // 18px desktop → scales down
    h6: { fontWeight: 700, fontSize: '1rem' },       // 16px
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root:      { borderRadius: 10, padding: '12px 28px' },
        sizeLarge: { padding: '14px 36px', fontSize: '16px' },
      },
    },
    MuiContainer: {
      defaultProps: { maxWidth: 'md' },
    },
  },
})

const theme = responsiveFontSizes(baseTheme, { factor: 2 })

export default theme
export { BLUE, BLUE_DARK, ORANGE, OFF_WHITE }
