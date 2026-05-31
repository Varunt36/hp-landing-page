import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Card, CardContent, TextField, Button, Typography,
  IconButton, Chip, Divider, AppBar, Toolbar, CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Alert, Snackbar, InputAdornment, useTheme, useMediaQuery, Switch,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Tabs, Tab, LinearProgress,
} from '@mui/material'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import LogoutIcon        from '@mui/icons-material/Logout'
import CheckCircleIcon   from '@mui/icons-material/CheckCircle'
import WarningAmberIcon  from '@mui/icons-material/WarningAmber'
import SearchIcon        from '@mui/icons-material/Search'
import RefreshIcon       from '@mui/icons-material/Refresh'
import BarChartIcon      from '@mui/icons-material/BarChart'
import PeopleIcon        from '@mui/icons-material/People'
import HowToRegIcon      from '@mui/icons-material/HowToReg'
import PublicIcon        from '@mui/icons-material/Public'
import EventSeatIcon     from '@mui/icons-material/EventSeat'
import { Html5Qrcode } from 'html5-qrcode'
import * as XLSX from 'xlsx'
import { useAuth }       from '../../context/AuthContext'
import { supabase }      from '../../lib/supabase'
import { fetchAllMembers, checkInByTicket, fetchPaidMembersByCountry, type Member, type PaidMember } from '../../api/admin'
import { fetchAllQuotas, type CountryQuotaRow } from '../../api/quotas'
import { COUNTRIES } from '../../data/data'

// ── Dashboard helpers ─────────────────────────────────────
const countryMeta = (code: string) =>
  COUNTRIES.find(c => c.code === code) ?? { label: code, flag: '🌐' }

function quotaFillColor(pct: number) {
  if (pct >= 90) return '#d32f2f'
  if (pct >= 70) return '#f57c00'
  return '#2e7d32'
}

const EVENT_AGE_DATE = new Date('2026-08-15')
function ageAtEvent(dob: string): number {
  const b = new Date(dob)
  let age = EVENT_AGE_DATE.getFullYear() - b.getFullYear()
  const dm = EVENT_AGE_DATE.getMonth() - b.getMonth()
  if (dm < 0 || (dm === 0 && EVENT_AGE_DATE.getDate() < b.getDate())) age--
  return age
}

interface StatCardProps { icon: React.ReactNode; label: string; value: number | string; sub?: string; accent?: string }
function StatCard({ icon, label, value, sub, accent = '#6B4A96' }: StatCardProps) {
  return (
    <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '16px', height: '100%', position: 'relative', overflow: 'hidden',
      '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: accent },
    }}>
      <CardContent sx={{ pt: 2.5, pb: '16px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: `${accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent }}>
            {icon}
          </Box>
          <Typography variant="body2" color="text.secondary" fontWeight={500} fontSize={13}>{label}</Typography>
        </Box>
        <Typography fontWeight={700} fontSize={32} lineHeight={1} color="text.primary">{value}</Typography>
        {sub && <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>{sub}</Typography>}
      </CardContent>
    </Card>
  )
}


type CheckStatus = 'idle' | 'loading' | 'success' | 'duplicate' | 'error'

