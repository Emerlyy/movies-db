import movieApi from "client";
import ItemInfo from "components/ItemInfo";
import { Box, Container } from "@mui/material";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { LocalItemDetails } from "types";

interface ContextParams extends ParsedUrlQuery { id: string };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as ContextParams;
  const data = await movieApi.movies.findById(id);
  data.poster = movieApi.getImageUrl(data.poster || '');
  // const similar = await movieApi.movies.getSimilar()
  return {
    props: {
      movie: data
    }
  }
}

interface MovieProps {
  movie: LocalItemDetails
}

const MoviePage = ({ movie }: MovieProps) => {
  return (
    <>
      <Head>
        <title>{movie.title}</title>
      </Head>
      <Box sx={{ width: '100%', flexGrow: 1, background: `url('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop}') no-repeat`, backgroundSize: 'cover' }}>
        <Container maxWidth='lg'>
          <ItemInfo item={movie} />
        </Container>
      </Box>
    </>
  );
};

export default MoviePage;