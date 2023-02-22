/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEntry } from '../store';

export default function EntryForm() {
  const dispatch = useDispatch();
  const [entry, setEntry] = useState({
    text: '',
    mood: '',
  });

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
        <button type="submit">Submit Entry</button>
      </form>
    </div>
  );
}
