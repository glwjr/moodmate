import axios from 'axios';

// eslint-disable-next-line default-param-last
const allEntries = (state = [], action) => {
  if (action.type === 'SET_ENTRIES' || action.type === 'REMOVE_ENTRY') {
    return action.allEntries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  if (action.type === 'ADD_ENTRY') {
    return [...state, action.entry].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
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

export const removeEntry = (entry) => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  const response = await axios.put('/api/entries/', entry, {
    headers: {
      authorization: token,
    },
  });
  dispatch({ type: 'REMOVE_ENTRY', allEntries: response.data });
};

export default allEntries;
