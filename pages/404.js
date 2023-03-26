import { Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Error = () => {

  const router = useRouter();

  const [remain, setRemain] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemain(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [router])

  useEffect(() => {
    if (remain < 1) {
      router.push('/');
    }
  }, [remain]);

  return (
    <>
      <Head>
        <title>Error</title>
      </Head>
      <Typography variant="h4" component='h1'>404</Typography>
      <p>Something went wrong</p>
      <div>Returning to home page in {remain} seconds</div>
    </>
  );
};

export default Error;