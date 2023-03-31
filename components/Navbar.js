import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";

const pages = [
  { id: 1, title: 'Movies', path: '/movies' },
  { id: 2, title: 'TV Shows', path: '/tv' },
  { id: 3, title: 'Search', path: '/search' },
  { id: 4, title: 'Saved', path: '/saved' },
]

const Navbar = ({ sx, onClick }) => {

  const { pathname } = useRouter();

  return (
    <Box sx={sx}>
      <Button
        component={Link}
        href={'/'}
        sx={{ display: { xs: 'relative', md: 'none' }, my: 2, color: 'inherit', borderBottom: pathname === '/' ? '1px solid' : 'none', borderRadius: 0 }}
        onClick={onClick}>
        Home
      </Button>
      {pages.map(({ id, title, path }) => (
        <Button
          key={id}
          component={Link}
          href={path}
          sx={{ my: 2, color: 'inherit', borderBottom: pathname === path ? '1px solid' : 'none', borderRadius: 0, display: 'block' }}
          onClick={onClick}
        >
          {title}
        </Button>
      ))}
    </Box>
  )
}

export default Navbar;



