import axios from 'axios';
import { AppDispatch } from '../../App';
import { Navigation } from '../../interfaces/interfaces';
import { GET_CURRENT_USER, REGISTER_USER, SET_ERROR } from './types';
import { ip_address } from '../../config';

const REACT_APP_SERVER_URI = `http://${ip_address}:5000`;

export const registerUser = (
  email: string,
  password: string,
  confirmPassword: string,
  username: string,
  firstName: string,
  lastName: string,
  navigation: Navigation,
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
    { withCredentials: true },
  );
  dispatch({ type: REGISTER_USER, payload: data.user });

  // The axios request will return the registered user and the token. Only if the object 'user' returned by the server has a property 'email', meaning that it is a user
  // and not an error, it will take the user to the map screen
  if (data.user.email) {
    navigation.navigate('RegisterDOBScreen');
  }
};
