import axios from "axios";

import { AppDispatch } from "../../App";
import { LOGOUT_USER, GET_CURRENT_USER, SET_ERROR } from "./types";
import { Navigation } from "../../interfaces/interfaces";
const ip_address = "localhost";

const REACT_APP_SERVER_URI = `http://${ip_address}:5000`;

export const getCurrentUser = () => async (dispatch: AppDispatch) => {
  const { data } = await axios.get(`${REACT_APP_SERVER_URI}/api/user`, {
    withCredentials: true,
  });
  dispatch({ type: GET_CURRENT_USER, payload: data.user });
};

export const loginUser = (email: string, password: string) => async (
  dispatch: AppDispatch
) => {
  const { data } = await axios.post(
    `${REACT_APP_SERVER_URI}/api/user/login/`,
    {
      email,
      password,
    },
    { withCredentials: true }
  );
  dispatch({ type: GET_CURRENT_USER, payload: data.user });

  try {
    await localStorage.setItem("jwtToken", data.token);
  } catch (e) {
    console.log(e);
  }
  //TODO:
  // if (data.user.firstName) {
  //   navigation.navigate("MainStackNavigator", { screen: "HomeScreen" });
  // }

  // catch (e) {
  //   dispatch({ type: SET_ERROR, payload: "Incorrect username or password." });
  // }
};

export const logoutUser = (navigation: Navigation) => async (
  dispatch: AppDispatch
) => {
  await localStorage.removeItem("jwtToken");
  dispatch({ type: LOGOUT_USER, payload: null });
  navigation.navigate("LoginStackNavigator", {
    screen: "LoginScreen",
  });
};
