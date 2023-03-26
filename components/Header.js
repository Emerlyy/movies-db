import Navbar from "./Navbar";

import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  return (
    <AppBar position="static" sx={{ borderWidth: '0px 0px thin' }} elevation={0} variant="outlined">
      <Container maxWidth="xl">
        <Toolbar>
          <LiveTvRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
          <Navbar sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, columnGap: 3 }} />
          <ThemeSwitcher />
        </Toolbar>
      </Container>
    </AppBar >
  )
};

export default Header;