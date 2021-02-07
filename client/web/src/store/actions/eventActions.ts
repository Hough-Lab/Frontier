import axios from "axios";
import { AppDispatch } from "../../App";
import { CREATE_EVENT, GET_ALL_POI, GET_CURRENT_EVENT } from "./types";
const ip_address = "localhost";

const REACT_APP_SERVER_URI = `http://${ip_address}:5000`;

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
  picture: string,
  tags: string[]
) => async (dispatch: AppDispatch) => {
  try {
    const token = await localStorage.getItem("jwtToken");

    if (true) {
      console.log("sexyTimes"); // Get the token from the localStorage
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
        }
      );
      dispatch({ type: CREATE_EVENT, payload: data });

      // The axios request will return the event. Only if the object returned by the server has a property 'title', meaning that it is an event
      // and not an error, it will take the user to the event detail screen

      //TODO: Refactor actions using navigation.navigate to use react router
      //   if (data.title) {
      //     navigation.navigate('EventNavigator', {
      //       screen: 'DisplayEventScreen',
      //     });
      //   }
    }
  } catch (e) {
    console.log(e);
  }
};

export const getCurrentEvent = (eventId: string) => async (
  dispatch: AppDispatch
) => {
  try {
    const token = await localStorage.getItem("jwtToken");

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
        }
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
