/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEntries } from '../store';
import EntryForm from './EntryForm';

function Entries() {
  const dispatch = useDispatch();
  const { entries } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchEntries());
  }, []);

  return (
    <>
      {/* <pre>
        {JSON.stringify(entries, null, 2)}
      </pre> */}
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            {entry.text}
            <ul>
              <li>
                Mood:
                {' '}
                {entry.mood}
              </li>
            </ul>
          </li>
        ))}
      </ul>
      <EntryForm />
    </>
  );
}

export default Entries;
