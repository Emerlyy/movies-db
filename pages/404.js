import { Box, Paper, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Error = () => {

  const router = useRouter();

  const [remain, setRemain] = useState(5);

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
  }, [remain, router]);

  return (
    <>
      <Head>
        <title>Error</title>
      </Head>
      <Paper sx={{ flexGrow: 1, display: 'grid', placeItems: 'center' }}>
        <Box>
          <Typography textAlign='center' variant='h4' component='h1'>404</Typography>
          <Typography textAlign='center' variant='body2' component='p'>Something went wrong</Typography>
          <Typography textAlign='center' variant='caption' component='span'>Returning to home page in {remain} seconds</Typography>
        </Box>
      </Paper>
    </>
  );
};

export default Error;