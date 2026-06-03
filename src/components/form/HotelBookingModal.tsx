import {
  Dialog, DialogContent,
  IconButton, Typography, Box,
  useMediaQuery, useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { C } from '../../theme/theme';

const BOOKING_VIDEO_URL =
  'https://klfmhhsamhraxohdynyz.supabase.co/storage/v1/object/public/hotel-room-booking-video/hotel-room-booking-guide.mp4';

const BOOKING_EMAIL_HREF =
  'mailto:Cordula.Litz@hotel-berlin.de' +
  '?subject=Hotel%20Booking%20%E2%80%94%20HP%20Amrut%20Mahotsav%202026' +
  '&body=Dear%20Cordula%2C%0A%0AI%20would%20like%20to%20book%20a%20room%20for%20the%20HP%20Amrut%20Mahotsav%202026.' +
  '%20We%20are%20part%20of%20the%20indische%20Gemeinde.%0A%0AName%3A%20%0ANo.%20of%20guests%3A%20%0ARoom%20type%20(Single%20%2F%20Double)%3A%20%0A%0AKind%20regards';

interface Props { open: boolean; onClose: () => void }

/* ─── tiny helpers ─────────────────────────────────────────── */


function CheckIcon() {
  return (
    <Box sx={{ width: 18, height: 18, borderRadius: '50%', background: C.green600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </Box>
  );
}

/* ─── Contact card ─────────────────────────────────────────── */

function ContactCard() {
  return (
    <Box sx={{ borderRadius: '12px', overflow: 'hidden', border: `1px solid ${C.lavender200}` }}>
      {/* name row */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.5, background: C.cream }}>
        <Box sx={{
          width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
          background: `linear-gradient(135deg, ${C.purple600}, ${C.purple800})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 2px 8px rgba(75,45,110,0.3)`,
        }}>
          <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 13, fontFamily: '"Blue Mirage", serif' }}>CL</Typography>
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: C.purple800 }}>Cordula Litz</Typography>
          <Typography component="a" href="mailto:Cordula.Litz@hotel-berlin.de"
            sx={{ fontSize: 12, color: C.purple600, textDecoration: 'none', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', '&:hover': { textDecoration: 'underline' } }}>
            Cordula.Litz@hotel-berlin.de
          </Typography>
        </Box>
      </Box>
      {/* CTA row */}
      <Box
        component="a"
        href={BOOKING_EMAIL_HREF}
        sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
          px: 2, py: 1.1,
          background: `linear-gradient(90deg, ${C.purple700}, ${C.purple800})`,
          color: 'white', fontSize: 13, fontWeight: 600,
          textDecoration: 'none',
          transition: 'opacity .2s',
          '&:hover': { opacity: 0.88 },
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        Send Booking Email
      </Box>
    </Box>
  );
}

/* ─── Main modal ───────────────────────────────────────────── */

