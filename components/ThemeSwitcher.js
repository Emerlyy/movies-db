import { useColorMode } from '@/context/ColorModeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { IconButton } from '@mui/material';

const ThemeSwitcher = () => {

  const { mode, toggleColorMode } = useColorMode();

  return (
    <IconButton onClick={toggleColorMode}>
      {mode === 'dark' ? <LightModeIcon /> : <NightlightIcon />}
    </IconButton>
  )
}

export default ThemeSwitcher;