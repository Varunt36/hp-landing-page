import { Box, Container, Typography, Grid, Paper, List, ListItem, ListItemText } from '@mui/material'
import { VENUE } from '../../data/data'
import { venueStyles } from './VenueSection.styles'

export default function VenueSection() {
  return (
    <Box id="venue" sx={venueStyles.outerBox}>
      <Container maxWidth="md">
        <Typography variant="h2" color="primary" textAlign="center" mb={{ xs: 3, md: 5 }}>
          Venue &amp; How to Reach
        </Typography>

        <Grid container spacing={5} alignItems="flex-start">
          {/* Left: address + travel tips */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={0} sx={venueStyles.venuePaper}>
              <Typography variant="h6" color="primary" fontWeight={700} mb={1.5}>
                Event Venue
              </Typography>
              <Typography color="text.secondary" lineHeight={1.8}>
                📍 {VENUE.name}<br />
                {VENUE.address}
              </Typography>
            </Paper>

            <Paper elevation={0} sx={venueStyles.travelPaper}>
              <Typography variant="h6" color="primary" fontWeight={700} mb={1.5}>
                Getting There
              </Typography>
              <List disablePadding>
                {VENUE.travel.map((t) => (
                  <ListItem key={t.label} disableGutters alignItems="flex-start" sx={venueStyles.listItem}>
                    <Typography fontSize={18} flexShrink={0}>{t.icon}</Typography>
                    <ListItemText
                      primary={<><strong>{t.label}:</strong> {t.detail}</>}
                      primaryTypographyProps={{ color: 'text.secondary', fontSize: 15 }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Right: map */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="iframe"
              src={VENUE.mapSrc}
              width="100%"
              height={320}
              sx={venueStyles.mapIframe}
              loading="lazy"
              title="Venue Map"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
