import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, FETCH_RECIPE } from './types';
import history from '../history';

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:5000/signup',
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:5000/signin',
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};

export const fetchRecipes = search => async dispatch => {
  const response = await axios.get(
    `https://api.edamam.com/search?q=${search}&app_id=f1af3ced&app_key=985c977317332a212646d9bd72b3f1ec`
  );

  dispatch({
    type: FETCH_RECIPE,
    payload: response.data
  });
  console.log(response)

  history.push(`/recipes/${search}`);
};
