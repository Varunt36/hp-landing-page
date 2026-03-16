// src/components/form/Step1GroupInfo.tsx
// Step 1 of the registration form.
// Collects group-level info: country, local karyakarta name, and number of members.
// On "Next", this data is saved to the global store and the form advances to Step 2.

import { useState } from 'react'
import {
  Typography, Box, FormControl, InputLabel, Select, MenuItem,
  TextField, Button, FormHelperText,
} from '@mui/material'
import { useRegistrationStore } from '../../store/registrationStore'
import { COUNTRIES, MAX_GROUP_SIZE } from '../../data/data'
import { step1Styles } from './Step1GroupInfo.styles'
import { sharedFormStyles } from './formShared.styles'

export default function Step1GroupInfo() {
  const { groupInfo, setGroupInfo, setStep } = useRegistrationStore()

  // Local state mirrors the store so edits don't affect global state until "Next" is clicked
  const [country,     setCountry]     = useState(groupInfo.country)
  const [karyakarta,  setKaryakarta]  = useState(groupInfo.karyakarta)
  const [memberCount, setMemberCount] = useState(groupInfo.memberCount)
  const [karyakartaError, setKaryakartaError] = useState('')

  // Validates, persists to store, then advances to Step 2
  const handleNext = () => {
    if (!karyakarta.trim()) {
      setKaryakartaError('Local karyakarta name is required.')
      return
    }
    setGroupInfo({ country, karyakarta, memberCount })
    setStep(2)
  }

  return (
    <Box>
      <Typography variant="h5" color="primary" fontWeight={700} mb={0.5}>
        Group Information
      </Typography>

      {/* gap: 20px between all fields via fieldStack wrapper */}
      <Box sx={step1Styles.fieldStack}>
        {/* Country of residence — used for pricing/routing decisions */}
        <FormControl fullWidth>
          <InputLabel>Country of residence *</InputLabel>
          <Select
            value={country}
            label="Country of residence *"
            onChange={(e) => setCountry(e.target.value)}
          >
            {COUNTRIES.map((c) => (
              <MenuItem key={c.code} value={c.code}>
                {c.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Karyakarta is the local YDS contact responsible for this group */}
        <TextField
          fullWidth
          label="Local karyakarta name *"
          value={karyakarta}
          onChange={(e) => { setKaryakarta(e.target.value); setKaryakartaError('') }}
          error={!!karyakartaError}
          helperText={karyakartaError}
        />

        {/* MAX_GROUP_SIZE is defined in data.ts — change it there to update the dropdown */}
        <FormControl fullWidth>
          <InputLabel>Number of family members *</InputLabel>
          <Select
            value={memberCount}
            label="Number of family members *"
            onChange={(e) => setMemberCount(Number(e.target.value))}
          >
            {Array.from({ length: MAX_GROUP_SIZE }, (_, i) => i + 1).map((n) => (
              <MenuItem key={n} value={n}>
                {n}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            NOTE: At least one member must be over the age of 18.
          </FormHelperText>
        </FormControl>
      </Box>

      <Box sx={sharedFormStyles.navBox}>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleNext}
          sx={sharedFormStyles.nextButton}
        >
          Next →
        </Button>
      </Box>
    </Box>
  )
}
