import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppDispatch } from '../../App';
import { LOGOUT_USER, GET_CURRENT_USER, SET_ERROR } from './types';
import { Navigation } from '../../interfaces/interfaces';
import { ip_address } from '../../config';

const REACT_APP_SERVER_URI = `http://${ip_address}:5000`;

interface EditProfileObject {
  username?: string;
  fistName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  dateOfBirth?: string;
  from?: string;
  language?: string[];
  userTags?: string[];
  profilePicture?: string;
}

export const getCurrentUser = () => async (dispatch: AppDispatch) => {
  const { data } = await axios.get(`${REACT_APP_SERVER_URI}/api/user`, {
    withCredentials: true,
  });
  dispatch({ type: GET_CURRENT_USER, payload: data.user });
};

export const editUserProfile = (editProfileObject: EditProfileObject) => async (
  dispatch: AppDispatch,
) => {
  const token = await AsyncStorage.getItem('jwtToken');

  if (token) {
    if (editProfileObject.profilePicture) {
      let pic = new FormData();
      // pic.append('file', infoObject.picture, infoObject.picture.fileName);

      // const { data } = await axios.post(
      //   `${REACT_APP_SERVER_URI}/api/user/editProfile/`,
      //   {
      //     infoObject,
      //   },
      //   {
      //     headers: {
      //       accept: 'application/json',
      //       'Accept-Language': 'en-US,en;q=0.8',
      //       'Content-Type': `multipart/form-data; boundary=${pic._boundary}`,

      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      // );
      // dispatch({ type: GET_CURRENT_USER, payload: data.user });
    } else {
      const { data } = await axios.post(
        `${REACT_APP_SERVER_URI}/api/user/editProfile/`,
        {
          editProfileObject,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch({ type: GET_CURRENT_USER, payload: data.user });
    }
  }
};

export const loginUser = (
  email: string,
  password: string,
  navigation: Navigation,
) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axios.post(
      `${REACT_APP_SERVER_URI}/api/user/login/`,
      {
        email,
        password,
      },
      { withCredentials: true },
    );
    dispatch({ type: GET_CURRENT_USER, payload: data.user });

    try {
      await AsyncStorage.setItem('jwtToken', data.token);
    } catch (e) {
      console.log(e);
    }

    if (data.user.firstName) {
      navigation.navigate('MainStackNavigator', { screen: 'HomeScreen' });
    }
  } catch (e) {
    dispatch({ type: SET_ERROR, payload: 'Incorrect username or password.' });
    return 'Incorrect username or password.';
  }
};

export const logoutUser = (navigation: Navigation) => async (
  dispatch: AppDispatch,
) => {
  await AsyncStorage.removeItem('jwtToken');
  dispatch({ type: LOGOUT_USER, payload: null });
  navigation.navigate('LoginStackNavigator', {
    screen: 'LoginScreen',
  });
};
