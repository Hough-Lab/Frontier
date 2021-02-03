import { UPDATE_COORDS } from './types';

interface Coordinates {
  lat: number;
  lng: number;
}

export const updateCoords = (coordinates: Coordinates) => {
  return {
    type: UPDATE_COORDS,
    payload: coordinates,
  };
};

//Todo: Make sure this is the correct way to declare type of payload
