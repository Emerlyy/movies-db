import Header from "./Header";

import styles from '../styles/Layout.module.css';
import { Paper } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Paper square component='main' sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </Paper>
    </div>
  );
};

export default Layout;