import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Modes } from "types";


export const ColorModeContext = createContext({ toggleColorMode: () => { }, mode: 'dark' });

interface ColorModeContextProps {
  children: React.ReactNode
}

export const ColorModeProvider = ({ children }: ColorModeContextProps) => {

  const [mode, setMode] = useState<Modes>('dark');
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light')
      localStorage.setItem('theme', mode === 'light' ? 'dark' : 'light')
      document.documentElement.dataset.theme = mode === 'light' ? 'dark' : 'light';
    },
    mode,
  }), [mode]);

  useEffect(() => {
    const mode = (localStorage.getItem('theme') || 'dark') as Modes;
    setMode(mode);
    document.documentElement.dataset.theme = mode;
  }, [])

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: {
          main: mode === 'light' ? '#f5f5f5' : '#121212'
        },
        secondary: {
          main: '#cb0000'
        },
        neutral: {
          main: mode === 'light' ? "#d2d2d2" : '#2e2e2e'
        }
      },
      components: {
        MuiContainer: {
          defaultProps: {
            maxWidth: 'xl'
          }
        },
        MuiSelect: {
          defaultProps: {
            color: 'neutral'
          }
        }
      },
      typography: {
        h3: {
          fontSize: '2rem',
          '@media (min-width:900px)': {
            fontSize: '3rem',
          },
        },
        h4: {
          fontSize: '1.2rem',
          '@media (min-width:600px)': {
            fontSize: '1.8rem',
          },
          '@media (min-width:900px)': {
            fontSize: '2.125rem',
          },
        },
        h5: {
          fontSize: '1.2rem',
          '@media (min-width:600px)': {
            fontSize: '1.5rem',
          },
        },
        h6: {
          fontSize: '0.7rem',
          '@media (min-width:600px)': {
            fontSize: '0.875rem',
          },
          '@media (min-width:900px)': {
            fontSize: '0.875rem',
          },
        },
        subtitle1: {
          fontSize: '1.15rem',
          '@media (min-width:600px)': {
            fontSize: '1.5rem',
          },
          '@media (min-width:900px)': {
            fontSize: '1.7rem',
          },
        },
        body2: {
          fontSize: '0.7rem',
          '@media (min-width:600px)': {
            fontSize: '0.875rem',
          },
        },
        tagline: {
          fontSize: '0.9rem',
          fontFamily: 'Roboto',
        },
        progress: {
          fontSize: '0.8rem',
          fontFamily: 'Roboto',
          '@media (min-width:600px)': {
            fontSize: '1.5rem',
          },
        }
      }
    }),
    [mode],)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
};


export const useColorMode = () => useContext(ColorModeContext);