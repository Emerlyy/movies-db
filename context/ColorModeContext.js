import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const ColorModeContext = createContext({ toggleColorMode: () => { }, mode: 'dark' });

export const ColorModeProvider = ({ children }) => {

  const [mode, setMode] = useState('dark');
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light')
      localStorage.setItem('theme', mode === 'light' ? 'dark' : 'light')
      document.documentElement.dataset.theme = mode === 'light' ? 'dark' : 'light';
    },
    mode,
  }), [mode]);

  useEffect(() => {
    const mode = localStorage.getItem('theme') || 'dark';
    setMode(mode);
    document.documentElement.dataset.theme = mode;
  }, [])

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        ...(mode === 'light' ?
          {
            primary: {
              main: '#f5f5f5',
              contrastText: '#444'
            },
            secondary: {
              main: '#cb0000'
            }
          } :
          {
            primary: {
              main: '#121212',
              contrastText: '#fff'
            },
            secondary: {
              main: '#cb0000'
            }
          }
        )
      },
      components: {
        MuiContainer: {
          defaultProps: {
            maxWidth: 'xl'
          }
        },
        MuiCard: {
          styleOverrides: {
            root: {

            }
          }
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