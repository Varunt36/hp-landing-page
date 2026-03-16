import { createTheme, responsiveFontSizes } from '@mui/material/styles'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎨  ACTIVE THEME — change this number to switch themes:
//      1 = ✨ Royal Elegance
//      2 = 👑 Swan Queen
//      3 = 🌊 Velvet Teal
//      4 = 🌸 Boudoir Luxe
const ACTIVE_THEME = 3
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ─── CHANGE FONT HERE ────────────────────────────────────
const FONT_FAMILY = '"DM Sans", sans-serif'
// ─────────────────────────────────────────────────────────

// ─── THEME PALETTES ──────────────────────────────────────

const themes = {
  /** ✨ THEME 1: Royal Elegance */
  1: {
    primary:       '#6ea096',   // teal sage
    secondary:     '#81688f',   // muted purple
    accent:        '#C9A84C',   // antique gold
    bg:            '#F5EDF8',   // soft lavender white
    muted:         '#e1b6dc',   // lavender blush
    dark:          '#2C3E3A',   // deep forest
    heroGradient:  `
      linear-gradient(to bottom, rgba(44,62,58,0.65) 0%, rgba(201,168,76,0.35) 100%),
      linear-gradient(135deg, #2C3E3A 0%, #6ea096 45%, #81688f 100%)
    `,
  },
  /** 👑 THEME 2: Swan Queen */
  2: {
    primary:       '#e1b6dc',   // lavender blush
    secondary:     '#e199c6',   // rose pink
    accent:        '#D4AF37',   // golden crown
    bg:            '#F9F0F5',   // pearl white
    muted:         '#81688f',   // dusty purple
    dark:          '#3D2B4A',   // deep plum
    heroGradient:  `
      linear-gradient(to bottom, rgba(61,43,74,0.70) 0%, rgba(212,175,55,0.30) 100%),
      linear-gradient(135deg, #3D2B4A 0%, #81688f 40%, #e199c6 100%)
    `,
  },
  /** 🌊 THEME 3: Velvet Teal */
  3: {
    primary:       '#1B6B6B',   // deep teal
    secondary:     '#6ea096',   // sage teal
    accent:        '#B8860B',   // dark goldenrod
    bg:            '#EAF4F2',   // mint white
    muted:         '#e199c6',   // blush pop
    dark:          '#0D3535',   // midnight teal
    heroGradient:  `
      linear-gradient(to bottom, rgba(13,53,53,0.70) 0%, rgba(184,134,11,0.35) 100%),
      linear-gradient(135deg, #0D3535 0%, #1B6B6B 45%, #6ea096 100%)
    `,
  },
  /** 🌸 THEME 4: Boudoir Luxe */
  4: {
    primary:       '#81688f',   // mauve purple
    secondary:     '#6ea096',   // sea glass
    accent:        '#E8C55A',   // warm gold
    bg:            '#F5EDF8',   // soft lavender white
    muted:         '#e199c6',   // petal pink
    dark:          '#4A3057',   // deep violet
    heroGradient:  `
      linear-gradient(to bottom, rgba(74,48,87,0.70) 0%, rgba(232,197,90,0.30) 100%),
      linear-gradient(135deg, #4A3057 0%, #81688f 40%, #6ea096 100%)
    `,
  },
} as const

const c = themes[ACTIVE_THEME as keyof typeof themes]

// ─────────────────────────────────────────────────────────

const baseTheme = createTheme({
  palette: {
    primary:    { main: c.primary,   dark: c.secondary },
    secondary:  { main: c.accent,    contrastText: '#ffffff' },
    background: { default: c.bg,     paper: '#ffffff' },
    text:       { primary: c.dark,   secondary: c.muted },
  },
  typography: {
    fontFamily: FONT_FAMILY,
    h1: { fontWeight: 700, fontSize: '2.75rem' },
    h2: { fontWeight: 700, fontSize: '2rem' },
    h3: { fontWeight: 700, fontSize: '1.625rem' },
    h4: { fontWeight: 700, fontSize: '1.375rem' },
    h5: { fontWeight: 700, fontSize: '1.125rem' },
    h6: { fontWeight: 700, fontSize: '1rem' },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: { borderRadius: 12 },
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
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255,255,255,0.8)',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: c.primary,   // #81688f mauve
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          background: 'rgba(255,255,255,0.8)',
        },
      },
    },
  },
})

const theme = responsiveFontSizes(baseTheme, { factor: 2 })

export default theme
export const { primary: PRIMARY, secondary: SECONDARY, accent: ACCENT, bg: OFF_WHITE, muted: MUTED, dark: DARK, heroGradient: HERO_GRADIENT } = c
