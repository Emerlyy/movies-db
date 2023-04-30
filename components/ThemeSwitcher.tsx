import { useColorMode } from '../context/ColorModeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { IconButton } from '@mui/material';

interface ThemeSwitcherProps {
  sx?: {
    [key: string]: any
  }
}

const ThemeSwitcher = ({ sx }: ThemeSwitcherProps) => {

  const { mode, toggleColorMode } = useColorMode();

  return (
    <IconButton onClick={toggleColorMode} sx={sx}>
      {mode === 'dark' ? <LightModeIcon /> : <NightlightIcon />}
    </IconButton>
  )
}

export default ThemeSwitcher;