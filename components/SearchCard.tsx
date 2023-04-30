import movieApi from "client";
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography, useTheme } from "@mui/material";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import Link from "next/link";
import { LocalItemGeneral } from "types";

interface SearchCardProps {
  item: LocalItemGeneral,
  type: SearchCardTypes,
  sx?: { [key: string | number]: CSSStyleRule }
}

type SearchCardTypes = 'movie' | 'tv';

const SearchCard = ({ item, type, sx }: SearchCardProps) => {

  const theme = useTheme();

  return (
    <Card variant='outlined' sx={{ display: 'flex', borderRadius: 2, ...sx }}>
      <CardActionArea sx={{ width: 'fit-content' }} component={Link} href={`${type === 'movie' ? 'movies' : 'tv'}/${item.id}`}>
        {
          item.poster
            ? <CardMedia
              component="img"
              sx={{ width: 100, height: '100%', minHeight: 150 }}
              image={movieApi.getImageUrl(item.poster)} />
            : <Box sx={{ width: 100, height: '100%', minHeight: 150, display: 'grid', placeItems: 'center' }}><ImageOutlinedIcon sx={{ fontSize: 60 }} /></Box>
        }
      </CardActionArea>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: '16px', bgcolor: theme.palette.primary.main, '&:last-child': { pb: '16px' } }}>
        <Box>
          <Typography
            sx={{ display: 'block' }}
            fontWeight={500}
            fontSize={18}
            component={Link}
            href={`${type === 'movie' ? 'movies' : 'tv'}/${item.id}`}>
            {item.title}
          </Typography>
          <Typography color="gray" variant="caption" component='span'>{item.release}</Typography>
        </Box>
        <Typography sx={{ display: '-webkit-box', overflow: 'hidden', '-webkit-box-orient': 'vertical', lineClamp: '8', '-webkit-line-clamp': '8' }} variant="body2" component='p'>{item.overview}</Typography>
      </CardContent>
    </Card >
  )
}

export default SearchCard;