import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { heroStyles as s } from './HeroSection.styles';
import { useRegistrationStore } from '../../store/registrationStore';

const EVENT_DATE = new Date('2026-08-15T00:00:00+02:00'); // Berlin CEST

function useCountdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, sec: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = EVENT_DATE.getTime() - Date.now();
      if (diff <= 0) {
        setT({ d: 0, h: 0, m: 0, sec: 0 });
        return;
      }
      setT({
        d: Math.floor(diff / 86_400_000),
        h: Math.floor((diff % 86_400_000) / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        sec: Math.floor((diff % 60_000) / 1_000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function HeroSection() {
  const navigate = useNavigate();
  const openModal = useRegistrationStore((s) => s.openModal);
  const { d, h, m, sec } = useCountdown();

  const cd = [
    { num: String(d).padStart(3, '0'), label: 'Days' },
    { num: String(h).padStart(2, '0'), label: 'Hours' },
    { num: String(m).padStart(2, '0'), label: 'Mins' },
    { num: String(sec).padStart(2, '0'), label: 'Secs' },
  ];

  return (
    <Box id="hero" sx={s.outerBox}>
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={s.grid}>
          {/* ── Col 0: Swamiji portrait (lg+) ── */}
          <Box sx={s.swamijiCol}>
            <Box
              component="img"
              src="/images/Swamiji.png"
              alt="Pujya Swamiji"
              sx={s.swamijiImg}
            />
          </Box>

          {/* ── Col 1: Title · Sutra · CTA · Countdown ── */}
          <Box sx={s.centerCol}>
            <Box
              component="img"
              src="/images/HariPrabodham%20Amrut%20%20%20Mahotsav%20%20Germany%202026.png"
              alt="Hari Prabodham Amrut Mahotsav — Germany 2026"
              sx={s.titleImg}
            />
            <Box
              component="img"
              src="/images/Sutra_Title%202026.png"
              alt="Nā me raho, nā merī ārzū rahe"
              sx={s.sutraImg}
            />

            <Box sx={s.metaRow}>
              15&nbsp;·&nbsp;16&nbsp;·&nbsp;17 August 2026
            </Box>

            <Stack direction="row" spacing={1.5} sx={s.ctaRow}>
              <Button variant="contained" size="large" onClick={openModal} sx={{ fontFamily: '"Blue Mirage", serif', fontSize: 17 }}>
                Register Now
                <Box
                  component="svg"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  sx={{ width: 14, height: 14, ml: 0.5 }}
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </Box>
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/venue')}
                sx={{ fontFamily: '"Blue Mirage", serif', fontSize: 17 }}
              >
                Learn More
              </Button>
            </Stack>

            <Box sx={s.countdown}>
              {cd.map(({ num, label }) => (
                <Box key={label} sx={s.cdCell}>
                  <Typography sx={s.cdNum}>{num}</Typography>
                  <Typography sx={s.cdLabel}>{label}</Typography>
                </Box>
              ))}
            </Box>

            {/* Portrait — mobile only, shown below countdown */}
            <Box sx={s.portraitMobileWrap}>
              <Box
                component="img"
                src="/images/DSC01446.png"
                alt="Pujya Swamiji"
                sx={s.portraitMobileImg}
              />
            </Box>
          </Box>

          {/* ── Col 2: Right portrait (md+) ── */}
          <Box sx={s.rightImgCol}>
            <Box
              component="img"
              src="/images/DSC01446.png"
              alt="Pujya Swamiji"
              fetchPriority="high"
              sx={s.rightImg}
            />
          </Box>
        </Box>
      </Container>

      {/* Wave decoration */}
      <Box
        component="svg"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        aria-hidden="true"
        sx={{ ...s.waveBottom, width: '100%', height: 110, display: 'block' }}
      >
        {/* Back wave — softer purple */}
        <path
          d="M0,80 C360,20 720,130 1080,60 C1260,25 1380,90 1440,60 L1440,160 L0,160 Z"
          fill="#B89DD2"
          fillOpacity="0.35"
        />
        {/* Front wave — deeper purple */}
        <path
          d="M0,110 C240,60 480,140 720,100 C960,55 1200,130 1440,90 L1440,160 L0,160 Z"
          fill="#7c669b"
          fillOpacity="0.25"
        />
      </Box>
    </Box>
  );
}
