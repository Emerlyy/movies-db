import { useRange } from "@/hooks/useRange";
import { useSelect } from "@/hooks/useSelect";
import { Box, Button, Chip, FormControl, ListItem, MenuItem, Paper, Select, Slider, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const marks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => ([0, 5, 10].includes(num) ? { value: num, label: num } : { value: num }))

const Sidebar = ({ initialData, onSubmit, genres }) => {

  const theme = useTheme();

  const {
    sortingType: initialSortingType,
    rating: initialRating,
    genres: initialGenres
  } = initialData;

  const { ref, inView } = useInView();

  const [isChanged, setIsChanged] = useState(false);

  const [sortingType, handleSortingTypeChange] = useSelect(initialSortingType);
  const [rating, handleRatingChange] = useRange(initialRating);

  const [selectedGenres, setSelectedGenres] = useState(initialGenres);

  useEffect(() => {
    if (sortingType !== initialSortingType || rating[0] !== initialRating[0] || rating[1] !== initialRating[1] || JSON.stringify(selectedGenres) !== JSON.stringify(initialGenres)) {
      setIsChanged(true);
    } else {
      setIsChanged(false)
    }
  }, [sortingType, rating, selectedGenres, initialSortingType, initialRating, initialGenres])

  return (
    <Paper square variant="outlined" sx={{ flexShrink: 0, py: 6, px: 4, bgcolor: theme.palette.primary.main, width: 300 }}>
      <FormControl sx={{ minWidth: 240 }}>
        <Typography mb={2}>Sort by</Typography>
        <Select
          id="sort-type-select"
          value={sortingType}
          onChange={handleSortingTypeChange}
          color='text'
          inputProps={{ MenuProps: { disableScrollLock: true } }}
        >
          <MenuItem value={'popularity.desc'}>Popularity Descending</MenuItem>
          <MenuItem value={'popularity.asc'}>Popularity Ascending</MenuItem>
          <MenuItem value={'vote_average.desc'}>Rating Descending</MenuItem>
          <MenuItem value={'vote_average.asc'}>Rating Ascending</MenuItem>
        </Select>
      </FormControl>

      <Box mt={5} px={1}>
        <Typography mb={2} ml={-1}>User Score</Typography>
        <Slider
          marks={marks}
          step={1}
          getAriaLabel={() => 'Rating'}
          value={rating}
          color='secondary'
          onChange={handleRatingChange}
          valueLabelDisplay="auto"
          min={0}
          max={10}
        />
      </Box>
      {genres &&
        <Box mt={5}>
          <Typography mb={2}>Genres</Typography>
          <Box component='ul' sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {
              genres.map(({ name, id }) => {
                const checked = selectedGenres.includes(id);
                return <ListItem key={id} sx={{ p: 0, width: 'auto' }}>
                  <Chip
                    label={name}
                    variant={checked ? 'filled' : 'outlined'}
                    color={checked ? 'secondary' : 'default'}
                    onClick={() => setSelectedGenres(prevIds => checked ? prevIds.filter(pId => pId !== id) : [...prevIds, id].sort())} />
                </ListItem>
              })
            }
          </Box>
        </Box>
      }
      <Box mt={5} ref={ref}>
        <Button
          disabled={!isChanged}
          sx={{ width: '100%', position: inView ? '' : 'fixed', display: (inView || isChanged) ? '' : 'none', bottom: 0, left: 0, right: 0, zIndex: 1, borderRadius: inView ? '' : 0 }}
          variant="contained"
          color='secondary'
          onClick={() => onSubmit(sortingType, rating, selectedGenres)}>
          Search
        </Button>
      </Box>
    </Paper>
  )
}

export default Sidebar;