import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppDispatch } from '../../App';
import { GET_EVENTS_ATTENDING, GET_EVENTS_INTERESTED } from './types';
import { ip_address } from '../../config';

const REACT_APP_SERVER_URI = `http://${ip_address}:5000`;

export const getEventsInterested = () => async (dispatch: AppDispatch) => {
  const token = await AsyncStorage.getItem('jwtToken');

  const { data } = await axios.get(
    `${REACT_APP_SERVER_URI}/api/user/getInterestedEventsByUserId`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  dispatch({ type: GET_EVENTS_INTERESTED, payload: data });
};
