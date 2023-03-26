import ItemCard from "@/components/ItemCard";
import { Box, Card, CardContent, CardMedia, Container, Grid, Stack, Typography } from "@mui/material";

import Head from "next/head";
import { useEffect, useState } from "react";
import movieApi from "@/client";

const Home = () => {

  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await movieApi.movies.findById(550);
      setMovie(data);
    }
    fetchData();
  }, [])

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Container maxWidth='xl'>
        <Typography variant="h3" component="h1">Best movies of all times</Typography>
        {movie &&
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, 320px)', justifyContent: 'center' }}>
            <ItemCard movie={movie} />
            <ItemCard movie={movie} />
            <ItemCard movie={movie} />
            <ItemCard movie={movie} />
            <ItemCard movie={movie} />
          </Box>
        }
      </Container>
    </>
  )
};

export default Home;