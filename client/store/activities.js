import axios from 'axios';

// eslint-disable-next-line default-param-last
const activities = (state = [], action) => {
  if (action.type === 'SET_ACTIVITIES') {
    return action.activities;
  }
  if (action.type === 'ADD_ACTIVITY') {
    return [...state, action.activity];
  }
  return state;
};

export const fetchActivities = () => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  const response = await axios.get('/api/activities', {
    headers: {
      authorization: token,
    },
  });
  dispatch({ type: 'SET_ACTIVITIES', activities: response.data });
};

export const addActivity = (activity) => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  const response = await axios.post('/api/activities', activity, {
    headers: {
      authorization: token,
    },
  });
  dispatch({ type: 'ADD_ACTIVITY', activity: response.data });
};

export default activities;
