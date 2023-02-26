/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import MoodChart from './MoodChart';

function Home() {
  const { auth } = useSelector((state) => state);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        marginTop={4}
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Grid xs={8} textAlign="center">
          <Typography gutterBottom color="text.primary" variant="h4">
            {auth.firstName}
            &apos;s Mood Chart
          </Typography>
          <MoodChart />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
