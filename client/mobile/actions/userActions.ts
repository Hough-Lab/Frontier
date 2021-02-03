import { Dispatch } from 'react';
import axios from 'axios';
import { History } from 'history';

import { AppDispatch } from '../App';
import { GET_CURRENT_USER, SET_ERROR } from './types';

const REACT_APP_SERVER_URI = 'http://localhost:5000';

export const getCurrentUser = () => async (dispatch: AppDispatch) => {
  const { data } = await axios.get(`${REACT_APP_SERVER_URI}/api/user`, {
    withCredentials: true,
  });
  dispatch({ type: GET_CURRENT_USER, payload: data });
};

export const loginUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) =>
  // TODO pass history when resolving the other todo history: History<any>,
  async (dispatch: AppDispatch) => {
    try {
      const res = await axios.post(
        `${REACT_APP_SERVER_URI}/api/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch({ type: GET_CURRENT_USER, payload: res.data });

      // TODO push user to home page
      // history.push('/home')
    } catch (e) {
      dispatch({ type: SET_ERROR, payload: 'Incorrect username or password.' });
    }
  };

export const logoutUser = () =>
  // TODO when resolving other todo. Example: history: History<any>
  async (dispatch: AppDispatch) => {
    await axios.get(`${REACT_APP_SERVER_URI}/api/user/logout`, {
      withCredentials: true,
    });
    dispatch({ type: GET_CURRENT_USER, payload: null });
    // TODO push user to home page
    // history.push('/home')
  };
