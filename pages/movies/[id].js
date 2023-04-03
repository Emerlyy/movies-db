import movieApi from "@/client";
import ItemInfo from "@/components/ItemInfo";
import { Box, Container } from "@mui/material";
import Head from "next/head";

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const data = await movieApi.movies.findById(id);
  data.poster = movieApi.getImageUrl(data.poster_path);
  // const similar = await movieApi.movies.getSimilar()
  return {
    props: {
      movie: data
    }
  }
}

const Movie = ({ movie }) => {
  return (
    <>
      <Head>
        <title>{movie.title}</title>
      </Head>
      <Box sx={{ width: '100%', flexGrow: 1, background: `url('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}') no-repeat`, backgroundSize: 'cover' }}>
        <Container maxWidth='lg'>
          <ItemInfo item={movie} />
        </Container>
      </Box>
    </>
  );
};

export default Movie;