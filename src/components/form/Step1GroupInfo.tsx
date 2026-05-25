// src/components/form/Step1GroupInfo.tsx
// Step 1 of the registration form.
// Collects group-level info: country, local karyakarta name, and number of members.
// On "Next", this data is saved to the global store and the form advances to Step 2.

import { useState, useEffect } from 'react'
import {
  Typography, Box, FormControl, InputLabel, Select, MenuItem,
  TextField, Button, FormHelperText, CircularProgress, Alert,
} from '@mui/material'
import { useRegistrationStore } from '../../store/registrationStore'
import { COUNTRIES, MAX_GROUP_SIZE } from '../../data/data'
import { fetchCountryQuota, fetchAvailableCountryCodes, type CountryQuota } from '../../api/quotas'
import { step1Styles } from './Step1GroupInfo.styles'
import { sharedFormStyles } from './FormShared.styles'
import { C } from '../../theme/theme'

export default function Step1GroupInfo() {
  const { groupInfo, setGroupInfo, setStep } = useRegistrationStore()

  const [country,     setCountry]     = useState(groupInfo.country)
  const [karyakarta,  setKaryakarta]  = useState(groupInfo.karyakarta)
  const [memberCount, setMemberCount] = useState(groupInfo.memberCount)
  const [karyakartaError, setKaryakartaError] = useState('')

  // null = still loading, string[] = loaded (empty means fetch failed → fall back to all)
  const [availableCodes, setAvailableCodes] = useState<string[] | null>(null)

  useEffect(() => {
    fetchAvailableCountryCodes().then(codes => {
      setAvailableCodes(codes)
      if (codes.length > 0 && !codes.includes(country)) {
        setCountry(codes[0])
        setMemberCount(1)
      }
    }).catch(() => setAvailableCodes([]))
  }, [])

  const [quota,        setQuota]        = useState<CountryQuota | null>(null)
  const [quotaLoading, setQuotaLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    setQuota(null)
    setQuotaLoading(true)
    fetchCountryQuota(country).then(q => {
      if (!cancelled) { setQuota(q); setQuotaLoading(false) }
    }).catch(() => {
      if (!cancelled) setQuotaLoading(false)
    })
    return () => { cancelled = true }
  }, [country])

  const handleNext = () => {
    if (!karyakarta.trim()) {
      setKaryakartaError('Local karyakarta name is required.')
      return
    }
    if (quota && memberCount > quota.remaining) return
    setGroupInfo({ country, karyakarta, memberCount })
    setStep(2)
  }

  const quotaFull    = quota !== null && quota.remaining === 0
  const quotaWarning = quota !== null && memberCount > quota.remaining && quota.remaining > 0

  return (
    <Box>
      <Typography sx={{ fontFamily: '"Blue Mirage", serif', fontSize: { xs: '1.75rem', sm: '2rem' }, color: C.purple800, lineHeight: 1.2, mb: 0.5 }}>
        Group Information
      </Typography>

      <Box sx={step1Styles.fieldStack}>
        {/* Country of residence */}
        <FormControl fullWidth>
          <InputLabel>Country of residence *</InputLabel>
          <Select
            value={country}
            label="Country of residence *"
            onChange={(e) => { setCountry(e.target.value); setMemberCount(1) }}
            disabled={availableCodes === null}
          >
            {(availableCodes === null || availableCodes.length === 0
              ? COUNTRIES
              : COUNTRIES.filter(c => availableCodes.includes(c.code))
            ).map((c) => (
              <MenuItem key={c.code} value={c.code}>
                {c.label}
              </MenuItem>
            ))}
          </Select>
          {quotaLoading && (
            <FormHelperText>
              <CircularProgress size={10} sx={{ mr: 0.5 }} />
              Checking availability…
            </FormHelperText>
          )}
        </FormControl>

        {quotaFull && (
          <Alert severity="error">
            Registrations from {COUNTRIES.find(c => c.code === country)?.label} are currently full. Please contact the organiser for assistance.
          </Alert>
        )}

        {quotaWarning && (
          <Alert severity="warning">
            Only {quota!.remaining} spot{quota!.remaining !== 1 ? 's' : ''} remaining for {COUNTRIES.find(c => c.code === country)?.label}. Please reduce your group size.
          </Alert>
        )}

        {/* Karyakarta */}
        <TextField
          fullWidth
          label="Local karyakarta name *"
          value={karyakarta}
          onChange={(e) => { setKaryakarta(e.target.value); setKaryakartaError('') }}
          error={!!karyakartaError}
          helperText={karyakartaError}
        />

        {/* Member count — capped to quota remaining if quota is set */}
        <FormControl fullWidth>
          <InputLabel>Number of family members *</InputLabel>
          <Select
            value={memberCount}
            label="Number of family members *"
            onChange={(e) => setMemberCount(Number(e.target.value))}
            disabled={quotaFull}
          >
            {Array.from(
              { length: quota ? Math.min(MAX_GROUP_SIZE, quota.remaining) : MAX_GROUP_SIZE },
              (_, i) => i + 1
            ).map((n) => (
              <MenuItem key={n} value={n}>{n}</MenuItem>
            ))}
          </Select>

        </FormControl>
      </Box>

      <Box sx={sharedFormStyles.navBox}>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleNext}
          disabled={quotaFull || quotaWarning}
          sx={sharedFormStyles.nextButton}
        >
          Next →
        </Button>
      </Box>
    </Box>
  )
}
