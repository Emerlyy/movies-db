import movieApi from "@/client";
import SearchCard from "@/components/SearchCard";
import { useProgressBar } from "@/hooks/useProgressBar";
import { useQuery } from "@/hooks/useQuery";
import { Box, Container, Pagination, Paper, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

export const getServerSideProps = async (context) => {

  const {
    type = 'movies',
    query = '',
    page = 1
  } = context.query;

  let data = {
    page: 0,
    total_pages: 0,
    results: []
  };

  if (query)
    data = await movieApi[type].search({ query, page });

  return {
    props: {
      query,
      results: data.results,
      total_pages: data.total_pages,
      page: data.page,
      type
    }
  }
}


const Search = ({ query: initialQuery, results, total_pages, page, type }) => {

  const [, , changeData] = useQuery();

  const [query, setQuery] = useState(initialQuery);

  const [isWaiting, setIsWaiting] = useState(false);

  const handleQueryChange = (value) => {
    setQuery(value);
    setIsWaiting(true);
  }

  const [progress, clearProgress, refresh] = useProgressBar(() => {
    changeData({ query });
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      refresh();
      setIsWaiting(false);
    }, 300);
    return () => clearTimeout(timeout)
  }, [query]);

  const handleTypeChange = (_, newType) => {
    if (newType) {
      changeData({ type: newType, page: 1 });
    }
  };

  const handlePageChange = (_, value) => {
    changeData({ page: value });
  };

  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <LoadingBar
        color='red'
        progress={progress}
        onLoaderFinished={clearProgress} />
      <Paper sx={{ py: 6, flexGrow: 1 }}>
        <Container maxWidth="lg">
          <Box mb={4} sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap-reverse', gap: 2 }}>
            <TextField sx={{ width: '70%', flexGrow: 1 }} size='small' color='text' autoComplete="off" value={query} onChange={(e) => handleQueryChange(e.target.value)} label='Search'></TextField>
            <ToggleButtonGroup
              value={type}
              size='small'
              exclusive
              onChange={handleTypeChange}
              aria-label="Platform">
              <ToggleButton value="movies">Movies</ToggleButton>
              <ToggleButton value="tv">TV Show</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {
            results.length ?
              <>
                <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                  {
                    results.map(itm => <SearchCard key={itm.id} item={itm} type={type === 'movies' ? 'movie' : 'tv'} />)
                  }
                </Box>
                <Pagination sx={{ mt: 4, marginX: 'auto', width: 'fit-content' }} size='small' siblingCount={1} count={Math.min(total_pages, 500)} variant="outlined" shape="rounded" page={page} onChange={handlePageChange} />
              </>
              : <>{!isWaiting && !progress && <Typography>{query ? 'There are no movies that matched your query' : 'Start typing to see results'}</Typography>}</>
          }
        </Container>
      </Paper>
    </>
  )
}

export default Search;