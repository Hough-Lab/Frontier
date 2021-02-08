import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const REACT_APP_SERVER_URI = `http://${ip_address}:5000`;
import { ip_address } from '../config';

export const markAsInterested = async (eventId: string) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');

    if (token) {
      const { data } = await axios.put(
        `${REACT_APP_SERVER_URI}/api/event/markAsInterested/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }
  } catch (e) {
    console.log(e);
  }
};

export const markAsGoing = async (eventId: string) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');

    if (token) {
      const { data } = await axios.put(
        `${REACT_APP_SERVER_URI}/api/event/markAsGoing/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }
  } catch (e) {
    console.log(e);
  }
};

export const likeReview = async (reviewId: string) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');

    if (token) {
      const { data } = await axios.put(
        `${REACT_APP_SERVER_URI}/api/review/likeReview/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }
  } catch (e) {
    console.log(e);
  }
};

export const dislikeReview = async (reviewId: string) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');

    if (token) {
      const { data } = await axios.put(
        `${REACT_APP_SERVER_URI}/api/review/dislikeReview/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }
  } catch (e) {
    console.log(e);
  }
};
