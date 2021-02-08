import axios from 'axios';
import { AppDispatch } from '../../App';
import { Navigation } from '../../interfaces/interfaces';
import { GET_ALL_POI, GET_POI_BY_ID } from './types';
<<<<<<< HEAD
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip_address } from '../../config';
=======
const ip_address = 'localhost';
>>>>>>> 932aa21914ff581eff0a4b604b8063cc9eae3ad3

const REACT_APP_SERVER_URI = `http://${ip_address}:5000`;

export const getAllPOI = () => async (dispatch: AppDispatch) => {
  try {
<<<<<<< HEAD
    const token = await AsyncStorage.getItem('jwtToken');
=======
    const token = await localStorage.getItem('jwtToken');
>>>>>>> 932aa21914ff581eff0a4b604b8063cc9eae3ad3

    if (token) {
      const { data } = await axios.get(
        `${REACT_APP_SERVER_URI}/api/POI/getAllPOI/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.length > 0) {
        dispatch({ type: GET_ALL_POI, payload: data });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const getPOIById = (POIId: string, navigation: Navigation) => async (
  dispatch: AppDispatch,
) => {
  try {
<<<<<<< HEAD
    const token = await AsyncStorage.getItem('jwtToken');
=======
    const token = await localStorage.getItem('jwtToken');
>>>>>>> 932aa21914ff581eff0a4b604b8063cc9eae3ad3

    if (token) {
      const { data } = await axios.post(
        `${REACT_APP_SERVER_URI}/api/POI/getPOIById/${POIId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.formattedAddress) {
        dispatch({ type: GET_POI_BY_ID, payload: data });
        // TODO navigate to that POI
        // navigation.navigate('EventNavigator', {
        //   screen: 'DisplayEventScreen',
        // });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
