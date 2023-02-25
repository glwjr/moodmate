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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
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

  const handleActivities = (event, selectedActivities) => {
    setEntry({ ...entry, activities: selectedActivities });
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
            {/* <ToggleButtonGroup
              size="small"
              value={entry.activities}
              onChange={handleActivities}
              aria-label="Activity"
            >
              {activities.map((activity) => (
                <ToggleButton
                  key={activity.id}
                  value={activity.name}
                  aria-label={activity.name}
                >
                  {activity.name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup> */}
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
