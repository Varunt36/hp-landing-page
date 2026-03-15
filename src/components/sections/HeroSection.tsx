import { Box, Typography, Button, Container } from '@mui/material'
import { EVENT } from '../../data/data'
import { heroStyles } from './HeroSection.styles'

export default function HeroSection() {
  const scrollToRegister = () =>
    document.querySelector('#register')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <Box id="hero" sx={heroStyles.outerBox}>
      <Container maxWidth="lg" sx={heroStyles.container}>
        <Typography variant="overline" sx={heroStyles.subtitle}>
          {EVENT.subtitle}
        </Typography>

        <Box
          component="img"
          src="/images/Title.png"
          alt={EVENT.title}
          sx={heroStyles.titleImage}
        />

        <Typography variant="h6" sx={heroStyles.dates}>
          {EVENT.dates} &nbsp;·&nbsp; {EVENT.location}
        </Typography>

        <Button
          variant="outlined"
          size="large"
          onClick={scrollToRegister}
          sx={heroStyles.ctaButton}
        >
          {EVENT.ctaLabel}
        </Button>
      </Container>
    </Box>
  );
}