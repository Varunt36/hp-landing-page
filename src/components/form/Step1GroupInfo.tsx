// src/components/form/Step1GroupInfo.tsx
import { useState } from 'react'
import {
  Typography, Box, FormControl, InputLabel, Select, MenuItem,
  TextField, Button, FormHelperText,
} from '@mui/material'
import { useRegistrationStore } from '../../store/registrationStore'
import { COUNTRIES } from '../../data/data'
import { step1Styles } from './Step1GroupInfo.styles'

export default function Step1GroupInfo() {
  const { groupInfo, setGroupInfo, setStep } = useRegistrationStore()
  const [country,     setCountry]     = useState(groupInfo.country)
  const [karyakarta,  setKaryakarta]  = useState(groupInfo.karyakarta)
  const [memberCount, setMemberCount] = useState(groupInfo.memberCount)

  const handleNext = () => {
    setGroupInfo({ country, karyakarta, memberCount })
    setStep(2)
  }

  return (
    <Box>
      <Typography variant="h5" color="primary" fontWeight={700} mb={0.5}>
        Group Information
      </Typography>

      <FormControl fullWidth sx={step1Styles.countryFormControl}>
        <InputLabel>Country of residence *</InputLabel>
        <Select
          value={country}
          label="Country of residence *"
          onChange={(e) => setCountry(e.target.value)}
        >
          {COUNTRIES.map((c) => (
            <MenuItem key={c.code} value={c.code}>{c.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Local karyakarta name"
        value={karyakarta}
        onChange={(e) => setKaryakarta(e.target.value)}
        sx={step1Styles.karyakartaField}
      />

      <FormControl fullWidth sx={step1Styles.memberCountFormControl}>
        <InputLabel>Number of family members *</InputLabel>
        <Select
          value={memberCount}
          label="Number of family members *"
          onChange={(e) => setMemberCount(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <MenuItem key={n} value={n}>{n}</MenuItem>
          ))}
        </Select>
        <FormHelperText>NOTE: At least one member must be over the age of 18.</FormHelperText>
      </FormControl>

      <Box sx={step1Styles.navBox}>
        <Button variant="contained" color="secondary" onClick={handleNext} sx={step1Styles.nextButton}>
          Next →
        </Button>
      </Box>
    </Box>
  )
}
