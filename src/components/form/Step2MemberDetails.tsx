// src/components/form/Step2MemberDetails.tsx
import { useState, useEffect } from 'react'
import {
  Typography, Box, TextField, FormControl, FormLabel,
  RadioGroup, FormControlLabel, Radio, Button, Grid,
} from '@mui/material'
import { useRegistrationStore, type MemberDetail } from '../../store/registrationStore'
import { step2Styles } from './Step2MemberDetails.styles'

const EMPTY_MEMBER: MemberDetail = {
  firstName: '', middleName: '', lastName: '',
  gender: 'male', dob: '', email: '', phone: '',
}

export default function Step2MemberDetails() {
  const { groupInfo, members, setMember, setStep } = useRegistrationStore()
  const [currentMember, setCurrentMember] = useState(1)
  const [form, setForm] = useState<MemberDetail>(members[0] ?? EMPTY_MEMBER)

  useEffect(() => {
    setForm(members[currentMember - 1] ?? EMPTY_MEMBER)
  }, [currentMember, members])

  const updateField = (field: keyof MemberDetail, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const saveAndGo = (direction: 'next' | 'prev') => {
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

  const isPrimary = currentMember === 1

  return (
    <Box>
      <Typography variant="h5" color="primary" fontWeight={700} mb={0.5}>
        Member Details
      </Typography>
      <Typography color="text.secondary" fontSize={15} mb={2}>
        Member {currentMember} of {groupInfo.memberCount}
      </Typography>
      {isPrimary && (
        <Typography color="text.secondary" fontSize={12} mb={2}>
          Contact details (email &amp; phone) are only required for the primary registrant.
        </Typography>
      )}

      <Grid container spacing={1.5} sx={step2Styles.nameGrid}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth label="First name *" value={form.firstName}
            onChange={(e) => updateField('firstName', e.target.value)} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth label="Middle name" value={form.middleName}
            onChange={(e) => updateField('middleName', e.target.value)} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField fullWidth label="Last name *" value={form.lastName}
            onChange={(e) => updateField('lastName', e.target.value)} />
        </Grid>
      </Grid>

      <FormControl sx={step2Styles.genderFormControl}>
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
        sx={step2Styles.dobField}
      />

      {isPrimary && (
        <>
          <TextField fullWidth label="Email *" type="email"
            value={form.email ?? ''} onChange={(e) => updateField('email', e.target.value)}
            helperText="All correspondence will be sent to this address."
            sx={step2Styles.emailField} />
          <TextField fullWidth label="Mobile number *" type="tel"
            value={form.phone ?? ''} onChange={(e) => updateField('phone', e.target.value)}
            placeholder="+49 123 456789" sx={step2Styles.phoneField} />
        </>
      )}

      <Box sx={step2Styles.navBox}>
        <Button variant="outlined" onClick={() => saveAndGo('prev')}>← Back</Button>
        <Button variant="contained" color="secondary" onClick={() => saveAndGo('next')} sx={step2Styles.nextButton}>
          Next →
        </Button>
      </Box>
    </Box>
  )
}
