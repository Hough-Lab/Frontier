import axios from "axios";
import { AppDispatch } from "../../App";
import { Navigation } from "../../interfaces/interfaces";
import { GET_ALL_POI, GET_POI_BY_ID } from "./types";
const ip_address = "localhost";

const REACT_APP_SERVER_URI = `http://${ip_address}:5000`;

export const getAllPOI = () => async (dispatch: AppDispatch) => {
  try {
    const token = await localStorage.getItem("jwtToken");

    if (token) {
      const { data } = await axios.get(
        `${REACT_APP_SERVER_URI}/api/POI/getAllPOI/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.length > 0) {
        dispatch({ type: GET_ALL_POI, payload: data });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const getPOIById = (POIId: string) => async (dispatch: AppDispatch) => {
  try {
    const token = await localStorage.getItem("jwtToken");

    if (token) {
      const { data } = await axios.post(
        `${REACT_APP_SERVER_URI}/api/POI/getPOIById/${POIId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
