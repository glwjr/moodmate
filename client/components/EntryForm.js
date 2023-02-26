/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry, fetchActivities, fetchMoods } from '../store';

function EntryForm() {
  const dispatch = useDispatch();
  const { moods, activities } = useSelector((state) => state);
  const [entry, setEntry] = React.useState({
    mood: '',
    note: '',
    activities: [],
  });

  React.useEffect(() => {
    dispatch(fetchMoods());
    dispatch(fetchActivities());
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addEntry(entry));
    setEntry({ mood: '', note: '', activities: [] });
  };

  const handleActivities = (event) => {
    const { target: { value } } = event;
    setEntry({ ...entry, activities: value });
  };

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <FormControl fullWidth>
          <InputLabel id="mood-label">How are you?</InputLabel>
          <Stack spacing={2}>
            <Select
              labelId="mood-label"
              name="mood"
              value={entry.mood}
              label="How are you?"
              onChange={onChange}
            >
              {moods.map((mood) => (
                <MenuItem key={mood.id} value={mood.name}>
                  {mood.name}
                </MenuItem>
              ))}
            </Select>
            <FormControl sx={{ m: 1 }}>
              <InputLabel id="activities-multiple-chip-label">Activities</InputLabel>
              <Select
                labelId="activities-multiple-chip-label"
                id="activities-multiple-chip"
                multiple
                value={entry.activities}
                onChange={handleActivities}
                input={<OutlinedInput id="select-multiple-chip" label="Activities" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {activities.map((activity) => (
                  <MenuItem
                    key={activity.id}
                    value={activity.name}
                  >
                    {activity.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="entry-note"
              label="Add a note"
              variant="outlined"
              value={entry.note}
              name="note"
              onChange={onChange}
            />
            <Button variant="contained" type="submit">Submit</Button>
          </Stack>
        </FormControl>
      </form>
    </Box>
  );
}

export default EntryForm;
