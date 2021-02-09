import axios from "axios";
import { AppDispatch } from "../../App";

import { GET_CURRENT_USER, REGISTER_USER, SET_ERROR } from "./types";

const ip_address = "localhost";

const REACT_APP_SERVER_URI = `http://${ip_address}:5000`;

export const registerUser = (
  email: string,
  password: string,
  confirmPassword: string,
  username: string,
  firstName: string,
  lastName: string
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
    { withCredentials: true }
  );
  dispatch({ type: REGISTER_USER, payload: data.user });
  try {
    await localStorage.setItem("jwtToken", data.token);
  } catch (e) {
    console.log(e);
  }

  // The axios request will return the registered user and the token. Only if the object 'user' returned by the server has a property 'email', meaning that it is a user
  // and not an error, it will take the user to the map screen

  //TODO:
  // if (data.user.email) {
  //   navigation.navigate('RegisterDOBScreen');
  // }
};
