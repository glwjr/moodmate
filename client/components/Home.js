/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import MoodChart from './MoodChart';

function Home() {
  const { auth } = useSelector((state) => state);

  return (
    <div>
      <Grid
        container
        margin={4}
        direction="column"
        alignItems="center"
        justify="center"
        // spacing={4}
      >
        <Typography color="text.primary" variant="h4">
          {auth.firstName}
          &apos;s Mood Chart
        </Typography>
        <Grid minWidth={500}>
          <MoodChart />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
