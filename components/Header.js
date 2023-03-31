import Navbar from "./Navbar";

import { AppBar, Container, IconButton, Menu, Paper, Toolbar, Typography } from "@mui/material";
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import ThemeSwitcher from "./ThemeSwitcher";
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {

  const [isMenuOpened, setIsMenuOpened] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpened(prev => !prev);
  };

  useEffect(() => {
    document.documentElement.style.overflow = isMenuOpened ? 'hidden' : '';
  }, [isMenuOpened])

  return (
    <AppBar position="static" sx={{ borderWidth: '0px 0px thin' }} elevation={0} variant="outlined">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            sx={{ mr: 0, ml: 'auto', display: { xs: 'flex', md: 'none' } }}
            size="large"
            onClick={toggleMenu}
            color="inherit">
            <MenuIcon />
          </IconButton>
          <Paper elevation={0} square sx={{ zIndex: 10, bgcolor: { md: 'inherit' }, width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, position: { xs: 'fixed', md: 'static' }, overflow: 'hidden', top: 0, left: 0, right: 0, bottom: 0, transition: '.3s', transform: { xs: isMenuOpened ? '' : 'translateX(-100%)', md: 'none' } }}>
            <LiveTvRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <IconButton size="large" color='inherit' sx={{ display: { md: 'none' }, position: 'absolute', top: 10, right: 10 }} onClick={toggleMenu}>
              <CloseIcon color="inherit" />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 18,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MOVIES
            </Typography>
            <Navbar onClick={toggleMenu} sx={{ flexGrow: { xs: 0, md: 1 }, display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' }, columnGap: 3 }} />
            <ThemeSwitcher sx={{ position: { xs: 'absolute', md: 'relative' }, bottom: { xs: 10, md: 'unset' }, right: { xs: 10, md: 'unset' } }} />
          </Paper>
        </Toolbar>
      </Container>
    </AppBar >
  )
};

export default Header;