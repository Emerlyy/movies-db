import Navbar from "./Navbar";

import { AppBar, Box, Container, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import ThemeSwitcher from "./ThemeSwitcher";
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from "next/link";

const Header = () => {

  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const toggleMenu = (newState: boolean) => {
    setIsMenuOpened(newState);
  };

  useEffect(() => {
    document.documentElement.style.overflow = isMenuOpened ? 'hidden' : '';
  }, [isMenuOpened])

  return (
    <AppBar position="static" sx={{ borderWidth: '0px 0px thin' }} elevation={0} variant="outlined">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center', mr: 18 }}>
            <LiveTvRoundedIcon sx={{ mr: 1 }} />
            <Typography
              fontSize='1rem'
              mt='4px'
              noWrap
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MOVIES
            </Typography>
          </Box>
          <IconButton
            sx={{ mr: 0, ml: 'auto', display: { xs: 'flex', md: 'none' } }}
            size="large"
            onClick={() => toggleMenu(true)}
            color="inherit">
            <MenuIcon />
          </IconButton>
          <Paper elevation={0} square sx={{ zIndex: 1201, bgcolor: { md: 'inherit' }, width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, position: { xs: 'fixed', md: 'static' }, overflow: 'hidden', top: 0, left: 0, right: 0, bottom: 0, transition: '.3s', transform: { xs: isMenuOpened ? '' : 'translateX(-100%)', md: 'none' } }}>
            <IconButton size="large" color='inherit' sx={{ display: { md: 'none' }, position: 'absolute', top: 10, right: 10 }} onClick={() => toggleMenu(false)}>
              <CloseIcon color="inherit" />
            </IconButton>
            <Navbar onClick={() => toggleMenu(false)} sx={{ flexGrow: { xs: 0, md: 1 }, display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' }, columnGap: 3 }} />
            <ThemeSwitcher sx={{ position: { xs: 'absolute', md: 'relative' }, bottom: { xs: 10, md: 'unset' }, right: { xs: 10, md: 'unset' } }} />
          </Paper>
        </Toolbar>
      </Container>
    </AppBar >
  )
};

export default Header;