export default function HotelBookingModal({ open, onClose }: Props) {
  const theme  = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            borderRadius: isMobile ? 0 : '20px',
            bgcolor: C.cream,
            border: `1px solid ${C.lavender200}`,
            boxShadow: '0 20px 60px rgba(48,24,80,0.22)',
            overflow: 'clip',
          },
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>

        {/* ══════════════ FULL-WIDTH HEADER ══════════════ */}
        <Box sx={{
          position: 'relative',
          background: `linear-gradient(135deg, ${C.purple900} 0%, ${C.purple800} 60%, ${C.purple700} 100%)`,
          px: { xs: 3, md: 5 },
          pt: { xs: 3, md: 3.5 },
          pb: { xs: 1.5, md: 1.75 },
          textAlign: 'center',
        }}>
          {/* gold top line */}
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${C.gold300}, ${C.gold500}, ${C.gold300}, transparent)` }} />

          <IconButton onClick={onClose} size="small" aria-label="Close"
            sx={{ position: 'absolute', top: 10, right: 10, color: 'rgba(255,255,255,0.6)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', color: 'white' } }}>
            <CloseIcon fontSize="small" />
          </IconButton>

          {/* overline */}
          <Typography sx={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold300, mb: 0.75 }}>
            Hotel Booking Guide
          </Typography>

          <Typography sx={{ fontFamily: '"Blue Mirage", serif', fontSize: { xs: '1.5rem', md: '2rem' }, color: 'white', fontWeight: 700, lineHeight: 1.15 }}>
            Hotel Berlin, Berlin
          </Typography>
          <Typography sx={{ mt: 0.5, fontSize: { xs: 11.5, md: 13 }, color: 'rgba(255,255,255,0.6)' }}>
            Lützowplatz 17, 10785 Berlin · Mahotsav venue
          </Typography>

          {/* ornament */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.25, mt: 1.5, color: C.gold300, fontSize: 12 }}>
            <Box sx={{ height: '1px', width: 40, background: `linear-gradient(to right, transparent, ${C.gold300})` }} />
            ✦
            <Box sx={{ height: '1px', width: 40, background: `linear-gradient(to left, transparent, ${C.gold300})` }} />
          </Box>
        </Box>

        {/* ══════════════ DIVINE GRACE BANNER ══════════════ */}
        <Box
          sx={{
            px: { xs: 2.5, md: 4 },
            py: { xs: 0.75, md: 0.9 },
            background: `linear-gradient(90deg, ${C.purple900} 0%, ${C.purple800} 50%, ${C.purple900} 100%)`,
            borderBottom: `1px solid ${C.gold500}35`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
          }}
        >
          <Typography sx={{ color: C.gold300, fontSize: { xs: 11, md: 13 }, flexShrink: 0 }}>✦</Typography>
          <Typography
            sx={{
              fontFamily: '"Blue Mirage", serif',
              fontSize: { xs: '1rem', md: '1.15rem' },
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1,
              textAlign: 'center',
            }}
          >
            Got only by{' '}
            <Box component="span" sx={{ color: C.gold300, fontWeight: 700, fontStyle: 'normal' }}>divine grace</Box>
            {' '} — a very special offer in Berlin downtown for our devotees
          </Typography>
          <Typography sx={{ color: C.gold300, fontSize: { xs: 11, md: 13 }, flexShrink: 0 }}>✦</Typography>
        </Box>

        {/* ══════════════ TWO-COLUMN BODY ══════════════ */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, alignItems: 'start' }}>

          {/* ════ LEFT — Pricing ════ */}
          <Box sx={{ p: { xs: 2.5, md: 3 } }}>

            {/* Special offer */}
            <Box sx={{
              mb: 2.5,
              borderRadius: '14px',
              overflow: 'hidden',
              border: `1px solid ${C.gold500}50`,
              boxShadow: `0 2px 12px ${C.gold500}18`,
            }}>
              <Box sx={{ px: 2, py: 1, background: `linear-gradient(90deg, ${C.gold500}22, ${C.gold500}0a)`, borderBottom: `1px solid ${C.gold500}35`, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontFamily: '"Blue Mirage", serif', fontSize: { xs: 15, md: 16 }, fontWeight: 800, color: C.purple800, letterSpacing: '0.01em' }}>
                  🏷️ Special Group Rate
                </Typography>
              </Box>
              <Box sx={{ px: 2, py: 1.5, background: `linear-gradient(135deg, ${C.cream} 0%, ${C.lavender50} 100%)` }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography sx={{ fontFamily: '"Blue Mirage", serif', fontSize: { xs: 15, md: 16 }, fontWeight: 800, color: C.purple800, letterSpacing: '0.01em' }}>
                    Only Valid 15th – 20th Aug 2026 , 
                  </Typography>
                  <Typography sx={{ fontSize: { xs: 12, md: 12.5 }, color: C.purple600, lineHeight: 1.55 }}>
                    Outside these dates, the normal hotel rate applies.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.75 }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: C.purple700, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: 12, color: C.purple600 }}>
                    Booking deadline:{' '}
                    <Box component="span" sx={{ fontWeight: 700, color: C.purple700 }}>30 June 2026</Box>
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Pricing cards */}
            <Typography sx={{ fontFamily: '"Blue Mirage", serif', fontSize: { xs: 15, md: 16 }, fontWeight: 800, color: C.purple800, mb: 1, letterSpacing: '0.01em' }}>
              🏨 Stay & Pricing
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.25, mb: 1.25 }}>
              {[
                { type: 'Single', guests: '1 room · 1 adult', price: '€85', inline: 'per night', sub: '' },
                { type: 'Double', guests: '1 room · 2 adults', price: '€108', inline: 'per night', sub: '€54 per person' },
              ].map(({ type, guests, price, inline, sub }) => (
                <Box key={type} sx={{
                  borderRadius: '14px',
                  border: `1px solid ${C.lavender200}`,
                  overflow: 'hidden',
                  background: C.cream,
                  boxShadow: '0 2px 8px rgba(75,45,110,0.06)',
                  transition: 'box-shadow .2s',
                  '&:hover': { boxShadow: '0 4px 16px rgba(75,45,110,0.12)' },
                }}>
                  {/* gold accent top */}
                  <Box sx={{ height: '3px', background: `linear-gradient(90deg, ${C.gold500}, ${C.gold300})` }} />
                  <Box sx={{ px: 1.75, pt: 1.5, pb: 1.25, background: C.lavender50, borderBottom: `1px solid ${C.lavender200}` }}>
                    <Typography sx={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.gold700, mb: 0.35 }}>
                      {type} Occupancy
                    </Typography>
                  </Box>
                  <Box sx={{ px: 1.75, py: 1.25 }}>
                    <Typography sx={{ fontSize: 11, color: C.muted, mb: 0.6 }}>{guests}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75, flexWrap: 'wrap' }}>
                      <Typography sx={{ fontFamily: '"Blue Mirage", serif', fontSize: { xs: '1.8rem', md: '2rem' }, fontWeight: 700, color: C.purple800, lineHeight: 1 }}>
                        {price}
                      </Typography>
                      <Typography sx={{ fontSize: { xs: 13.5, md: 14 }, color: C.purple800, fontWeight: 600 }}>{inline}</Typography>
                    </Box>
                    {sub && <Typography sx={{ fontSize: { xs: 11.5, md: 12 }, color: C.muted, mt: 0.3, fontWeight: 500 }}>{sub}</Typography>}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Breakfast */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.9, mb: 1.1, borderRadius: '8px', background: `${C.green600}0f`, border: `1px solid ${C.green600}25` }}>
              <CheckIcon />
              <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: C.green700 }}>
                Breakfast included for all guests
              </Typography>
            </Box>

            {/* How to Book + Children combined */}
            <Box sx={{
              borderRadius: '14px', overflow: 'hidden',
              border: `1px solid ${C.lavender300}`,
              boxShadow: '0 2px 12px rgba(75,45,110,0.08)',
            }}>
              <Box sx={{ px: 2, py: 1.25, background: `linear-gradient(90deg, ${C.purple800}, ${C.purple700})` }}>
                <Typography sx={{ fontFamily: '"Blue Mirage", serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.gold300 }}>
                  Please contact below person via email
                </Typography>
              </Box>
              <Box sx={{ px: 2, py: 1.75, background: C.cream, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ fontSize: 12.5, color: C.purple600, lineHeight: 1.7 }}>
                  Please mention that we are part of this event:{' '}
                  <Box component="span" sx={{ fontWeight: 700, color: C.purple700 }}>indische Gemeinde</Box>
                </Typography>
                <ContactCard />
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', pt: 1, borderTop: `1px dashed ${C.lavender200}` }}>
                  <Typography sx={{ fontSize: 12.5, color: C.purple600, lineHeight: 1.6, fontWeight: 700 }}>
                    👶 Children: ~€50/night charge may apply. Please confirm when booking.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* ════ RIGHT — Details & Booking ════ */}
          <Box sx={{
            p: { xs: 2.5, md: 3 },
            background: `linear-gradient(180deg, ${C.lavender50} 0%, ${C.cream2} 100%)`,
            borderLeft: { md: `1px solid ${C.lavender200}` },
            borderTop: { xs: `1px solid ${C.lavender200}`, md: 'none' },
            display: 'flex', flexDirection: 'column', gap: 0,
          }}>

            {/* Check-in / Check-out */}
            <Typography sx={{ fontFamily: '"Blue Mirage", serif', fontSize: { xs: 15, md: 16 }, fontWeight: 800, color: C.purple800, mb: 1, letterSpacing: '0.01em' }}>
              🗓️ Check-in · Check-out timing
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.25, mb: 0.9 }}>
              {[
                { label: 'Check-in', time: '15:00', icon: '🏨' },
                { label: 'Check-out', time: '12:00', icon: '🚪' },
              ].map(({ label, time, icon }) => (
                <Box key={label} sx={{
                  textAlign: 'center', p: 1.5,
                  borderRadius: '12px',
                  border: `1px solid ${C.lavender200}`,
                  background: C.cream,
                  boxShadow: '0 1px 4px rgba(75,45,110,0.06)',
                }}>
                  <Typography sx={{ fontSize: 14, mb: 0.4 }}>{icon}</Typography>
                  <Typography sx={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.gold700, mb: 0.4 }}>
                    {label}
                  </Typography>
                  <Typography sx={{ fontSize: 12.5, color: C.purple600, fontWeight: 600, mt: 0.25 }}>{time}</Typography>
                </Box>
              ))}
            </Box>

            {/* Early arrival */}
            <Box sx={{
              mb: 2.5, borderRadius: '12px', overflow: 'hidden',
              border: `1.5px solid ${C.gold500}55`,
              boxShadow: `0 2px 12px ${C.gold500}15`,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, background: `linear-gradient(90deg, ${C.gold500}25, ${C.gold500}08)`, borderBottom: `1px solid ${C.gold500}30` }}>
                <Typography sx={{ fontSize: 15 }}>🧳</Typography>
                <Typography sx={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.gold700 }}>
                  Arriving Early on 15 Aug?
                </Typography>
              </Box>
              <Box sx={{ px: 2, py: 1.5, background: `linear-gradient(135deg, ${C.gold500}08, ${C.lavender50})` }}>
                <Typography sx={{ fontSize: 13.5, color: C.purple800, fontWeight: 700, lineHeight: 1.5, mb: 0.5 }}>
                  Suitcase storage & locker room available.
                </Typography>
                <Typography sx={{ fontSize: 12, color: C.purple600, lineHeight: 1.65 }}>
                  Store your luggage before check-in. Contact the hotel counter on arrival to arrange this.
                </Typography>
              </Box>
            </Box>

            {/* Cancellation */}
            <Typography sx={{ fontFamily: '"Blue Mirage", serif', fontSize: { xs: 15, md: 16 }, fontWeight: 800, color: C.purple800, mb: 1, letterSpacing: '0.01em' }}>
              🛡️ Cancellation Policy
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'center', p: 1.5, mb: 2.5, borderRadius: '10px', border: `1px solid ${C.lavender200}`, background: C.cream }}>
              <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: `${C.purple700}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.purple700} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 13, color: C.purple800, fontWeight: 700 }}>Free cancellation</Typography>
                <Typography sx={{ fontSize: 11.5, color: C.purple600 }}>Until 18:00 · 1 August 2026</Typography>
              </Box>
            </Box>

            {/* Video */}
            {BOOKING_VIDEO_URL && (
              <>
                <Typography sx={{ fontFamily: '"Blue Mirage", serif', fontSize: { xs: 15, md: 16 }, fontWeight: 800, color: C.purple800, mb: 1, letterSpacing: '0.01em' }}>
                  🎬 Booking Guide Video
                </Typography>
                <Box sx={{ borderRadius: '14px', overflow: 'hidden', border: `1px solid ${C.lavender200}`, boxShadow: '0 2px 10px rgba(48,24,80,0.1)' }}>
                  <Box component="video" src={BOOKING_VIDEO_URL} controls playsInline preload="metadata"
                    sx={{ width: '100%', display: 'block', maxHeight: 195, background: C.purple900 }} />
                  <Box sx={{ px: 1.75, py: 0.9, background: C.lavender50, display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.purple700} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill={C.purple700} stroke="none" />
                    </svg>
                    <Typography sx={{ fontSize: 11.5, color: C.purple600 }}>Step-by-step hotel booking guide</Typography>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
