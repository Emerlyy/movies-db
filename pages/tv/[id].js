import movieApi from "@/client";
import ItemInfo from "@/components/ItemInfo";
import { Box } from "@mui/material";
import Head from "next/head";

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const data = await movieApi.tv.findById(id);
  data.poster = movieApi.getImageUrl(data.poster_path);

  return {
    props: {
      item: data
    }
  }
}

const TVShow = ({ item }) => {

  const info = {
    title: item.name,
    genres: item.genres,
    release_date: item.first_air_date,
    runtime: item.episode_run_time,
    tagline: item.tagline,
    vote_average: item.vote_average,
    poster: item.poster,
    vote_count: item.vote_count,
    overview: item.overview
  };

  return (
    <>
      <Head>
        <title>{item.name}</title>
      </Head>
      <Box sx={{ width: '100%', flexGrow: 1, background: `url('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${item.backdrop_path}') no-repeat`, backgroundSize: 'cover' }}>
        <ItemInfo item={info} />
      </Box>
    </>
  )
};

export default TVShow;