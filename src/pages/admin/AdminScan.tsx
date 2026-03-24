import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Card, CardContent, TextField, Button, Typography,
  IconButton, Chip, Divider, AppBar, Toolbar, CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Alert, Snackbar, InputAdornment, useTheme, useMediaQuery, Switch,
  Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import LogoutIcon from '@mui/icons-material/Logout'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import SearchIcon from '@mui/icons-material/Search'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Html5Qrcode } from 'html5-qrcode'
import { useAuth } from '../../context/AuthContext'
import { fetchAllMembers, checkInByTicket, type Member } from '../../api/admin'

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

  // Load members on mount + camera cleanup on unmount
  useEffect(() => {
    loadMembers()
    return () => { void stopCamera() }
  }, []) // eslint-disable-line

  const loadMembers = async () => {
    setTableLoading(true)
    try {
      const data = await fetchAllMembers()
      setMembers(data)
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

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>

      {/* AppBar */}
      <AppBar position="sticky" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar sx={{ minHeight: { xs: 52, sm: 64 } }}>
          <QrCodeScannerIcon sx={{ mr: 1, fontSize: { xs: 20, sm: 24 } }} />
          <Typography
            fontWeight={700}
            sx={{ flexGrow: 1, fontSize: { xs: '0.95rem', sm: '1.25rem' } }}
          >
            {isMobile ? 'Check-in' : 'Check-in Scanner'}
          </Typography>
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
                color: 'white',
                fontWeight: 600,
                bgcolor: 'rgba(255,255,255,0.1)',
                borderRadius: 2,
                px: 2,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{
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
                  sx={{ fontWeight: 700 }}
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

        {/* ── BOTTOM / RIGHT: Members Table ── */}
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
                        <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{m.country}</TableCell>
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
      </Box>

      {/* Logout confirmation dialog */}
      <Dialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        PaperProps={{ sx: { borderRadius: 3, p: 1, maxWidth: 360, width: '100%' } }}
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
