import React from "react";


import { Box, Paper } from "@mui/material";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
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