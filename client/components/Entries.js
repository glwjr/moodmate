/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { fetchEntries, removeEntry } from '../store';
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
      margin={4}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh', minWidth: 700 }}
      spacing={4}
    >
      <Grid>
        <EntryForm />
      </Grid>
      <Grid sx={{ mt: 2 }} xs={12} display="flex" flexDirection="column" alignItems="center">
        {entries.map((entry) => (
          <Box
            key={entry.id}
            sx={{
              width: '100%',
              maxWidth: 564,
              border: '1px solid lightgrey',
              borderRadius: 2,
              mb: 4,
            }}
          >
            <Box sx={{ m: 3 }} textAlign="center">
              <Typography gutterBottom variant="h6" component="div">
                {moment(entry.createdAt).format('dddd, MMMM Do, YYYY, h:mm a')}
              </Typography>
              <Typography gutterBottom variant="h6" fontWeight="bold" component="div">
                {entry.mood}
              </Typography>
              <Typography color="text.primary" variant="body2">
                {entry.note}
              </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}>
              <Typography variant="body2" textAlign="center" sx={{ mb: 1, textDecoration: 'underline', textTransform: 'uppercase' }}>
                Activities
              </Typography>
              <Stack flexWrap="wrap" direction="row" justifyContent="center" spacing={1}>
                {entry.activities.map((activity) => (
                  <Chip key={activity} color="primary" label={activity} sx={{ mb: 1 }} />
                ))}
              </Stack>
            </Box>
            <Box sx={{ mr: 3, mt: 0, mb: 2 }} textAlign="right">
              <Button size="small">Edit</Button>
              <Button onClick={() => dispatch(removeEntry(entry))} size="small">Delete</Button>
            </Box>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
}

export default Entries;
