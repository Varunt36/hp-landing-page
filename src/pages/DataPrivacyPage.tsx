import { Box, Container, Typography, Divider } from '@mui/material'
import { usePageMeta } from '../hooks/usePageMeta'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import RegisterModal from '../components/form/RegisterModal'
import { C } from '../theme/theme'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        sx={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: { xs: '1.2rem', md: '1.35rem' },
          fontWeight: 700,
          color: C.purple800,
          mb: 1.25,
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  )
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <Typography sx={{ fontSize: 15, lineHeight: 1.8, color: C.muted, mb: 0.75 }}>
      {children}
    </Typography>
  )
}

export default function DataPrivacyPage() {
  usePageMeta('Data Privacy', 'Privacy policy for HP Amrut Mahotsav 2026 — how we collect, use and protect your data.')

  return (
    <>
      <Navbar />
      <Box component="main" sx={{ pt: { xs: '64px', md: '72px' }, background: C.cream, minHeight: '100vh' }}>

        {/* Page hero */}
        <Box
          sx={{
            py: { xs: '64px', md: '80px' },
            textAlign: 'center',
            background: `radial-gradient(600px 300px at 50% 0%, ${C.lavender100}B3, transparent 70%), ${C.cream}`,
          }}
        >
          <Container maxWidth="md">
            <Typography component="span" sx={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.green700, fontWeight: 600 }}>
              Legal Notice
            </Typography>
            <Typography
              variant="h1"
              sx={{ mt: 0.75, fontSize: { xs: '2.25rem', md: 'clamp(2rem, 4vw, 3rem)' }, color: C.purple800, fontFamily: '"Blue Mirage", serif' }}
            >
              Data Privacy
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.25, mt: 1.75, color: C.gold600, fontSize: 14 }}>
              <Box sx={{ height: '1px', width: 40, background: `linear-gradient(to right, transparent, ${C.gold500}, transparent)` }} />
              ✦
              <Box sx={{ height: '1px', width: 40, background: `linear-gradient(to left, transparent, ${C.gold500}, transparent)` }} />
            </Box>
          </Container>
        </Box>

        {/* Content */}
        <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
          <Box
            sx={{
              background: 'white',
              border: `1px solid ${C.lavender200}B3`,
              borderRadius: '18px',
              p: { xs: 3.5, md: 5 },
            }}
          >

            <Section title="Responsible Body">
              <Para>The responsible body within the meaning of data protection laws, in particular the EU General Data Protection Regulation (GDPR), is:</Para>
              <Para>Manfred Gutheins</Para>
              <Para>Im Tal 16, 14532 Kleinmachnow</Para>
            </Section>

            <Divider sx={{ borderColor: `${C.lavender200}99`, mb: 4 }} />

            <Section title="Your Data Subject Rights">
              <Para>You can exercise the following rights at any time using the contact details provided by our data protection officer:</Para>
              <Box component="ul" sx={{ pl: 2.5, mt: 0.5, mb: 0.75 }}>
                {[
                  'Information about your data stored by us and its processing (Art. 15 GDPR)',
                  'Correction of incorrect personal data (Art. 16 GDPR)',
                  'Deletion of your data stored by us (Art. 17 GDPR)',
                  'Restriction of data processing if we are not yet allowed to delete your data due to legal obligations (Art. 18 GDPR)',
                  'Objection to the processing of your data by us (Art. 21 GDPR)',
                  'Data portability, provided that you have consented to data processing or have concluded a contract with us (Art. 20 GDPR)',
                ].map((item) => (
                  <Box component="li" key={item} sx={{ fontSize: 15, lineHeight: 1.8, color: C.muted, mb: 0.5 }}>
                    {item}
                  </Box>
                ))}
              </Box>
              <Para>If you have given us your consent, you can revoke it at any time with effect for the future.</Para>
              <Para>You can lodge a complaint with a supervisory authority at any time, for example the competent supervisory authority in the federal state in which you reside or the authority responsible for us as the responsible body.</Para>
            </Section>

            <Divider sx={{ borderColor: `${C.lavender200}99`, mb: 4 }} />

            <Section title="Collection of General Information When Visiting Our Website">
              <Para>When you access our website, general information is automatically collected (server log files). This includes the type of web browser, operating system, domain name of your internet service provider, your IP address, and similar information. This data does not allow any conclusions to be drawn about you personally.</Para>
              <Para>It is processed to ensure a smooth connection and use of the website, evaluate system security and stability, and for further administrative purposes.</Para>
              <Para>Legal basis: Art. 6 (1) (f) GDPR — our legitimate interest in improving the stability and functionality of our website.</Para>
              <Para>Storage period: The data will be deleted as soon as it is no longer required for the purpose for which it was collected.</Para>
            </Section>

            <Divider sx={{ borderColor: `${C.lavender200}99`, mb: 4 }} />

            <Section title="Newsletter">
              <Para>Your data will be used exclusively to send you the newsletter you have subscribed to via email. For effective registration, we use the "double opt-in" process. No further data is collected and the data is not shared with third parties.</Para>
              <Para>Legal basis: Art. 6 (1) (a) GDPR — your express consent. You can revoke your consent at any time with future effect.</Para>
            </Section>

            <Divider sx={{ borderColor: `${C.lavender200}99`, mb: 4 }} />

            <Section title="Use of Script Libraries (Google Webfonts)">
              <Para>In order to display our content correctly across all browsers, we use "Google Web Fonts" from Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA) to display fonts on this website.</Para>
              <Para>Legal basis: Art. 6 (1) (a) GDPR — your consent. Google processes your data in the USA and has submitted to the EU-US Privacy Shield. Further information can be found in{' '}
                <Box component="a" href="https://www.google.com/policies/privacy/" target="_blank" rel="noopener noreferrer" sx={{ color: C.green700, '&:hover': { color: C.gold600 }, transition: 'color .2s' }}>
                  Google's privacy policy
                </Box>.
              </Para>
            </Section>

            <Divider sx={{ borderColor: `${C.lavender200}99`, mb: 4 }} />

            <Section title="SSL Encryption">
              <Para>To protect the security of your data during transmission, we use state-of-the-art encryption methods (e.g. SSL) over HTTPS.</Para>
            </Section>

            <Divider sx={{ borderColor: `${C.lavender200}99`, mb: 4 }} />

            <Section title="Changes to Our Privacy Policy">
              <Para>We reserve the right to amend this privacy policy to ensure it always complies with current legal requirements or to implement changes to our services. The new privacy policy will then apply to your next visit.</Para>
            </Section>

            <Divider sx={{ borderColor: `${C.lavender200}99`, mb: 4 }} />

            <Section title="Questions for the Data Protection Officer">
              <Para>If you have any questions about data protection, please contact us:</Para>
              <Para>Yogi Divine Society Germany GbR</Para>
              <Para>Im Tal 16, 14532 Kleinmachnow</Para>
              <Para>
                Email:{' '}
                <Box component="a" href="mailto:info@yds-germany.de" sx={{ color: C.green700, '&:hover': { color: C.gold600 }, transition: 'color .2s' }}>
                  info@yds-germany.de
                </Box>
              </Para>
            </Section>

            <Box sx={{ mt: 2, pt: 3, borderTop: `1px dashed ${C.lavender200}B3` }}>
              <Typography sx={{ fontSize: 12, color: `${C.muted}99`, letterSpacing: '0.03em' }}>
                Source:{' '}
                <Box component="a" href="https://yds-germany.de/privacy-policy/" target="_blank" rel="noopener noreferrer" sx={{ color: 'inherit', '&:hover': { color: C.gold600 } }}>
                  yds-germany.de/privacy-policy
                </Box>
              </Typography>
            </Box>

          </Box>
        </Container>

      </Box>
      <Footer />
      <RegisterModal />
    </>
  )
}
