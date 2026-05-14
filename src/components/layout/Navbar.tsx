import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NAV_LINKS } from '../../data/data';
import { navbarStyles as s } from './Navbar.styles';
import { useRegistrationStore } from '../../store/registrationStore';
import { C } from '../../theme/theme';

function BrandLogo() {
  return (
    <Box
      component="img"
      src="/images/Final%20Logo.png"
      alt="Hari Prabodham Logo"
      sx={{ width: 44, height: 44, objectFit: 'contain', flexShrink: 0 }}
    />
  );
}

export default function Navbar() {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const openModal = useRegistrationStore((s) => s.openModal);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname === href;

  const goTo = (href: string) => {
    navigate(href);
    setDrawerOpen(false);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      className={scrolled ? 'scrolled' : ''}
      sx={s.appBar}
    >
      <Toolbar sx={s.toolbar} disableGutters>
        {/* ── Brand ── */}
        <Box sx={s.brandBox} onClick={() => navigate('/')}>
          <BrandLogo />
          <Typography sx={s.brandText}>
            Hari Prabodham
            <Typography component="small" sx={s.brandSub}>
              Amrut Mahotsav
            </Typography>
          </Typography>
        </Box>

        {isMobile ? (
          /* ── Mobile ── */
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={() => setDrawerOpen(true)} sx={s.iconColor}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              slotProps={{ paper: { sx: s.drawerBox } }}
            >
              <Box sx={{ p: 2 }}>
                <List>
                  {NAV_LINKS.map((link) => (
                    <ListItem key={link.href} disablePadding>
                      <ListItemButton
                        onClick={() => goTo(link.href)}
                        sx={[
                          s.drawerLink,
                          isActive(link.href) && { background: C.lavender50 },
                        ] as SxProps<Theme>}
                      >
                        <ListItemText primary={link.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  <ListItem disablePadding sx={{ mt: 1.5 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        openModal();
                        setDrawerOpen(false);
                      }}
                    >
                      Register Now
                    </Button>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          /* ── Desktop ── */
          <Box sx={s.desktopNav}>
            {NAV_LINKS.map((link) => (
              <Button
                key={link.href}
                onClick={() => goTo(link.href)}
                disableRipple
                sx={[
                  s.navButton,
                  isActive(link.href) && {
                    color: C.gold700,
                    '&::after': { transform: 'scaleX(1)' },
                  },
                ] as SxProps<Theme>}
              >
                {link.label}
              </Button>
            ))}

            <Button
              variant="contained"
              size="large"
              onClick={openModal}
              sx={s.registerButton}
            >
              Register Now
            </Button>

          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
