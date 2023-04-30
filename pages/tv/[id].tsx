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
  const data = await movieApi.tv.findById(id);
  data.poster = movieApi.getImageUrl(data.poster || '');

  return {
    props: {
      item: data
    }
  }
}

interface TVShowProps {
  item: LocalItemDetails
}

const TVShow = ({ item }: TVShowProps) => {
  return (
    <>
      <Head>
        <title>{item.title}</title>
      </Head>
      <Box sx={{ width: '100%', flexGrow: 1, background: `url('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${item.backdrop}') no-repeat`, backgroundSize: 'cover' }}>
        <Container maxWidth='lg'>
          <ItemInfo item={item} />
        </Container>
      </Box>
    </>
  )
};

export default TVShow;