import movieApi from "@/client";
import ItemCard from "@/components/ItemCard";
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Pagination, Paper, Select, Slider, useTheme } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import useSWR from 'swr';
export const getStaticProps = async () => {
  const data = await movieApi.movies.explore();

  return {
    props: {
      initialMovies: data.results,
      initialPage: data.page,
      totalPages: data.total_pages
    }
  }
}

const fetcher = (...args) => movieApi.movies.explore().then((res)=>res.json()) 

const useOptions = (initialOptions) => {
  const [options, setOptions] = useState({ page: 1, sortingType: 'popularity.desc', ratingLower: 0, ratingHigher: 10, ...initialOptions });
  console.log(initialOptions)
  const changeValue = (changes) => {
    setOptions(prev => ({ ...prev, ...changes }));
  };

  return [options, changeValue];
}

const Movies = ({ initialMovies, initialPage, totalPages }) => {

  const router = useRouter();

  const [progress, setProgress] = useState(0);
  const [movies, setMovies] = useState(initialMovies);
  const [options, setOptions] = useOptions(router.query);

  const theme = useTheme();

  const { page, sortingType, ratingLower, ratingHigher } = options;

  const handlePageChange = (_, value) => {
    setOptions({ page: value });
  };

  const onSortingTypeChange = (e) => {
    setOptions({ page: 1, sortingType: e.target.value });
  };

  const onRangeChange = (_, newValue) => {
    if (ratingLower === newValue[0] && ratingHigher === newValue[1]) return;

    setOptions({
      ratingLower: newValue[0],
      ratingHigher: newValue[1]
    })
  }

  useEffect(() => {
    let isValid = true;
    const fetchData = async () => {
      if (!isValid) {
        return;
      }

      router.replace({
        query: {
          ...options
        }
      })

      setProgress(10);
      const data = await movieApi.movies.explore(options);
      setMovies(data.results);
      setProgress(100);
    }
    setTimeout(fetchData, 500);

    return () => isValid = false;
  }, [options]);

  return (
    <>
      <Head>
        <title>Movies</title>
      </Head>
      <LoadingBar
        color='red'
        progress={progress}
        onLoaderFinished={() => setProgress(0)} />
      <Box sx={{ display: 'flex' }}>
        <Paper square variant="outlined" sx={{ flexShrink: 0, py: 6, px: 4, bgcolor: theme.palette.primary.main, width: 300 }}>
          <FormControl sx={{ minWidth: 240 }}>
            <InputLabel color="text" id="sort-type-select-label" sx={{ top: -10 }}>Sort by</InputLabel>
            <Select
              labelId="sort-type-select-label"
              id="sort-type-select"
              value={sortingType}
              onChange={onSortingTypeChange}
              color='text'
              inputProps={{ MenuProps: { disableScrollLock: true } }}
            >
              <MenuItem value={'popularity.desc'}>Popularity Descending</MenuItem>
              <MenuItem value={'popularity.asc'}>Popularity Ascending</MenuItem>
              <MenuItem value={'vote_average.desc'}>Rating Descending</MenuItem>
              <MenuItem value={'vote_average.asc'}>Rating Ascending</MenuItem>
            </Select>
          </FormControl>
          <Slider
            getAriaLabel={() => 'Rating'}
            value={[ratingLower, ratingHigher]}
            color='secondary'
            onChange={onRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={10}
          />
          <Button variant="contained" color='secondary'>Find</Button>
        </Paper>
        <Paper square variant="outlined" sx={{ flexGrow: 1, py: 6 }}>
          <Container>
            {
              movies &&
              <Box mb={4} sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fit, 180px)', justifyContent: 'center' }}>
                {
                  movies && movies.map((movie) => <ItemCard maxWidth={180} imgHeight={270} key={movie.id} movie={movie} imgSize='md' onCardClick={() => router.push(`movies/${movie.id}`)} />)
                }
              </Box>
            }
            <Pagination sx={{ marginX: 'auto', width: 'fit-content' }} siblingCount={3} count={Math.min(totalPages, 500)} variant="outlined" shape="rounded" page={page} onChange={handlePageChange} />
          </Container>
        </Paper>
      </Box>
    </>
  )
};

export default Movies;