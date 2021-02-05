import axios from 'axios';
import { AppDispatch } from '../../App';
import { Navigation } from '../../interfaces/interfaces';
import { CREATE_REVIEW, GET_CURRENT_REVIEW } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip_address } from '../../config';

const REACT_APP_SERVER_URI = `http://${ip_address}:5000`;

export const createReview = (
  title: string,
  description: string,
  rating: number,
  budgetLevel: number,
  safetyRating: number,
  safetyComment: string,
  formattedAddress: string,
  picture: File,
  latitude: string,
  longitude: string,
  navigation: Navigation,
) => async (dispatch: AppDispatch) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');

    if (token) {
      const { data } = await axios.post(
        `${REACT_APP_SERVER_URI}/api/review/postReview/`,
        {
          title: title,
          description: description,
          rating: rating,
          budgetLevel: budgetLevel,
          safetyRating: safetyRating,
          safetyComment: safetyComment,
          picture: picture,
          formattedAddress: formattedAddress,
          latitude: latitude,
          longitude: longitude,
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

export const getCurrentReview = (reviewId: string) => async (
  dispatch: AppDispatch,
) => {
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
    }
  } catch (e) {
    console.log(e);
  }
};
