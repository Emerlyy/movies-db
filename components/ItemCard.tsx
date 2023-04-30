import movieApi from "client";
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography, useTheme } from "@mui/material";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import Link from "next/link";
import { ImageSize } from "types";

type CardSize = string | { xs?: string | number, sm?: string | number, md?: string | number, lg?: string | number, xl?: string | number };

interface ItemCardProps {
  title: string,
  releaseDate: string,
  posterPath: string | null,
  maxWidth?: CardSize,
  imgHeight?: CardSize,
  imgSize?: ImageSize,
  path?: string,
  sx?: { [key: string]: any }
}

const ItemCard = ({ title, releaseDate, posterPath, maxWidth, imgHeight, imgSize, path = '', sx }: ItemCardProps) => {

  const theme = useTheme();

  return (
    <Card variant='outlined' elevation={0} sx={{ maxWidth: maxWidth || '300px', display: 'flex', flexDirection: 'column', ...sx }}>
      <CardActionArea component={Link} href={path}>
        {
          posterPath
            ? <CardMedia
              component="img"
              sx={{ height: imgHeight || '450px' }}
              image={movieApi.getImageUrl(posterPath, imgSize)} />
            : <Box sx={{ width: '100%', height: imgHeight || 450, display: 'grid', placeItems: 'center' }}><ImageOutlinedIcon sx={{ fontSize: 60 }} /></Box>
        }
      </CardActionArea>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '16px 16px 0 16px', bgcolor: theme.palette.primary.main }}>
        <Typography variant="h6" component='h5' sx={{ flexGrow: 1 }}>{title}</Typography>
        <Typography variant="caption" component='span'>{releaseDate}</Typography>
      </CardContent>
    </Card>
  )
}

export default ItemCard;