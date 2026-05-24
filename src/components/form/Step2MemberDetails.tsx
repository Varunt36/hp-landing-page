// src/components/form/Step2MemberDetails.tsx
// Step 2 of the registration form.
// Loops through each member (1 to groupInfo.memberCount), collecting personal details.
// Each member's data is saved to the global store before navigating forward or backward.

import { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Grid,
  Chip,
  Alert,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import { useRegistrationStore } from '../../store/registrationStore';
import { type MemberDetail } from '../../api/registrations';
import { COUNTRIES } from '../../data/data';
import { step2Styles } from './Step2MemberDetails.styles';
import { sharedFormStyles } from './FormShared.styles';

const EVENT_DATE = new Date('2026-08-15');
function ageAtEvent(dob: string): number {
  const birth = new Date(dob);
  let age = EVENT_DATE.getFullYear() - birth.getFullYear();
  const m = EVENT_DATE.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && EVENT_DATE.getDate() < birth.getDate())) age--;
  return age;
}

// Default blank member used when a member slot hasn't been filled yet
const EMPTY_MEMBER: MemberDetail = {
  firstName: '',
  middleName: '',
  lastName: '',
  gender: 'male',
  dob: '',
  email: '',
  phone: '',
  dialCode: '',
};

// Maps each MemberDetail field to an optional validation error message
type Errors = Partial<Record<keyof MemberDetail, string>>;

// Returns a map of field-level errors; empty object means the form is valid
function validate(form: MemberDetail): Errors {
  const errors: Errors = {};
  if (!form.firstName.trim()) errors.firstName = 'First name is required.';
  if (!form.lastName.trim()) errors.lastName = 'Last name is required.';
  if (!form.dob) {
    errors.dob = 'Date of birth is required.';
  } else {
    const year = parseInt(form.dob.split('-')[0], 10);
    if (isNaN(year) || year < 1900 || year > 2026)
      errors.dob =
        'Please enter a valid year between 1900 and 2026 (4 digits).';
  }
  if (!form.email?.trim()) errors.email = 'Email is required.';
  else if (!/\S+@\S+\.\S+/.test(form.email))
    errors.email = 'Enter a valid email address.';
  if (!form.phone?.trim()) errors.phone = 'Mobile number is required.';
  else if (/[^\d\s\-()]/.test(form.phone))
    errors.phone = 'Digits, spaces, and dashes only.';
  return errors;
}

