import { Box, Container, Typography, Card, CardContent, Grid } from '@mui/material'
import { ABOUT } from '../../data/data'
import { aboutStyles } from './AboutSection.styles'

export default function AboutSection() {
  return (
    <Box id="about" sx={aboutStyles.outerBox}>
      <Container maxWidth="md">
        <Typography variant="h2" color="primary" textAlign="center" mb={3}>
          About the Event
        </Typography>

        <Typography
          color="text.secondary"
          textAlign="center"
          fontSize={16}
          lineHeight={1.8}
          maxWidth={680}
          mx="auto"
          mb={{ xs: 4, md: 6 }}
          sx={aboutStyles.description}
        >
          {ABOUT.description}
        </Typography>

        <Grid container spacing={3}>
          {ABOUT.cards.map((card) => (
            <Grid key={card.label} size={{ xs: 12, sm: 4 }}>
              <Card
                elevation={0}
                sx={aboutStyles.card}
              >
                <CardContent>
                  <Typography fontSize={28} mb={1}>{card.icon}</Typography>
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    letterSpacing={1}
                    display="block"
                    mb={0.5}
                  >
                    {card.label}
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight={600}>
                    {card.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
