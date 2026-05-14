import { createTheme, responsiveFontSizes } from '@mui/material/styles'

// ── Design tokens matching the new lavender/cream/gold design ──
export const C = {
  cream:        '#FAF8F3',
  cream2:       '#F3EEF8',
  lavender50:   '#F5F1FC',
  lavender100:  '#EBE3F7',
  lavender200:  '#D4C3EA',
  lavender300:  '#B89DD2',
  purple700:    '#6B4A96',
  purple800:    '#4B2D6E',
  purple900:    '#301850',
  gold300:      '#C8A86A',
  gold500:      '#A07828',
  gold600:      '#856020',
  gold700:      '#6B4E18',
  green600:     '#3A7058',
  green700:     '#2B5539',
  teal500:      '#78C4BF',
  teal600:      '#1E9D96',
  teal700:      '#148882',
  ink:          '#1C1430',
  muted:        '#5A4870',
}

const FONT_SERIF = '"Cormorant Garamond", "Cormorant", Georgia, serif'
const FONT_SANS  = '"Inter", system-ui, -apple-system, sans-serif'
const FONT_DEVA  = '"Tiro Devanagari Sanskrit", "Noto Serif Devanagari", serif'

const baseTheme = createTheme({
  palette: {
    primary:    { main: C.purple700,  dark: C.purple800,  contrastText: C.cream },
    secondary:  { main: C.gold500,   dark: C.gold700,   contrastText: '#ffffff' },
    background: { default: C.cream,  paper: C.cream },
    text:       { primary: C.ink,    secondary: C.muted },
  },
  typography: {
    fontFamily: FONT_SANS,
    h1: { fontFamily: FONT_SERIF, fontWeight: 500, fontStyle: 'italic', fontSize: '2.75rem', letterSpacing: '-0.01em', color: C.purple800 },
    h2: { fontFamily: FONT_SERIF, fontWeight: 500, fontStyle: 'italic', fontSize: '2rem',    letterSpacing: '-0.01em', color: C.purple800 },
    h3: { fontFamily: FONT_SERIF, fontWeight: 500, fontStyle: 'italic', fontSize: '1.6rem',  letterSpacing: '-0.01em', color: C.purple800 },
    h4: { fontWeight: 600, fontSize: '1.25rem' },
    h5: { fontWeight: 600, fontSize: '1.1rem' },
    h6: { fontWeight: 600, fontSize: '1rem' },
    button: { fontWeight: 600, textTransform: 'none', fontFamily: FONT_SANS },
    overline: { fontFamily: FONT_SANS, fontSize: '0.7rem', letterSpacing: '0.18em', fontWeight: 600, color: C.green700 },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999, padding: '10px 22px', fontWeight: 600 },
        sizeLarge: { padding: '13px 32px', fontSize: '15px' },
        containedPrimary: {
          background: `linear-gradient(180deg, ${C.purple700}, ${C.purple800})`,
          boxShadow: `0 4px 14px rgba(75,45,110,0.28)`,
          '&:hover': {
            background: `linear-gradient(180deg, ${C.purple700}, ${C.purple800})`,
            boxShadow: `0 8px 22px rgba(75,45,110,0.36)`,
            transform: 'translateY(-1px)',
          },
        },
        outlinedPrimary: {
          color: C.purple800,
          borderColor: `${C.lavender300}88`,
          background: `${C.lavender100}99`,
          '&:hover': { background: C.lavender100, borderColor: C.lavender300 },
        },
      },
    },
    MuiContainer: { defaultProps: { maxWidth: 'lg' } },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${C.lavender200}`,
          boxShadow: '0 1px 2px rgba(60,30,90,0.06), 0 2px 8px rgba(60,30,90,0.04)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: C.cream2,
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: C.gold500,
              borderWidth: 1,
            },
          },
        },
      },
    },
  },
})

const theme = responsiveFontSizes(baseTheme, { factor: 1.5 })
export default theme

// Named exports for direct use in components
export const PRIMARY   = C.purple700
export const SECONDARY = C.gold500
export const ACCENT    = C.gold500
export const OFF_WHITE = C.cream
export const MUTED     = C.muted
export const DARK      = C.purple800
export const INK       = C.ink

export const HERO_GRADIENT = [
  `radial-gradient(900px 500px at 18% 30%, ${C.lavender100}CC, transparent 70%)`,
  `radial-gradient(700px 480px at 80% 60%, ${C.lavender50}CC, transparent 72%)`,
  `linear-gradient(180deg, ${C.cream} 0%, ${C.cream2} 100%)`,
].join(', ')

export const HERO_IS_LIGHT       = true
export const HERO_WAVE_COLOR     = C.lavender200
export const HERO_CIRCLE_FRAME   = false
export const KALASH_CIRCLE       = false
export const CIRCLE_COLOR        = 'rgba(255,255,255,0.65)'
export const NAV_BG              = 'transparent'
export const FEATURE_BG          = `linear-gradient(135deg, ${C.purple800}, ${C.purple900})`
export const FEATURE_TEXT        = C.cream

export const FONT_SERIF_EXPORT   = FONT_SERIF
export const FONT_DEVA_EXPORT    = FONT_DEVA
