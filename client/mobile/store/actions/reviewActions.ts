import axios from 'axios';
import { AppDispatch } from '../../App';
import { Navigation } from '../../interfaces/interfaces';
import { CREATE_REVIEW, GET_CURRENT_REVIEW } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REACT_APP_SERVER_URI = 'http://localhost:5000';

export const createReview = (
  // TODO: Change
  title: string,
  description: string,
  navigation: Navigation,
) => async (dispatch: AppDispatch) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');

    if (token) {
      const { data } = await axios.post(
        `${REACT_APP_SERVER_URI}/api/review/create/`,
        {
          title: title,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch({ type: CREATE_REVIEW, payload: data });

      if (data.title) {
        navigation.navigate('TipNavigator', {
          screen: 'DisplayTipScreen',
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const getCurrentReview = (
  reviewId: string,
  // navigation: Navigation,
) => async (dispatch: AppDispatch) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');

    if (token) {
      const { data } = await axios.post(
        `${REACT_APP_SERVER_URI}/api/review/getReviewById/`,
        {
          reviewId: reviewId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch({ type: GET_CURRENT_REVIEW, payload: data });

      // TODO clean, needed?
      // if (data.title) {
      //   navigation.navigate('TipNavigator', {
      //     screen: 'DisplayTipScreen',
      //   });
      // }
    }
  } catch (e) {
    console.log(e);
  }
};
