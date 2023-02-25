import axios from 'axios';

// eslint-disable-next-line default-param-last
const data = (state = [], action) => {
  if (action.type === 'SET_DATA') {
    return action.data;
  }
  return state;
};

export const fetchData = () => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  const response = await axios.get('/api/data', {
    headers: {
      authorization: token,
    },
  });
  dispatch({ type: 'SET_DATA', data: response.data });
};

export default data;
