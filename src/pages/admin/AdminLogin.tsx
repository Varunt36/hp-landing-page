import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Card, CardContent, TextField, Button,
  Typography, Alert, InputAdornment, IconButton, CircularProgress, Divider,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import HomeIcon from '@mui/icons-material/Home'
import { useAuth } from '../../context/AuthContext'
import { HERO_GRADIENT } from '../../theme/theme'

// Shared sx to fix MUI label/border appearing in theme secondary (pink) color
const fieldSx = {
  '& label': { color: 'text.secondary' },
  '& label.Mui-focused': { color: 'primary.main' },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': { borderColor: 'primary.light' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
  },
}

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const err = await login(email, password)
    setLoading(false)
    if (err) {
      setError(err)
      setPassword('')
    } else {
      navigate('/admin/scan', { replace: true })
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: HERO_GRADIENT,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      {/* Back to Home button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: { xs: 16, sm: 24 },
          left: { xs: 16, sm: 24 },
          color: 'rgba(255,255,255,0.85)',
          fontWeight: 600,
          '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
        }}
      >
        Back to Home
      </Button>

      <Card
        sx={{
          width: '100%',
          maxWidth: 420,
          borderRadius: 4,
          boxShadow: '0 32px 64px rgba(0,0,0,0.45)',
          overflow: 'hidden',
        }}
      >
        {/* Teal header strip */}
        <Box
          sx={{
            bgcolor: 'primary.main',
            py: 3,
            px: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 56, height: 56, borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid rgba(255,255,255,0.3)',
            }}
          >
            <LockOutlinedIcon sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <Typography variant="h6" fontWeight={700} color="white">
            Admin Access
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)', letterSpacing: 0.5 }}>
            HariPrabodham 2026 · HariPrabodham Germany
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2.5 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth label="Email" type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
              sx={{ mb: 2, ...fieldSx }}
            />
            <TextField
              fullWidth label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              sx={{ mb: 3, ...fieldSx }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(s => !s)} edge="end" size="small">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              type="submit" fullWidth variant="contained" size="large"
              disabled={!email || !password || loading}
              sx={{ fontWeight: 700, py: 1.5, borderRadius: 2, fontSize: '1rem' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Button
            fullWidth
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              color: 'text.secondary',
              borderColor: 'divider',
              '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
            }}
          >
            Return to Home Page
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}
