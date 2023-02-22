/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry, fetchMoods } from '../store';

function EntryForm() {
  const dispatch = useDispatch();
  const { moods } = useSelector((state) => state);
  const [entry, setEntry] = useState({
    text: '',
    mood: '',
  });

  useEffect(() => {
    dispatch(fetchMoods());
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addEntry(entry));
    setEntry({ text: '', mood: '' });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Type a new entry"
          value={entry.text}
          name="text"
          onChange={onChange}
        />
        <select
          name="mood"
          value={entry.mood}
          onChange={onChange}
        >
          <option key="none" value="">No Mood Selected</option>
          {moods.map((mood) => (
            <option key={mood.id} value={mood.mood}>
              {mood.mood}
            </option>
          ))}
        </select>
        <button type="submit">Submit Entry</button>
      </form>
    </div>
  );
}

export default EntryForm;
