import Header from "./Header";

import { Box, Paper } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100svh' }}>
      <Header />
      <Paper square component='main' sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </Paper>
    </Box>
  );
};

export default Layout;