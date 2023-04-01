import movieApi from "@/client";
import ItemCard from "@/components/ItemCard";
import Sidebar from "@/components/Sidebar";
import { useProgressBar } from "@/hooks/useProgressBar";
import { useQuery } from "@/hooks/useQuery";
import { Box, Container, Pagination, Paper, Typography } from "@mui/material";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";



const Movies = ({ initialMovies, initialTotalPages, initialPage, genres }) => {
  const [setData, getData, changeData] = useQuery();
  const query = getData();

  const [movies, setMovies] = useState(initialMovies);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [page, setPage] = useState(initialPage);

  const [progress, clearProgress, fetchData] = useProgressBar(movieApi.movies.explore, query);

  const [settings, setSettings] = useState({
    sortingType: query.sortingType || 'popularity.desc',
    rating: [Number.parseInt(query.ratingLower) || 0, Number.parseInt(query.ratingHigher) || 10],
    genres: query.genres?.split(',').map(el => Number.parseInt(el) || null).sort() || []
  });

  const handleSidebarSubmit = (sortingType, rating, genres) => {
    if (page > 1) {
      setPage(1);
    }
    if (genres.length) {
      setData({ page: 1, sortingType, ratingLower: rating[0], ratingHigher: rating[1], genres: genres.toString() })
    }
    else {
      setData({ page: 1, sortingType, ratingLower: rating[0], ratingHigher: rating[1] })
    }
    setSettings({ sortingType, rating, genres });
  };

  const updateMovies = useCallback(() => {
    fetchData()
      .then(data => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      });
  }, [fetchData]);

  useEffect(() => {
    updateMovies();
  }, [query, updateMovies]);

  const handlePageChange = (_, value) => {
    changeData({ page: value });
    setPage(value);
  };

  return (
    <>
      <Head>
        <title>Movies</title>
      </Head>
      <LoadingBar
        color='red'
        progress={progress}
        onLoaderFinished={clearProgress} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar initialData={settings} onSubmit={handleSidebarSubmit} genres={genres} />
        <Paper square variant="outlined" sx={{ flexGrow: 1, py: 6 }}>
          <Container>
            <Typography sx={{ display: { sm: 'block', md: 'none' } }} variant="h4" component='h1' align="center" mb={4}>Movies</Typography>
            {
              movies.length
                ? <Box mb={4} sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: 'repeat(auto-fit, 120px)', sm: 'repeat(auto-fit, 160px)', md: 'repeat(auto-fit, 180px)' }, justifyContent: 'center' }}>
                  {
                    movies && movies.map((movie) => <ItemCard maxWidth={{ md: '100%' }} imgHeight={{ xs: 225, sm: 250, md: 270 }} key={movie.id} title={movie.title} releaseDate={movie.release_date} posterPath={movie.poster_path} imgSize='md' path={`movies/${movie.id}`} />)
                  }
                </Box>
                : <Typography component='h2'>No items were found that match your query.</Typography>
            }
            <Pagination sx={{ marginX: 'auto', width: 'fit-content' }} size='small' siblingCount={1} count={Math.min(totalPages, 500)} variant="outlined" shape="rounded" page={page} onChange={handlePageChange} />
          </Container>
        </Paper>
      </Box>
    </>
  )
};


export const getServerSideProps = async (context) => {

  for (const value of Object.values(context.query)) {
    if (!value) {
      return {
        notFound: true
      }
    }
  }

  const data = await movieApi.movies.explore(context.query);
  const genres = await movieApi.movies.getGenres();

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      initialMovies: data.results,
      initialPage: data.page,
      initialTotalPages: data.total_pages,
      genres
    }
  }
}


export default Movies;