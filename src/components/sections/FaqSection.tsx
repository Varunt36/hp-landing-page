import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { FAQS } from '../../data/data'
import { faqStyles } from './FaqSection.styles'

export default function FaqSection() {
  return (
    <Box id="faq" sx={faqStyles.outerBox}>
      <Container maxWidth="md">
        <Typography variant="h2" sx={faqStyles.h2} textAlign="center" mb={{ xs: 3, md: 5 }}>
          Frequently Asked Questions
        </Typography>

        {FAQS.map((faq, i) => (
          <Accordion
            key={i}
            sx={faqStyles.accordion}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={faqStyles.expandIcon} />}>
              <Typography sx={faqStyles.summaryText} fontWeight={600} fontSize={16}>
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
