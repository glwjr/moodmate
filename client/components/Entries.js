/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import { fetchEntries } from '../store';
import EntryForm from './EntryForm';

function Entries() {
  const dispatch = useDispatch();
  const { entries } = useSelector((state) => state);

  React.useEffect(() => {
    dispatch(fetchEntries());
  }, []);

  return (
    <Grid
      container
      spacing={4}
      margin={4}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <EntryForm />
      <pre>
        {JSON.stringify(entries, null, 2)}
      </pre>
    </Grid>
  );
}

export default Entries;
