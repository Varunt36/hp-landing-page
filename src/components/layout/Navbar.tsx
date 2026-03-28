import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar, Toolbar, Typography, Button, Box,
  IconButton, Drawer, List, ListItem, ListItemButton, ListItemText,
  useMediaQuery, useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { NAV_LINKS } from '../../data/data'
import { navbarStyles } from './Navbar.styles'

export default function Navbar() {
  const theme    = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setDrawerOpen(false)
  }

  return (
    <AppBar position="sticky" sx={navbarStyles.appBar}>
      <Toolbar sx={navbarStyles.toolbar}>
        <Typography variant="h6" fontWeight={700} letterSpacing={0.5} color="white">
          HariPrabodham Germany
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <Box sx={navbarStyles.drawerBox}>
                <List>
                  {NAV_LINKS.map((link) => (
                    <ListItem key={link.href} disablePadding>
                      <ListItemButton onClick={() => scrollTo(link.href)}>
                        <ListItemText primary={link.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => scrollTo('#register')}>
                      <ListItemText primary="Register" sx={{ color: 'secondary.main', fontWeight: 700 }} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={navbarStyles.desktopNav}>
            {NAV_LINKS.map((link) => (
              <Button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                sx={navbarStyles.navButton}
              >
                {link.label}
              </Button>
            ))}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => scrollTo('#register')}
              sx={navbarStyles.registerButton}
            >
              Register
            </Button>
            <IconButton
              onClick={() => navigate('/admin/login')}
              sx={{ color: 'white', ml: 0.5 }}
              title="Admin"
            >
              <AdminPanelSettingsIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}
