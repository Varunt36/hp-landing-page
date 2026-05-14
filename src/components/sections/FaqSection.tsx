import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { FAQS } from '../../data/data'
import { faqStyles } from './FaqSection.styles'
import { C } from '../../theme/theme'

function DividerOrn() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.25, mt: 1.75, color: C.gold600, fontSize: 14 }}>
      <Box sx={{ height: '1px', width: 40, background: `linear-gradient(to right, transparent, ${C.gold500}, transparent)` }} />
      ✦
      <Box sx={{ height: '1px', width: 40, background: `linear-gradient(to left, transparent, ${C.gold500}, transparent)` }} />
    </Box>
  )
}

export default function FaqSection() {
  return (
    <Box id="faq" sx={faqStyles.outerBox}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
          <Typography component="span" sx={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.green700, fontWeight: 600 }}>
            Common Questions
          </Typography>
          <Typography variant="h2" sx={{ mt: 1, ...faqStyles.h2 }}>
            Frequently Asked Questions
          </Typography>
          <DividerOrn />
        </Box>

        {FAQS.map((faq) => (
          <Accordion key={faq.q} sx={faqStyles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={faqStyles.expandIcon} />}>
              <Typography sx={faqStyles.summaryText} fontSize={16}>
                {faq.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={faqStyles.detailsText} fontSize={15} lineHeight={1.7}>
                {faq.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  )
}
