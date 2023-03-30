import movieApi from "@/client";
import ItemCard from "@/components/ItemCard";
import Sidebar from "@/components/Sidebar";
import { useProgressBar } from "@/hooks/useProgressBar";
import { useQuery } from "@/hooks/useQuery";
import { Box, Container, Pagination, Paper, Typography } from "@mui/material";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

export const getServerSideProps = async (context) => {

  for (const value of Object.values(context.query)) {
    if (!value) {
      return {
        notFound: true
      }
    }
  }

  const data = await movieApi.tv.explore(context.query);
  const genres = await movieApi.tv.getGenres();

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      initialShows: data.results,
      initialPage: data.page,
      initialTotalPages: data.total_pages,
      genres
    }
  }
}


const TVShows = ({ initialShows, initialTotalPages, initialPage, genres }) => {
  const [setData, getData, changeData] = useQuery();
  const query = getData();

  const [tvShows, setTVShows] = useState(initialShows);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [page, setPage] = useState(initialPage);

  const [progress, clearProgress, fetchData] = useProgressBar(movieApi.tv.explore, query);

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

  const updateItems = useCallback(() => {
    fetchData()
      .then(data => {
        setTVShows(data.results);
        setTotalPages(data.total_pages);
      });
  }, [fetchData]);

  useEffect(() => {
    updateItems();
  }, [query, updateItems]);

  const handlePageChange = (_, value) => {
    changeData({ page: value });
    setPage(value);
  };

  return (
    <>
      <Head>
        <title>TVShows</title>
      </Head>
      <LoadingBar
        color='red'
        progress={progress}
        onLoaderFinished={clearProgress} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar initialData={settings} onSubmit={handleSidebarSubmit} genres={genres} />
        <Paper square variant="outlined" sx={{ flexGrow: 1, py: 6 }}>
          <Container>
            {
              tvShows.length
                ? <Box mb={4} sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fit, 180px)', justifyContent: 'center' }}>
                  {
                    tvShows && tvShows.map((tv) => <ItemCard maxWidth={180} imgHeight={270} key={tv.id} title={tv.name} releaseDate={tv.first_air_date} posterPath={tv.poster_path} imgSize='md' path={`tv/${tv.id}`} />)
                  }
                </Box>
                : <Typography component='h2'>No items were found that match your query.</Typography>
            }
            <Pagination sx={{ marginX: 'auto', width: 'fit-content' }} siblingCount={3} count={Math.min(totalPages, 500)} variant="outlined" shape="rounded" page={page} onChange={handlePageChange} />
          </Container>
        </Paper>
      </Box>
    </>
  )
};

export default TVShows;