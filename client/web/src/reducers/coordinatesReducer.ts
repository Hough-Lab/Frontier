import { Reducer } from 'redux';

interface CoordinateAction {
  type: string;
  payload: Coordinates;
}

interface Coordinates {
  lat: number;
  lng: number;
}

const initialPosition = { lat: 48.856613, lng: 2.352222 };

export const coordinatesReducer: Reducer<Coordinates, CoordinateAction> = (
  state = initialPosition,
  action: CoordinateAction,
) => {
  switch (action.type) {
    case 'UPDATE_COORDS':
      return action.payload;
    default:
      return state;
  }
};
