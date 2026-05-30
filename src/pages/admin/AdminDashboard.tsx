import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, AppBar, Toolbar, Typography, Button, IconButton,
  Card, CardContent, Grid, CircularProgress,
  LinearProgress, Chip, Divider, useTheme, useMediaQuery,
  Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import LogoutIcon        from '@mui/icons-material/Logout'
import PeopleIcon        from '@mui/icons-material/People'
import HowToRegIcon      from '@mui/icons-material/HowToReg'
import PublicIcon        from '@mui/icons-material/Public'
import EventSeatIcon     from '@mui/icons-material/EventSeat'
import RefreshIcon       from '@mui/icons-material/Refresh'
import { useAuth }       from '../../context/AuthContext'
import { fetchAllMembers, type Member } from '../../api/admin'
import { fetchAllQuotas, type CountryQuotaRow } from '../../api/quotas'
import { COUNTRIES } from '../../data/data'

// ── helpers ───────────────────────────────────────────────
const countryMeta = (code: string) =>
  COUNTRIES.find(c => c.code === code) ?? { label: code, flag: '🌐' }

function fillColor(pct: number) {
  if (pct >= 90) return '#d32f2f'
  if (pct >= 70) return '#f57c00'
  return '#2e7d32'
}

// ── stat card ─────────────────────────────────────────────
interface StatCardProps { icon: React.ReactNode; label: string; value: number | string; sub?: string; accent?: string }
function StatCard({ icon, label, value, sub, accent = '#6B4A96' }: StatCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '16px',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '3px',
          background: accent,
        },
      }}
    >
      <CardContent sx={{ pt: 2.5, pb: '16px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
          <Box
            sx={{
              width: 40, height: 40, borderRadius: '10px',
              bgcolor: `${accent}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: accent,
            }}
          >
            {icon}
          </Box>
          <Typography variant="body2" color="text.secondary" fontWeight={500} fontSize={13}>
            {label}
          </Typography>
        </Box>
        <Typography fontWeight={700} fontSize={32} lineHeight={1} color="text.primary">
          {value}
        </Typography>
        {sub && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            {sub}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

// ── country card ──────────────────────────────────────────
interface CountryCardProps {
  code: string
  registered: number
  checkedIn: number
  quota: number
}
function CountryCard({ code, registered, checkedIn, quota }: CountryCardProps) {
  const meta    = countryMeta(code)
  const pct     = quota > 0 ? Math.min(100, Math.round((registered / quota) * 100)) : 0
  const color   = fillColor(pct)
  const remaining = Math.max(0, quota - registered)

  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '16px',
        height: '100%',
        transition: 'box-shadow .2s, border-color .2s',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          borderColor: 'primary.main',
        },
      }}
    >
      <CardContent sx={{ pb: '16px !important' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Typography fontSize={28} lineHeight={1}>{meta.flag}</Typography>
            <Box>
              <Typography fontWeight={700} fontSize={15} lineHeight={1.2}>{meta.label}</Typography>
              <Typography variant="caption" color="text.secondary">{code}</Typography>
            </Box>
          </Box>
          <Chip
            label={remaining === 0 ? 'Full' : `${remaining} left`}
            size="small"
            sx={{
              fontWeight: 700,
              fontSize: 11,
              bgcolor: remaining === 0 ? '#d32f2f18' : '#2e7d3218',
              color:   remaining === 0 ? '#d32f2f'   : '#2e7d32',
              border:  '1px solid',
              borderColor: remaining === 0 ? '#d32f2f40' : '#2e7d3240',
            }}
          />
        </Box>

        {/* Progress bar */}
        <Box sx={{ mb: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">Quota used</Typography>
            <Typography variant="caption" fontWeight={700} color={color}>{pct}%</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={pct}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: `${color}20`,
              '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 4 },
            }}
          />
        </Box>

        <Divider sx={{ my: 1.5 }} />

        {/* Stats row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography fontWeight={700} fontSize={20} color="primary.main">{registered}</Typography>
            <Typography variant="caption" color="text.secondary">Registered</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography fontWeight={700} fontSize={20} color="success.main">{checkedIn}</Typography>
            <Typography variant="caption" color="text.secondary">Checked In</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography fontWeight={700} fontSize={20} color="text.secondary">{quota}</Typography>
            <Typography variant="caption" color="text.secondary">Max Quota</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

// ── main page ─────────────────────────────────────────────
export default function AdminDashboard() {
  const { logout }  = useAuth()
  const navigate    = useNavigate()
  const theme       = useTheme()
  const isMobile    = useMediaQuery(theme.breakpoints.down('md'))

  const [members,    setMembers]    = useState<Member[]>([])
  const [quotas,     setQuotas]     = useState<CountryQuotaRow[]>([])
  const [loading,    setLoading]    = useState(true)
  const [logoutOpen, setLogoutOpen] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const [m, q] = await Promise.all([fetchAllMembers(), fetchAllQuotas()])
      setMembers(m)
      setQuotas(q)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void load() }, [])

  // Compute per-country stats from members list
  const stats = useMemo(() => {
    const reg: Record<string, number> = {}
    const chk: Record<string, number> = {}
    for (const m of members) {
      reg[m.country] = (reg[m.country] ?? 0) + 1
      if (m.checked_in) chk[m.country] = (chk[m.country] ?? 0) + 1
    }
    return { reg, chk }
  }, [members])

  const totalMembers    = members.length
  const totalCheckedIn  = members.filter(m => m.checked_in).length
  const totalQuota      = quotas.reduce((s, q) => s + q.maxMembers, 0)
  const totalRemaining  = Math.max(0, totalQuota - totalMembers)
  const countriesActive = Object.keys(stats.reg).length

  // Merge quota rows with member counts, sorted by registered desc
  const rows = useMemo(() =>
    [...quotas]
      .map(q => ({
        code:       q.countryCode,
        quota:      q.maxMembers,
        registered: stats.reg[q.countryCode] ?? 0,
        checkedIn:  stats.chk[q.countryCode] ?? 0,
      }))
      .sort((a, b) => b.registered - a.registered),
    [quotas, stats],
  )

  const handleLogout = async () => {
    setLogoutOpen(false)
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* AppBar */}
      <AppBar position="sticky" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar sx={{ minHeight: { xs: 52, sm: 64 }, gap: 1 }}>
          <PublicIcon sx={{ mr: 0.5, fontSize: { xs: 20, sm: 24 } }} />
          <Typography fontWeight={700} sx={{ flexGrow: 1, fontSize: { xs: '0.95rem', sm: '1.25rem' } }}>
            {isMobile ? 'Dashboard' : 'Registration Dashboard'}
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => navigate('/admin/scan')}
            size="small"
            title="Go to Scanner"
            sx={{ bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }, mr: 0.5 }}
          >
            <QrCodeScannerIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={load}
            size="small"
            disabled={loading}
            title="Refresh"
            sx={{ bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }, mr: 0.5 }}
          >
            {loading ? <CircularProgress size={16} color="inherit" /> : <RefreshIcon fontSize="small" />}
          </IconButton>
          {isMobile ? (
            <IconButton
              color="inherit"
              onClick={() => setLogoutOpen(true)}
              size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          ) : (
            <Button
              onClick={() => setLogoutOpen(true)}
              startIcon={<LogoutIcon />}
              sx={{
                color: 'white', fontWeight: 600,
                bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2, px: 2,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
        {/* Summary cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 6, sm: 3 }}>
            <StatCard
              icon={<PeopleIcon fontSize="small" />}
              label="Total Registered"
              value={totalMembers}
              sub={`of ${totalQuota} total quota`}
              accent="#6B4A96"
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <StatCard
              icon={<HowToRegIcon fontSize="small" />}
              label="Checked In"
              value={totalCheckedIn}
              sub={totalMembers > 0 ? `${Math.round((totalCheckedIn / totalMembers) * 100)}% attendance` : '—'}
              accent="#2e7d32"
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <StatCard
              icon={<PublicIcon fontSize="small" />}
              label="Countries"
              value={countriesActive}
              sub={`of ${quotas.length} allocated`}
              accent="#0277bd"
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <StatCard
              icon={<EventSeatIcon fontSize="small" />}
              label="Spots Remaining"
              value={totalRemaining}
              sub={`${Math.round(((totalQuota - totalRemaining) / (totalQuota || 1)) * 100)}% filled overall`}
              accent={totalRemaining < totalQuota * 0.1 ? '#d32f2f' : '#f57c00'}
            />
          </Grid>
        </Grid>

        {/* Country breakdown */}
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ mb: 2, fontSize: { xs: '1rem', sm: '1.15rem' }, color: 'text.primary' }}
        >
          Country Breakdown
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {rows.map(r => (
              <Grid key={r.code} size={{ xs: 12, sm: 6, md: 4 }}>
                <CountryCard
                  code={r.code}
                  registered={r.registered}
                  checkedIn={r.checkedIn}
                  quota={r.quota}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Logout dialog */}
      <Dialog open={logoutOpen} onClose={() => setLogoutOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700}>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setLogoutOpen(false)} variant="outlined">Cancel</Button>
          <Button onClick={handleLogout} variant="contained" color="error" startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
