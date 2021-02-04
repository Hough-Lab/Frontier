import axios from 'axios';
import { AppDispatch } from '../../App';
import { Navigation } from '../../interfaces/interfaces';
import { CREATE_EVENT, GET_CURRENT_EVENT } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REACT_APP_SERVER_URI = 'http://localhost:5000';

export const createEvent = (
  title: string,
  formattedAddress: string,
  latitude: number,
  longitude: number,
  dateFrom: string,
  dateTo: string,
  description: string,
  maxCapacity: number,
  isPrivate: boolean,
  picture: File,
  tags: string[],
  navigation: Navigation,
) => async (dispatch: AppDispatch) => {
  try {
    // Get the token from the AsyncStorage
    const token = await AsyncStorage.getItem('jwtToken');

    if (token) {
      // The token must be sent to the server in the following format
      // Bearer ${token}
      // Because it is convention. The server will use the token to create the event including data about the user. If the token is in
      // the wrong format, the server will return 'Action not authorised'.

      const { data } = await axios.post(
        `${REACT_APP_SERVER_URI}/api/event/postEvent/`,
        {
          title: title,
          description: description,
          formattedAddress: formattedAddress,
          latitude: latitude,
          longitude: longitude,
          picture: picture,
          dateFrom: dateFrom,
          dateTo: dateTo,
          maxCapacity: maxCapacity,
          isPrivate: isPrivate,
          tags: tags,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch({ type: CREATE_EVENT, payload: data });

      // The axios request will return the event. Only if the object returned by the server has a property 'title', meaning that it is an event
      // and not an error, it will take the user to the event detail screen
      if (data.title) {
        navigation.navigate('EventNavigator', {
          screen: 'DisplayEventScreen',
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const getCurrentEvent = (
  eventId: string,
  navigation: Navigation,
) => async (dispatch: AppDispatch) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');

    if (token) {
      const { data } = await axios.post(
        `${REACT_APP_SERVER_URI}/api/event/getEventById/`,
        {
          eventId: eventId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch({ type: GET_CURRENT_EVENT, payload: data });

      // TODO clean, needed?
      // if (data.title) {
      //   navigation.navigate('EventNavigator', {
      //     screen: 'DisplayEventScreen',
      //   });
      // }
    }
  } catch (e) {
    console.log(e);
  }
};
