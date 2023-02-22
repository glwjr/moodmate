import axios from 'axios';

const allEntries = (state = [], action) => {
  if (action.type === 'SET_ENTRIES') {
    return action.allEntries;
  }
  if (action.type === 'ADD_ENTRY') {
    return [...state, action.entry];
  }
  return state;
};

export const fetchEntries = () => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  const response = await axios.get('/api/entries', {
    headers: {
      authorization: token,
    },
  });
  dispatch({ type: 'SET_ENTRIES', allEntries: response.data });
};

export const addEntry = (entry) => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  const response = await axios.post('/api/entries', entry, {
    headers: {
      authorization: token,
    },
  });
  dispatch({ type: 'ADD_ENTRY', entry: response.data });
};

export default allEntries;
