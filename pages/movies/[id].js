import movieApi from "@/client";
import MovieInfo from "@/components/MovieInfo";
import { Box } from "@mui/material";
import Head from "next/head";
import { useEffect } from "react";

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const data = await movieApi.movies.findById(id);
  data.poster = movieApi.getImageUrl(data.poster_path);
  return {
    props: {
      movie: data
    }
  }
}


const Movie = ({ movie }) => (
  <>
    <Head>
      <title>{movie.title}</title>
    </Head>
    <Box sx={{ width: '100%', flexGrow: 1, background: `url('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}') no-repeat`, backgroundSize: 'cover' }}>
      <MovieInfo movie={movie} />
    </Box>
  </>
);

export default Movie;