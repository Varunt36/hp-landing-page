// src/components/form/Step2MemberDetails.tsx
// Step 2 of the registration form.
// Loops through each member (1 to groupInfo.memberCount), collecting personal details.
// Each member's data is saved to the global store before navigating forward or backward.

import { useState, useEffect } from 'react'
import {
  Typography, Box, TextField, FormControl, FormLabel,
  RadioGroup, FormControlLabel, Radio, Button, Grid, Chip,
} from '@mui/material'
import { useRegistrationStore } from '../../store/registrationStore'
import { type MemberDetail } from '../../api/registrations'
import { step2Styles } from './Step2MemberDetails.styles'
import { sharedFormStyles } from './formShared.styles'

// Default blank member used when a member slot hasn't been filled yet
const EMPTY_MEMBER: MemberDetail = {
  firstName: '', middleName: '', lastName: '',
  gender: 'male', dob: '', email: '', phone: '',
}

// Maps each MemberDetail field to an optional validation error message
type Errors = Partial<Record<keyof MemberDetail, string>>

// Returns a map of field-level errors; empty object means the form is valid
function validate(form: MemberDetail): Errors {
  const errors: Errors = {}
  if (!form.firstName.trim())       errors.firstName = 'First name is required.'
  if (!form.lastName.trim())        errors.lastName  = 'Last name is required.'
  if (!form.dob)                    errors.dob       = 'Date of birth is required.'
  if (!form.email?.trim())          errors.email     = 'Email is required.'
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Enter a valid email address.'
  if (!form.phone?.trim())          errors.phone     = 'Mobile number is required.'
  return errors
}

export default function Step2MemberDetails() {
  const { groupInfo, setMember, setStep } = useRegistrationStore()

  // Tracks which member (1-based) is currently being edited
  const [currentMember, setCurrentMember] = useState(1)

  // Local form state for the member currently being edited.
  const [form, setForm] = useState<MemberDetail>(
    () => useRegistrationStore.getState().members[0] ?? EMPTY_MEMBER
  )
  const [errors, setErrors] = useState<Errors>({})

  // Tracks whether the user has attempted to submit; controls when to show live errors
  const [touched, setTouched] = useState(false)

  // When navigating to a different member, load their stored data (or blank if not yet filled)
  useEffect(() => {
    const stored = useRegistrationStore.getState().members[currentMember - 1]
    setForm(stored ?? EMPTY_MEMBER)
    setErrors({})
    setTouched(false)
  }, [currentMember])

  // Updates a single field in local form state; re-validates if the user has already submitted
  const updateField = (field: keyof MemberDetail, value: string) => {
    const updated = { ...form, [field]: value }
    setForm(updated)
    if (touched) setErrors(validate(updated))
  }

  // Saves current member to the store, then moves forward or backward
  const saveAndGo = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      const errs = validate(form)
      if (Object.keys(errs).length > 0) {
        setErrors(errs)
        setTouched(true)
        return
      }
    }
    setMember(currentMember - 1, form)
    if (direction === 'next') {
      if (currentMember < groupInfo.memberCount) {
        setCurrentMember((p) => p + 1)
      } else {
        setStep(3)
      }
    } else {
      if (currentMember > 1) {
        setCurrentMember((p) => p - 1)
      } else {
        setStep(1)
      }
    }
  }

  // Member 1 is the primary contact; their email receives all correspondence
  const isPrimary = currentMember === 1

  return (
    <Box>
      <Typography variant="h5" color="primary" fontWeight={700} mb={1}>
        Member Details
      </Typography>

      {/* Branded member progress badge */}
      <Chip
        label={`Member ${currentMember} of ${groupInfo.memberCount}`}
        color="primary"
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
      />

      <Box sx={step2Styles.fieldStack}>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="First name *" value={form.firstName}
              onChange={(e) => updateField('firstName', e.target.value)}
              error={!!errors.firstName} helperText={errors.firstName} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="Last name *" value={form.lastName}
              onChange={(e) => updateField('lastName', e.target.value)}
              error={!!errors.lastName} helperText={errors.lastName} />
          </Grid>
        </Grid>

        <FormControl>
          <FormLabel>Gender *</FormLabel>
          <RadioGroup row value={form.gender} onChange={(e) => updateField('gender', e.target.value)}>
            <FormControlLabel value="male"   control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>

        <TextField
          fullWidth label="Date of birth *" type="date"
          value={form.dob} onChange={(e) => updateField('dob', e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          error={!!errors.dob} helperText={errors.dob}
        />

        <TextField fullWidth label="Email *" type="email"
          value={form.email ?? ''} onChange={(e) => updateField('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email ?? (isPrimary ? 'All correspondence will be sent to this address.' : undefined)}
        />

        <TextField fullWidth label="Mobile number *" type="tel"
          value={form.phone ?? ''} onChange={(e) => updateField('phone', e.target.value)}
          placeholder="+49 123 456789"
          error={!!errors.phone} helperText={errors.phone}
        />
      </Box>

      <Box sx={sharedFormStyles.navBox}>
        <Button variant="outlined" onClick={() => saveAndGo('prev')} sx={sharedFormStyles.backButton}>
          ← Back
        </Button>
        <Button variant="contained" color="inherit" onClick={() => saveAndGo('next')} sx={sharedFormStyles.nextButton}>
          Next →
        </Button>
      </Box>
    </Box>
  )
}