export default function AdminScan() {
  const { logout } = useAuth()
  const navigate   = useNavigate()
  const theme      = useTheme()
  const isMobile   = useMediaQuery(theme.breakpoints.down('md'))

  // Manual entry
  const [ticketInput, setTicketInput] = useState('')

  // Check-in result
  const [checkStatus, setCheckStatus] = useState<CheckStatus>('idle')
  const [checkedMember, setCheckedMember] = useState<Member | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  // Members table
  const [members,     setMembers]     = useState<Member[]>([])
  const [tableSearch, setTableSearch] = useState('')
  const [tableLoading, setTableLoading] = useState(false)

  // Row toggle loading
  const [togglingId, setTogglingId] = useState<string | null>(null)

  // Tabs + dashboard data
  const [activeTab, setActiveTab]     = useState(0)
  const [quotas, setQuotas]           = useState<CountryQuotaRow[]>([])
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // Country paid-members dialog
  const [countryDialog, setCountryDialog] = useState<{ code: string; label: string; flag: string } | null>(null)
  const [paidMembers, setPaidMembers]     = useState<PaidMember[]>([])
  const [paidLoading, setPaidLoading]     = useState(false)

  const openCountryDialog = async (code: string, label: string, flag: string) => {
    setCountryDialog({ code, label, flag })
    setPaidLoading(true)
    try {
      const data = await fetchPaidMembersByCountry(code)
      setPaidMembers(data)
    } finally {
      setPaidLoading(false)
    }
  }

  // Logout confirmation
  const [logoutOpen, setLogoutOpen] = useState(false)

  // Camera
  const [cameraActive, setCameraActive] = useState(false)
  const scannerRef   = useRef<Html5Qrcode | null>(null)
  const scannerDivId = 'qr-reader'

  // Toast
  type ToastSev = 'success' | 'warning' | 'error'
  const [toast, setToast] = useState<{ open: boolean; msg: string; sev: ToastSev }>
    ({ open: false, msg: '', sev: 'success' })

  const showToast = (msg: string, sev: ToastSev) => setToast({ open: true, msg, sev })

  // Load members on mount + realtime + 30s poll + camera cleanup on unmount
  useEffect(() => {
    void loadMembers()

    // Supabase Realtime — instant update on any members/registrations change
    const channel = supabase
      .channel('admin-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'members' }, () => { void loadMembers() })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'registrations' }, () => { void loadMembers() })
      .subscribe()

    // Polling fallback every 30 seconds
    const poll = setInterval(() => { void loadMembers() }, 60_000)

    return () => {
      void supabase.removeChannel(channel)
      clearInterval(poll)
      void stopCamera()
    }
  }, []) // eslint-disable-line

  const loadMembers = async () => {
    setTableLoading(true)
    try {
      const [data, q] = await Promise.all([fetchAllMembers(), fetchAllQuotas()])
      setMembers(data)
      setQuotas(q)
      setLastUpdated(new Date())
    } catch {
      // silently ignore — table just stays empty
    } finally {
      setTableLoading(false)
    }
  }

  const handleLogout = async () => {
    setLogoutOpen(false)
    await logout()
    navigate('/admin/login', { replace: true })
  }

  const applyCheckIn = (updated: Member, wasAlready: boolean) => {
    setCheckedMember(updated)
    setCheckStatus(wasAlready ? 'duplicate' : 'success')
    // Update the table row in-place
    setMembers(prev =>
      prev.map(m => m.id === updated.id ? { ...m, checked_in: true } : m)
    )
    if (wasAlready) {
      showToast(`${updated.first_name} ${updated.last_name} is already checked in.`, 'warning')
    } else {
      showToast(`✓ ${updated.first_name} ${updated.last_name} has been checked in!`, 'success')
    }
  }

  const handleToggleCheckIn = async (member: Member) => {
    if (member.checked_in || togglingId) return
    setTogglingId(member.id)
    try {
      const updated = await checkInByTicket(member.ticket_number!)
      applyCheckIn(updated, false)
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Check-in failed', 'error')
    } finally {
      setTogglingId(null)
    }
  }

  const handleManualSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!ticketInput.trim()) return
    await handleTicketScan(ticketInput)
  }

  const handleTicketScan = async (ticketNumber: string) => {
    setCheckStatus('loading')
    setCheckedMember(null)
    setErrorMsg('')

    const wasAlready = members.find(m => m.ticket_number === ticketNumber.trim().toUpperCase())?.checked_in ?? false

    try {
      const member = await checkInByTicket(ticketNumber)
      applyCheckIn(member, wasAlready)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Scan failed')
      setCheckStatus('error')
      showToast(err instanceof Error ? err.message : 'Scan failed', 'error')
    }
  }

  const startCamera = async () => {
    try {
      setCameraActive(true)
      const scanner = new Html5Qrcode(scannerDivId)
      scannerRef.current = scanner
      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decoded) => {
          await stopCamera()
          await handleTicketScan(decoded)
        },
        () => {}
      )
    } catch {
      setCameraActive(false)
      showToast('Camera access denied or unavailable.', 'error')
    }
  }

  const stopCamera = async () => {
    if (scannerRef.current?.isScanning) await scannerRef.current.stop()
    scannerRef.current = null
    setCameraActive(false)
  }

  const resetForm = () => {
    setCheckStatus('idle')
    setCheckedMember(null)
    setErrorMsg('')
    setTicketInput('')
  }

  const filteredMembers = useMemo(() => {
    const q = tableSearch.toLowerCase()
    return members.filter(m =>
      m.first_name.toLowerCase().includes(q) ||
      m.last_name.toLowerCase().includes(q)  ||
      (m.ticket_number ?? '').toLowerCase().includes(q) ||
      m.country.toLowerCase().includes(q)
    )
  }, [members, tableSearch])

  const checkedInCount = useMemo(() => members.filter(m => m.checked_in).length, [members])

  const downloadCountryExcel = () => {
    if (!countryDialog || !paidMembers.length) return
    const rows = paidMembers.map((m, i) => ({
      '#':           i + 1,
      'First Name':  m.first_name,
      'Last Name':   m.last_name,
      'Gender':      m.gender.charAt(0).toUpperCase() + m.gender.slice(1),
      'Checked In':  m.checked_in ? 'Yes' : 'No',
    }))
    const ws = XLSX.utils.json_to_sheet(rows)
    ws['!cols'] = [{ wch: 4 }, { wch: 16 }, { wch: 16 }, { wch: 10 }, { wch: 12 }]
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, countryDialog.label)
    XLSX.writeFile(wb, `${countryDialog.label}_paid_members.xlsx`)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>

      {/* AppBar */}
      <AppBar position="sticky" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar sx={{ minHeight: { xs: 52, sm: 64 } }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography fontWeight={700} sx={{ fontSize: { xs: '0.95rem', sm: '1.25rem' } }}>
              HP Admin Panel
            </Typography>
            {lastUpdated && (
              <Typography sx={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1 }}>
                Live · updated {lastUpdated.toLocaleTimeString()}
              </Typography>
            )}
          </Box>
          {isMobile ? (
            <IconButton color="inherit" onClick={() => setLogoutOpen(true)} size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
              <LogoutIcon fontSize="small" />
            </IconButton>
          ) : (
            <Button onClick={() => setLogoutOpen(true)} startIcon={<LogoutIcon />}
              sx={{ color: 'white', fontWeight: 600, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2, px: 2, '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
              Logout
            </Button>
          )}
        </Toolbar>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          textColor="inherit"
          slotProps={{ indicator: { style: { background: 'white', height: 3, borderRadius: 2 } } }}
          sx={{
            minHeight: 44,
            px: 1,
            '& .MuiTab-root': {
              color: 'rgba(255,255,255,0.65)',
              minHeight: 44,
              fontWeight: 600,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              '&.Mui-selected': { color: 'white' },
            },
          }}
        >
          <Tab icon={<QrCodeScannerIcon fontSize="small" />} iconPosition="start" label="Scanner" />
          <Tab icon={<BarChartIcon fontSize="small" />} iconPosition="start" label="Dashboard" />
        </Tabs>
      </AppBar>

      {/* ── Dashboard tab ── */}
      {activeTab === 1 && (() => {
        // Always count actual member rows per country — most accurate, avoids member_count mismatch
        const regByCountry: Record<string, number> = {}
        for (const m of members) {
          if (m.country && m.country !== '—') {
            regByCountry[m.country] = (regByCountry[m.country] ?? 0) + 1
          }
        }
        // checked-in counts always from members table
        const chk: Record<string, number> = {}
        for (const m of members) {
          if (m.checked_in) chk[m.country] = (chk[m.country] ?? 0) + 1
        }
        // age groups (as of event date) + gender — from members table
        const ageGroups = { a0_5: 0, a5_12: 0, a12_18: 0, a18plus: 0 }
        const genderCount = { male: 0, female: 0 }
        for (const m of members) {
          if (m.dob) {
            const age = ageAtEvent(m.dob)
            if (age <= 5)       ageGroups.a0_5++
            else if (age <= 12) ageGroups.a5_12++
            else if (age <= 18) ageGroups.a12_18++
            else                ageGroups.a18plus++
          }
          if (m.gender === 'male')   genderCount.male++
          if (m.gender === 'female') genderCount.female++
        }

        // totals — members.length is always reliable regardless of RLS
        const totalRegistered = members.length
        const totalQ          = quotas.reduce((s, q) => s + q.maxMembers, 0)
        const totalRem        = Math.max(0, totalQ - totalRegistered)
        const countriesActive = Object.keys(regByCountry).filter(c => c !== '—').length
        const rows            = [...quotas]
          .map(q => ({ code: q.countryCode, quota: q.maxMembers, registered: regByCountry[q.countryCode] ?? 0, checkedIn: chk[q.countryCode] ?? 0 }))
          .sort((a, b) => b.registered - a.registered)
        return (
          <Box sx={{
            height: { sm: 'calc(100vh - 108px)' },
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
            p: { xs: 1.5, sm: 2 }, maxWidth: 1200, mx: 'auto',
          }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2, flexShrink: 0 }}>
              <Box sx={{ flex: '1 1 140px', minWidth: 0 }}>
                <StatCard icon={<PeopleIcon fontSize="small" />} label="Total Registered" value={totalRegistered} sub={`of ${totalQ} total quota`} accent="#6B4A96" />
              </Box>
              <Box sx={{ flex: '1 1 140px', minWidth: 0 }}>
                <StatCard icon={<HowToRegIcon fontSize="small" />} label="Checked In" value={checkedInCount}
                  sub={totalRegistered > 0 ? `${Math.round((checkedInCount / totalRegistered) * 100)}% attendance` : '—'} accent="#2e7d32" />
              </Box>
              <Box sx={{ flex: '1 1 140px', minWidth: 0 }}>
                <StatCard icon={<PublicIcon fontSize="small" />} label="Countries" value={countriesActive} sub={`of ${quotas.length} allocated`} accent="#0277bd" />
              </Box>
              <Box sx={{ flex: '1 1 140px', minWidth: 0 }}>
                <StatCard icon={<EventSeatIcon fontSize="small" />} label="Spots Remaining" value={totalRem}
                  sub={`${Math.round(((totalQ - totalRem) / (totalQ || 1)) * 100)}% filled overall`}
                  accent={totalRem < totalQ * 0.1 ? '#d32f2f' : '#f57c00'} />
              </Box>
            </Box>
            {/* Age Groups + Gender */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexShrink: 0, flexWrap: 'wrap' }}>
              {/* Age Groups Card */}
              <Card elevation={0} sx={{ flex: '2 1 320px', minWidth: 0, borderRadius: '16px', position: 'relative', overflow: 'hidden',
                '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#7c669b' },
              }}>
                <CardContent sx={{ pt: 2, pb: '12px !important' }}>
                  <Typography variant="body2" color="text.secondary" fontWeight={600} fontSize={12}
                    sx={{ mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Age Groups
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {([
                      { label: '0–5',   value: ageGroups.a0_5,    color: '#7c669b' },
                      { label: '5–12',  value: ageGroups.a5_12,   color: '#0277bd' },
                      { label: '12–18', value: ageGroups.a12_18,  color: '#f57c00' },
                      { label: '18+',   value: ageGroups.a18plus, color: '#2e7d32' },
                    ] as const).map(({ label, value, color }) => (
                      <Box key={label} sx={{
                        flex: 1, textAlign: 'center', borderRadius: 2,
                        bgcolor: `${color}0d`, border: '1px solid', borderColor: `${color}25`,
                        py: 1.25, px: 0.5,
                      }}>
                        <Typography fontWeight={800} fontSize={{ xs: 20, sm: 24 }} color={color} lineHeight={1}>{value}</Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600} fontSize={11}>{label} yrs</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>

              {/* Gender Card */}
              <Card elevation={0} sx={{ flex: '1 1 180px', minWidth: 0, borderRadius: '16px', position: 'relative', overflow: 'hidden',
                '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#0277bd' },
              }}>
                <CardContent sx={{ pt: 2, pb: '12px !important' }}>
                  <Typography variant="body2" color="text.secondary" fontWeight={600} fontSize={12}
                    sx={{ mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Gender
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {([
                      { label: 'Male',   value: genderCount.male,   color: '#0277bd', icon: '♂' },
                      { label: 'Female', value: genderCount.female, color: '#c2185b', icon: '♀' },
                    ] as const).map(({ label, value, color, icon }) => (
                      <Box key={label} sx={{
                        flex: 1, textAlign: 'center', borderRadius: 2,
                        bgcolor: `${color}0d`, border: '1px solid', borderColor: `${color}25`,
                        py: 1.25, px: 0.5,
                      }}>
                        <Typography fontWeight={800} fontSize={{ xs: 20, sm: 24 }} color={color} lineHeight={1}>{value}</Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600} fontSize={11}>{icon} {label}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, fontSize: { xs: '1rem', sm: '1.1rem' }, flexShrink: 0 }}>
              Country Breakdown
            </Typography>
            {tableLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
            ) : (
              <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, flex: 1, minHeight: 0, overflow: 'auto' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'rgba(107,74,150,0.06)' }}>
                      <TableCell sx={{ fontWeight: 700 }}>Country</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">Reg.</TableCell>
                      <TableCell sx={{ fontWeight: 700, display: { xs: 'none', sm: 'table-cell' } }} align="center">Checked In</TableCell>
                      <TableCell sx={{ fontWeight: 700, display: { xs: 'none', sm: 'table-cell' } }} align="center">Quota</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">Left</TableCell>
                      <TableCell sx={{ fontWeight: 700, display: { xs: 'none', sm: 'table-cell' }, minWidth: 140 }}>Fill</TableCell>
                      <TableCell sx={{ fontWeight: 700, display: { xs: 'table-cell', sm: 'none' } }} align="center">%</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">Members</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(r => {
                      const meta      = countryMeta(r.code)
                      const pct       = r.quota > 0 ? Math.min(100, Math.round((r.registered / r.quota) * 100)) : 0
                      const color     = quotaFillColor(pct)
                      const remaining = Math.max(0, r.quota - r.registered)
                      return (
                        <TableRow key={r.code} sx={{ '&:hover': { bgcolor: 'rgba(107,74,150,0.04)' } }}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography fontSize={20} lineHeight={1}>{meta.flag}</Typography>
                              <Typography fontWeight={600} fontSize={13}>{meta.label}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Typography fontWeight={700} color="primary.main">{r.registered}</Typography>
                          </TableCell>
                          <TableCell align="center" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                            <Typography fontWeight={700} color="success.main">{r.checkedIn}</Typography>
                          </TableCell>
                          <TableCell align="center" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                            <Typography color="text.secondary">{r.quota}</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={remaining === 0 ? 'Full' : remaining}
                              size="small"
                              sx={{
                                fontWeight: 700, fontSize: 11,
                                bgcolor: remaining === 0 ? '#d32f2f18' : '#2e7d3218',
                                color:   remaining === 0 ? '#d32f2f'   : '#2e7d32',
                                border: '1px solid',
                                borderColor: remaining === 0 ? '#d32f2f40' : '#2e7d3240',
                              }}
                            />
                          </TableCell>
                          {/* Progress bar — desktop */}
                          <TableCell sx={{ minWidth: 140, display: { xs: 'none', sm: 'table-cell' } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={pct}
                                sx={{ flex: 1, height: 6, borderRadius: 3, bgcolor: `${color}20`,
                                  '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 3 } }}
                              />
                              <Typography variant="caption" fontWeight={700} color={color} sx={{ minWidth: 32 }}>
                                {pct}%
                              </Typography>
                            </Box>
                          </TableCell>
                          {/* % only — mobile */}
                          <TableCell align="center" sx={{ display: { xs: 'table-cell', sm: 'none' } }}>
                            <Typography variant="caption" fontWeight={700} color={color}>{pct}%</Typography>
                          </TableCell>
                          {/* View paid members button */}
                          <TableCell align="center">
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => openCountryDialog(r.code, meta.label, meta.flag)}
                              sx={{ fontWeight: 600, fontSize: 11, py: 0.25, px: 1, borderRadius: 2, whiteSpace: 'nowrap' }}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )
      })()}

      {/* ── Scanner tab ── */}
      {activeTab === 0 && <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 1.5, sm: 2 },
        p: { xs: 1.5, sm: 2 },
        pt: { xs: 2, sm: 3 },
        maxWidth: 1200,
        mx: 'auto',
      }}>

        {/* ── TOP / LEFT: Scanner Panel ── */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 360px' }, minWidth: 0 }}>

          {/* QR Camera */}
          <Card sx={{ mb: { xs: 1.5, sm: 2 }, borderRadius: 3 }}>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 }, '&:last-child': { pb: { xs: 1.5, sm: 2 } } }}>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Scan QR Code
              </Typography>
              <Box
                id={scannerDivId}
                sx={{ display: cameraActive ? 'block' : 'none', borderRadius: 2, overflow: 'hidden', mb: 1 }}
              />
              {!cameraActive ? (
                <Button fullWidth variant="contained" size="large" startIcon={<QrCodeScannerIcon />} onClick={startCamera} sx={{ py: 1.5 }}>
                  Open Camera
                </Button>
              ) : (
                <Button fullWidth variant="outlined" color="error" onClick={stopCamera}>
                  Stop Camera
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Manual Entry — First + Last Name */}
          <Card sx={{ mb: { xs: 1.5, sm: 2 }, borderRadius: 3 }}>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 }, '&:last-child': { pb: { xs: 1.5, sm: 2 } } }}>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Manual Check-in
              </Typography>
              <Box component="form" onSubmit={handleManualSubmit}>
                <TextField
                  fullWidth size="small"
                  placeholder="e.g. HP-2026-00042-M1"
                  value={ticketInput}
                  onChange={e => setTicketInput(e.target.value.toUpperCase())}
                  sx={{
                    mb: 2,
                    '& input': {
                      fontFamily: 'monospace',
                      letterSpacing: 1,
                      color: 'text.primary',
                    },
                  }}
                  autoComplete="off"
                />
                <Button
                  type="submit" fullWidth variant="contained" size="large"
                  disabled={!ticketInput.trim() || checkStatus === 'loading'}
                  sx={{ py: 1.5, fontWeight: 700, color: '#fff', '&.Mui-disabled': { color: 'rgba(255,255,255,0.45)' } }}
                >
                  {checkStatus === 'loading'
                    ? <CircularProgress size={22} color="inherit" />
                    : 'Check In'}
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Result Card */}
          {checkStatus !== 'idle' && checkStatus !== 'loading' && (
            <Card
              sx={{
                borderRadius: 3, border: 2,
                borderColor:
                  checkStatus === 'success'   ? 'success.main' :
                  checkStatus === 'duplicate' ? 'warning.main' : 'error.main',
              }}
            >
              <CardContent>
                {checkStatus === 'success' && checkedMember && (
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <CheckCircleIcon color="success" sx={{ fontSize: 32, mt: 0.2 }} />
                    <Box>
                      <Typography fontWeight={700} color="success.main">Check-in Successful</Typography>
                      <Typography variant="h6" fontWeight={800}>
                        {checkedMember.first_name} {checkedMember.last_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {checkedMember.ticket_number ?? '—'} · {checkedMember.country}
                      </Typography>
                    </Box>
                  </Box>
                )}

                {checkStatus === 'duplicate' && checkedMember && (
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <WarningAmberIcon color="warning" sx={{ fontSize: 32, mt: 0.2 }} />
                    <Box>
                      <Typography fontWeight={700} color="warning.main">Already Checked In</Typography>
                      <Typography variant="h6" fontWeight={800}>
                        {checkedMember.first_name} {checkedMember.last_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {checkedMember.ticket_number ?? '—'} · {checkedMember.country}
                      </Typography>
                    </Box>
                  </Box>
                )}

                {checkStatus === 'error' && (
                  <Alert severity="error" sx={{ mb: 0 }}>{errorMsg}</Alert>
                )}

                <Divider sx={{ my: 1.5 }} />
                <Button fullWidth variant="outlined" size="small" onClick={resetForm}>
                  Next Check-in
                </Button>
              </CardContent>
            </Card>
          )}
        </Box>

        {/* ── RIGHT: Members Table ── */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 }, '&:last-child': { pb: { xs: 1.5, sm: 2 } } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ flexGrow: 1 }}>
                  All Members
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    bgcolor: 'success.main',
                    borderRadius: 2,
                    px: 2,
                    py: 0.75,
                  }}
                >
                  <CheckCircleIcon sx={{ color: 'white', fontSize: 20 }} />
                  <Box>
                    <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.1rem', lineHeight: 1.1 }}>
                      {checkedInCount} / {members.length}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                      Checked In
                    </Typography>
                  </Box>
                </Box>
                <IconButton size="small" onClick={loadMembers} title="Refresh">
                  {tableLoading ? <CircularProgress size={18} /> : <RefreshIcon />}
                </IconButton>
              </Box>

              <TextField
                fullWidth size="small" placeholder="Search name, ticket, country…"
                value={tableSearch}
                onChange={e => setTableSearch(e.target.value)}
                sx={{ mb: 2 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ borderRadius: 2, maxHeight: { xs: 380, sm: 460, md: 560 }, overflow: 'auto' }}
              >
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>First Name</TableCell>
                      <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>Last Name</TableCell>
                      <TableCell sx={{ fontWeight: 700, display: { xs: 'none', sm: 'table-cell' } }}>Country</TableCell>
                      <TableCell sx={{ fontWeight: 700, display: { xs: 'none', md: 'table-cell' } }}>Ticket</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">Status</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">Check In</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableLoading && members.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                          <CircularProgress size={28} />
                        </TableCell>
                      </TableRow>
                    ) : filteredMembers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                          {tableSearch ? 'No results found' : 'No members yet'}
                        </TableCell>
                      </TableRow>
                    ) : filteredMembers.map(m => (
                      <TableRow
                        key={m.id}
                        sx={{
                          bgcolor: m.checked_in ? 'rgba(46,125,50,0.07)' : 'inherit',
                          '&:hover': { bgcolor: m.checked_in ? 'rgba(46,125,50,0.12)' : 'action.hover' },
                        }}
                      >
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{m.first_name}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{m.last_name}</TableCell>
                        <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, whiteSpace: 'nowrap' }}>
                          {m.country && m.country !== '—' ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                              <span>{countryMeta(m.country).flag}</span>
                              <span>{countryMeta(m.country).label}</span>
                            </Box>
                          ) : '—'}
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.72rem', display: { xs: 'none', md: 'table-cell' } }}>
                          {m.ticket_number ?? '—'}
                        </TableCell>
                        <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                          {m.checked_in
                            ? <Chip label={isMobile ? '✓' : 'Checked In'} size="small" color="success" />
                            : <Chip label={isMobile ? '–' : 'Pending'}    size="small" variant="outlined" />}
                        </TableCell>
                        <TableCell align="center">
                          {togglingId === m.id
                            ? <CircularProgress size={20} />
                            : (
                              <Switch
                                checked={m.checked_in}
                                disabled={m.checked_in || !m.ticket_number}
                                onChange={() => handleToggleCheckIn(m)}
                                color="success"
                                size="small"
                              />
                            )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>}

      {/* Country paid members dialog */}
      <Dialog
        open={!!countryDialog}
        onClose={() => setCountryDialog(null)}
        maxWidth="sm"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 3 } } }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1 }}>
          <Typography fontSize={24}>{countryDialog?.flag}</Typography>
          <Box>
            <Typography fontWeight={700} fontSize="1.1rem">{countryDialog?.label}</Typography>
            <Typography variant="caption" color="text.secondary">Paid Members</Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {paidLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={28} />
            </Box>
          ) : paidMembers.length === 0 ? (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">No paid members found for this country.</Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ px: 3, pb: 1 }}>
                <Chip label={`${paidMembers.length} paid member${paidMembers.length !== 1 ? 's' : ''}`}
                  size="small" color="success" sx={{ fontWeight: 700 }} />
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'rgba(107,74,150,0.06)' }}>
                      <TableCell sx={{ fontWeight: 700 }}>#</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>First Name</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Last Name</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Gender</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paidMembers.map((m, i) => (
                      <TableRow key={i} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                        <TableCell sx={{ color: 'text.secondary', fontSize: 12 }}>{i + 1}</TableCell>
                        <TableCell>{m.first_name}</TableCell>
                        <TableCell>{m.last_name}</TableCell>
                        <TableCell sx={{ textTransform: 'capitalize' }}>{m.gender}</TableCell>
                        <TableCell align="center">
                          {m.checked_in
                            ? <Chip label="Checked In" size="small" color="success" />
                            : <Chip label="Pending"    size="small" variant="outlined" />}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setCountryDialog(null)} variant="outlined" sx={{ borderRadius: 2 }}>
            Close
          </Button>
          <Button
            onClick={downloadCountryExcel}
            variant="contained"
            disabled={paidLoading || paidMembers.length === 0}
            sx={{ borderRadius: 2, fontWeight: 700 }}
          >
            Download Excel ({paidMembers.length})
          </Button>
        </DialogActions>
      </Dialog>

      {/* Logout confirmation dialog */}
      <Dialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        slotProps={{ paper: { sx: { borderRadius: 3, p: 1, maxWidth: 360, width: '100%' } } }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
          <Box
            sx={{
              width: 40, height: 40, borderRadius: '50%',
              bgcolor: 'error.light', display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            <LogoutIcon sx={{ color: 'error.main', fontSize: 20 }} />
          </Box>
          <Typography fontWeight={700} fontSize="1.1rem">Sign Out</Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 0 }}>
          <Typography color="text.secondary">
            Are you sure you want to sign out of the admin panel?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button
            fullWidth variant="outlined"
            onClick={() => setLogoutOpen(false)}
            sx={{ borderRadius: 2, fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            fullWidth variant="contained" color="error"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{ borderRadius: 2, fontWeight: 700 }}
          >
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast(t => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ top: { xs: 60, sm: 72 } }}
      >
        <Alert
          severity={toast.sev}
          onClose={() => setToast(t => ({ ...t, open: false }))}
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1rem', sm: '1.15rem' },
            py: 1.5,
            px: 3,
            alignItems: 'center',
            boxShadow: 6,
            minWidth: { xs: 280, sm: 380 },
            '& .MuiAlert-icon': { fontSize: 28 },
          }}
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  )
}
