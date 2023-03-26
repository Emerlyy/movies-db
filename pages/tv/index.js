import { Button, Container } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

// export const getStaticProps = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/users');
//   const data = await res.json();

//   return {
//     props: {
//       contacts: data
//     }
//   }
// }

const TvShows = ({ movies }) => {
  return (
    <Container>
      <Head>
        <title>TV Shows</title>
      </Head>
      <ul>
        {movies && movies.map((contact) => {
          return (
            <li key={contact.id}>
              <Link href={`/movies/${contact.id}`}>{contact.name}</Link>
              ({contact.email})
            </li>
          )
        })
        }
      </ul>
      <Button variant="outlined" >Hello</Button>
    </Container>
  )
};

export default TvShows;