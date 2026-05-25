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

export default function ImpressumPage() {
  usePageMeta('Impressum', 'Legal notice for HariPrabodham Germany — Impressum as required by German law.')
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
              Impressum
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

            <Section title="Information according to § 5 TMG">
              <Para>Yogi Divine Society e.V.</Para>
              <Para>Im Tal 16</Para>
              <Para>14532 Kleinmachnow</Para>
            </Section>

            <Divider sx={{ borderColor: `${C.lavender200}99`, mb: 4 }} />

            <Section title="Represented by">
              <Para>Manfred Gutheins</Para>
              <Para>Suyogi Gessner</Para>
              <Para>Marion Zehe</Para>
            </Section>

            <Divider sx={{ borderColor: `${C.lavender200}99`, mb: 4 }} />

            <Section title="Contact">
              <Para>Phone: 033203 78408</Para>
              <Para>
                Email:{' '}
                <Box
                  component="a"
                  href="mailto:info@yds-germany.de"
                  sx={{ color: C.green700, '&:hover': { color: C.gold600 }, transition: 'color .2s' }}
                >
                  info@yds-germany.de
                </Box>
              </Para>
            </Section>

            <Divider sx={{ borderColor: `${C.lavender200}99`, mb: 4 }} />

            <Section title="Responsible for the content according to § 18 (2) MStV">
              <Para>Manfred Gutheins</Para>
              <Para>Im Tal 16, 14532 Kleinmachnow</Para>
            </Section>

            <Divider sx={{ borderColor: `${C.lavender200}99`, mb: 4 }} />

            <Section title="EU Dispute Resolution">
              <Para>
                The European Commission provides a platform for online dispute resolution (ODR):{' '}
                <Box
                  component="a"
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: C.green700, '&:hover': { color: C.gold600 }, transition: 'color .2s' }}
                >
                  https://ec.europa.eu/consumers/odr/
                </Box>
              </Para>
              <Para>You can find our e-mail address at the top of the imprint.</Para>
            </Section>

            <Divider sx={{ borderColor: `${C.lavender200}99`, mb: 4 }} />

            <Section title="Consumer Dispute Resolution / Universal Arbitration Board">
              <Para>
                We are not willing or obliged to participate in dispute resolution proceedings before a consumer
                arbitration board.
              </Para>
            </Section>

            <Divider sx={{ borderColor: `${C.lavender200}99`, mb: 4 }} />

            <Section title="Liability for Content">
              <Para>
                As a service provider, we are responsible for our own content on these pages in accordance with general
                laws pursuant to § 7 (1) TMG. According to §§ 8 to 10 TMG, however, we are not obligated as a service
                provider to monitor transmitted or stored third-party information or to investigate circumstances that
                indicate illegal activity.
              </Para>
              <Para>
                Obligations to remove or block the use of information under general law remain unaffected. However,
                liability in this regard is only possible from the time of knowledge of a specific legal violation. Upon
                becoming aware of corresponding legal violations, we will remove this content immediately.
              </Para>
            </Section>

            <Divider sx={{ borderColor: `${C.lavender200}99`, mb: 4 }} />

            <Section title="Liability for Links">
              <Para>
                Our website contains links to external third-party websites over whose content we have no influence.
                Therefore, we cannot accept any liability for this external content. The respective provider or operator
                of the pages is always responsible for the content of the linked pages. The linked pages were checked for
                possible legal violations at the time of linking. Illegal content was not recognisable at the time of
                linking.
              </Para>
              <Para>
                However, permanent monitoring of the content of the linked pages is not reasonable without concrete
                evidence of a violation of the law. Upon becoming aware of legal violations, we will remove such links
                immediately.
              </Para>
            </Section>

            <Divider sx={{ borderColor: `${C.lavender200}99`, mb: 4 }} />

            <Section title="Copyright">
              <Para>
                The content and works on these pages created by the site operators are subject to German copyright law.
                The duplication, processing, distribution and any kind of exploitation outside the limits of copyright
                law require the written consent of the respective author or creator. Downloads and copies of this site
                are only permitted for private, non-commercial use.
              </Para>
              <Para>
                Insofar as the content on this site was not created by the operator, the copyrights of third parties are
                respected. In particular, third-party content is marked as such. Should you nevertheless become aware of
                a copyright infringement, please inform us accordingly. Upon becoming aware of legal violations, we will
                remove such content immediately.
              </Para>
            </Section>

            <Box sx={{ mt: 2, pt: 3, borderTop: `1px dashed ${C.lavender200}B3` }}>
              <Typography sx={{ fontSize: 12, color: `${C.muted}99`, letterSpacing: '0.03em' }}>
                Source:{' '}
                <Box
                  component="a"
                  href="https://www.e-recht24.de/impressum-generator.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'inherit', '&:hover': { color: C.gold600 } }}
                >
                  e-recht24.de
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
