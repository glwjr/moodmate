import axios from 'axios';

const entries = (state = [], action)=> {
  if (action.type === 'SET_ENTRIES') {
    return action.entries;
  }
  return state;
};

export const fetchEntries = () => {
  return async(dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.get('/api/entries', {
      headers: {
        authorization: token
      }
    });
    dispatch({ type: 'SET_ENTRIES', entries: response.data });
  };
};

export default entries;