export default function Step2MemberDetails() {
  const { groupInfo, setMember, setStep } = useRegistrationStore();

  // Tracks which member (1-based) is currently being edited
  const [currentMember, setCurrentMember] = useState(1);

  // Local form state for the member currently being edited.
  const [form, setForm] = useState<MemberDetail>(() => {
    const state = useRegistrationStore.getState();
    const stored = state.members[0];
    const defaultDialCode =
      COUNTRIES.find((c) => c.code === state.groupInfo.country)?.dialCode ?? '';
    return stored
      ? {
          ...EMPTY_MEMBER,
          ...stored,
          dialCode: stored.dialCode || defaultDialCode,
        }
      : { ...EMPTY_MEMBER, dialCode: defaultDialCode };
  });
  const [errors, setErrors] = useState<Errors>({});

  // Tracks whether the user has attempted to submit; controls when to show live errors
  const [touched, setTouched] = useState(false);
  const [groupError, setGroupError] = useState('');

  // When navigating to a different member, load their stored data (or blank if not yet filled)
  useEffect(() => {
    const stored = useRegistrationStore.getState().members[currentMember - 1];
    const defaultDialCode =
      COUNTRIES.find((c) => c.code === groupInfo.country)?.dialCode ?? '';
    setForm(
      stored
        ? {
            ...EMPTY_MEMBER,
            ...stored,
            dialCode: stored.dialCode || defaultDialCode,
          }
        : { ...EMPTY_MEMBER, dialCode: defaultDialCode },
    );
    setErrors({});
    setTouched(false);
  }, [currentMember]);

  // Updates a single field in local form state; re-validates if the user has already submitted
  const updateField = (field: keyof MemberDetail, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched) setErrors(validate(updated));
  };

  // Saves current member to the store, then moves forward or backward
  const saveAndGo = (direction: 'next' | 'prev') => {
    setGroupError('');
    if (direction === 'next') {
      const errs = validate(form);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        setTouched(true);
        return;
      }
      // On the last member, ensure at least one adult (18+) in the group
      if (currentMember === groupInfo.memberCount) {
        const allMembers = [
          ...useRegistrationStore
            .getState()
            .members.slice(0, currentMember - 1),
          form,
        ];
        const hasAdult = allMembers.some(
          (m) => m.dob && ageAtEvent(m.dob) >= 18,
        );
        if (!hasAdult) {
          setGroupError(
            groupInfo.memberCount === 1
              ? 'You must be 18 or older to register individually. Please ask an adult family member to register on your behalf.'
              : 'Groups must include at least one adult (18 or over) to complete registration.',
          );
          return;
        }
      }
    }
    setMember(currentMember - 1, form);
    if (direction === 'next') {
      if (currentMember < groupInfo.memberCount) {
        setCurrentMember((p) => p + 1);
      } else {
        setStep(3);
      }
    } else {
      if (currentMember > 1) {
        setCurrentMember((p) => p - 1);
      } else {
        setStep(1);
      }
    }
  };

  // Member 1 is the primary contact; their email receives all correspondence
  const isPrimary = currentMember === 1;

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
            <TextField
              fullWidth
              label="First name *"
              value={form.firstName}
              onChange={(e) => updateField('firstName', e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Last name *"
              value={form.lastName}
              onChange={(e) => updateField('lastName', e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>
        </Grid>

        <FormControl>
          <FormLabel>Gender *</FormLabel>
          <RadioGroup
            row
            value={form.gender}
            onChange={(e) => updateField('gender', e.target.value)}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>

        <Box>
          <TextField
            fullWidth
            label="Date of birth *"
            type="date"
            value={form.dob}
            onChange={(e) => updateField('dob', e.target.value)}
            slotProps={{
              inputLabel: { shrink: true },
              htmlInput: { min: '1900-01-01', max: '2026-08-15' },
            }}
            error={!!errors.dob}
            helperText={errors.dob}
          />
          {!errors.dob &&
            form.dob &&
            new Date(form.dob) > new Date('2021-08-15') && (
              <Typography
                sx={{
                  fontSize: 14,
                  color: 'error.main',
                  fontWeight: 600,
                  mt: 0.75,
                  ml: 0.25,
                }}
              >
                Children under the age of 5 can attend the Shibir free of
                charge, however registration is mandatory.
              </Typography>
            )}
        </Box>

        <TextField
          fullWidth
          label="Email *"
          type="email"
          value={form.email ?? ''}
          onChange={(e) => updateField('email', e.target.value)}
          error={!!errors.email}
          helperText={
            errors.email ??
            (isPrimary
              ? 'All correspondence will be sent to this address.'
              : undefined)
          }
        />

        <TextField
          fullWidth
          label="Mobile number *"
          type="tel"
          value={form.phone ?? ''}
          onChange={(e) => updateField('phone', e.target.value)}
          placeholder="123 456789"
          error={!!errors.phone}
          helperText={errors.phone}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 0 }}>
                  <Select
                    value={form.dialCode ?? ''}
                    onChange={(e) => updateField('dialCode', e.target.value)}
                    variant="standard"
                    disableUnderline
                    renderValue={(value) => {
                      const country = COUNTRIES.find(
                        (c) => c.dialCode === value,
                      );
                      return (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.75,
                          }}
                        >
                          {country && (
                            <img
                              src={`https://flagcdn.com/20x15/${country.code.toLowerCase()}.png`}
                              srcSet={`https://flagcdn.com/40x30/${country.code.toLowerCase()}.png 2x`}
                              width="20"
                              height="15"
                              alt={country.label}
                              style={{ borderRadius: 2, display: 'block' }}
                            />
                          )}
                          {value}
                        </Box>
                      );
                    }}
                    sx={{
                      fontSize: '0.9rem',
                      minWidth: 96,
                      '& .MuiSelect-select': { py: 0, pr: '24px !important' },
                      '& .MuiSvgIcon-root': { right: 0 },
                    }}
                  >
                    {COUNTRIES.map((c) => (
                      <MenuItem key={c.code} value={c.dialCode}>
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <img
                            src={`https://flagcdn.com/20x15/${c.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/40x30/${c.code.toLowerCase()}.png 2x`}
                            width="20"
                            height="15"
                            alt={c.label}
                            style={{ borderRadius: 2, display: 'block' }}
                          />
                          {c.label} {c.dialCode}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                  <Box
                    component="span"
                    sx={{
                      width: '1px',
                      height: 22,
                      bgcolor: 'divider',
                      mx: 1.5,
                      flexShrink: 0,
                    }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {groupError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {groupError}
        </Alert>
      )}

      <Box sx={sharedFormStyles.navBox}>
        <Button
          variant="outlined"
          onClick={() => saveAndGo('prev')}
          sx={sharedFormStyles.backButton}
        >
          ← Back
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => saveAndGo('next')}
          sx={sharedFormStyles.nextButton}
        >
          Next →
        </Button>
      </Box>
    </Box>
  );
}
