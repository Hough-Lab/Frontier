import axios from 'axios';
import { AppDispatch } from '../../App';
import { Navigation } from '../../interfaces/interfaces';
import {
  CREATE_REVIEW,
  GET_CURRENT_REVIEW,
  EDIT_REVIEW,
  DELETE_REVIEW,
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REACT_APP_SERVER_URI = 'http://localhost:5000';

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
  tags: string[],
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
          tags: tags,
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

// TODO comment out when functional
// export const editReview = (
//   reviewId: string,
//   title: string,
//   description: string,
//   rating: number,
//   budgetLevel: number,
//   safetyRating: number,
//   safetyComment: string,
//   formattedAddress: string,
//   picture: File,
//   latitude: string,
//   longitude: string,
//   tags: string[],
//   navigation: Navigation,
// ) => async (dispatch: AppDispatch) => {
//   try {
//     const token = await AsyncStorage.getItem('jwtToken');

//     if (token) {
//       const { data } = await axios.put(
//         `${REACT_APP_SERVER_URI}/api/review/editReview/${reviewId}`,
//         {
//           title: title,
//           description: description,
//           rating: rating,
//           budgetLevel: budgetLevel,
//           safetyRating: safetyRating,
//           safetyComment: safetyComment,
//           picture: picture,
//           formattedAddress: formattedAddress,
//           latitude: latitude,
//           longitude: longitude,
//           tags: tags,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       dispatch({ type: EDIT_REVIEW, payload: data });

//       if (data.title) {
//         navigation.navigate('TipNavigator', {
//           screen: 'DisplayTipScreen',
//         });
//       }
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };

export const getCurrentReview = (reviewId: string) => async (
  dispatch: AppDispatch,
) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');

    if (token) {
      const { data } = await axios.get(
        `${REACT_APP_SERVER_URI}/api/review/getReviewById/${reviewId}`,
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

//TODO comment out when functional
// export const deleteReview = (reviewId: string) => async (
//   dispatch: AppDispatch,
// ) => {
//   try {
//     const token = await AsyncStorage.getItem('jwtToken');

//     if (token) {
//       const { data } = await axios.post(
//         `${REACT_APP_SERVER_URI}/api/review/deleteReview/${reviewId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       dispatch({ type: DELETE_REVIEW, payload: data });
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };
