import axios from 'axios';
import { AppDispatch } from '../App';
import { GET_CURRENT_USER, REGISTER_USER, SET_ERROR } from './types';

const REACT_APP_SERVER_URI = 'http://localhost:5000';

export const registerUser = (
  email: string,
  password: string,
  confirmPassword: string,
  username: string,
  firstName: string,
  lastName: string,
) => async (dispatch: AppDispatch) => {
  const { data } = await axios.post(
    `${REACT_APP_SERVER_URI}/api/user/register/`,
    {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      username: username,
      firstName: firstName,
      lastName: lastName,
    },
  );

  dispatch({ type: REGISTER_USER, payload: data });
};
