import axios from 'axios';

const moods = (state = [], action) => {
  if (action.type === 'SET_MOODS') {
    return action.moods;
  }
  if (action.type === 'ADD_MOOD') {
    return [...state, action.mood];
  }
  return state;
};

export const fetchMoods = () => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  const response = await axios.get('/api/moods', {
    headers: {
      authorization: token,
    },
  });
  dispatch({ type: 'SET_MOODS', moods: response.data });
};

export const addMood = (mood) => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  const response = await axios.post('/api/moods', mood, {
    headers: {
      authorization: token,
    },
  });
  dispatch({ type: 'ADD_MOOD', mood: response.data });
};

export default moods;
