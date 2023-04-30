import { calculateRuntime } from "utils/calculateRuntime";
import { Box, Paper, Popover, Typography } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { usePopover } from "hooks/usePopover";
import Image from "next/image";
import { LocalItemDetails } from "types/Movie";

interface ItemInfoProps {
  item: LocalItemDetails
}

const ItemInfo = ({ item }: ItemInfoProps) => {

  const [anchorEl, open, handlePopoverOpen, handlePopoverClose] = usePopover();

  const { title, genres, release, runtime, tagline, voteAverage, voteCount, poster, overview } = item || {};

  const [year, month, day] = release.split('-');

  const duration = calculateRuntime(runtime);

  return (
    <Paper elevation={0} sx={{ mx: 'auto', my: 6, overflow: 'hidden', bgcolor: 'transparent', color: '#fff' }}>
      <Box sx={{ p: { xs: 2, md: 4 }, width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'flex-start' }, columnGap: 3, bgcolor: 'transparent', backdropFilter: 'blur(5px)', backgroundImage: `linear-gradient(to right, rgba(20, 20, 20, 1), rgba(20, 20, 20, 0.7) 65%, rgba(20, 20, 20, 0.7) 100%)` }}>
        <Image alt='Poster' src={poster || ''} width={300} height={450} style={{ borderRadius: '2px' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
          <Box mb={3} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: 'center', columnGap: 1 }}>
            <Typography mt={{ xs: 1, md: 0 }} sx={{ width: '100%', fontWeight: 700, textAlign: { xs: 'center', md: 'start' } }} component='h2' variant='h4'>
              {title} <Typography component='span' variant='h4' color='gray'>({year})</Typography>
            </Typography>
            <Typography mt={{ xs: 2, sm: 0 }} component='span' variant="body2">{day}/{month}/{year}</Typography>
            <CircleIcon sx={{ fontSize: 6 }} />
            <Box sx={{ display: 'flex', columnGap: 1 }}>
              {
                genres.map(({ name, id }) => <Typography key={id} component='span' variant="body2">{name}</Typography>)
              }
            </Box>
            <CircleIcon sx={{ fontSize: 6 }} />
            {duration && <Typography component='span' variant="body2">{duration.hours}h {duration.minutes}m</Typography>}
          </Box>
          <Box mb={{ xs: 2, sm: 5 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component='div'
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              mr={2}
              sx={{ width: { xs: 40, sm: 70 }, height: { xs: 40, sm: 70 }, bgcolor: '#081c22', borderRadius: '50%', p: .5 }}>
              <CircularProgressbarWithChildren styles={buildStyles({ pathColor: "#21d07a", trailColor: '#204529', backgroundColor: '#3e98c7' })} value={voteAverage} maxValue={10}>
                <Typography component='span' variant="progress" fontWeight='bold'>{Math.round(voteAverage * 10)}</Typography>
              </CircularProgressbarWithChildren>
            </Box>
            <Typography fontWeight='bold' component='span' variant="body2">User<br />Score</Typography>
            <Popover
              disableScrollLock={true}
              sx={{
                mt: '2px',
                pointerEvents: 'none',
              }}
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              disableRestoreFocus
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Typography px={2} py={1}>{voteCount} votes</Typography>
            </Popover>
          </Box>
          <Typography component='span' variant="tagline" sx={{ fontStyle: 'italic' }} >{tagline}</Typography>
          <Box mt={5}>
            <Typography mb={1} variant="h6" component='h3'>Overview</Typography>
            <Typography variant="body2" component='p'>{overview}</Typography>
          </Box>
        </Box>
      </Box>
    </Paper >
  );
}

export default ItemInfo;