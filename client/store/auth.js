/* eslint-disable consistent-return */
import axios from 'axios';
import history from '../history';

// eslint-disable-next-line default-param-last
const auth = (state = {}, action) => {
  if (action.type === 'SET_AUTH') {
    return action.auth;
  }
  return state;
};

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch({ type: 'SET_AUTH', auth: res.data });
  }
};

export const login = (username, password) => async (dispatch) => {
  try {
    const res = await axios.post('/auth/login', { username, password });
    window.localStorage.setItem('token', res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch({ type: 'SET_AUTH', auth: { error: { ...authError, displayedMessage: 'Error logging in. Please double-check your credentials.' } } });
  }
};

export const signUp = (username, password, firstName, lastName) => async (dispatch) => {
  try {
    const res = await axios.post('/auth/signup', {
      username, password, firstName, lastName,
    });
    window.localStorage.setItem('token', res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch({ type: 'SET_AUTH', auth: { error: { ...authError, displayedMessage: 'Error signing up. Please double-check your inputs.' } } });
  }
};

export const logout = () => {
  window.localStorage.removeItem('token');
  history.push('/login');
  return {
    type: 'SET_AUTH',
    auth: {},
  };
};

export default auth;
