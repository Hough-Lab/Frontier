import { GET_ALL_POI } from '../actions/types';
import { FrontierAction, POIArray } from '../../interfaces/reducerInterfaces';

const initialState: POIArray = {
  POI: {
    pointOfInterestId: '',
    formattedAddress: '',
    latitude: 0,
    longitude: 0,
    createdAt: '',
    updatedAt: '',
  },
};

const reducer = (state = initialState, action: FrontierAction<POIArray>) => {
  switch (action.type) {
    case GET_ALL_POI:
      return action.payload || initialState;
    default:
      return state;
  }
};

export default reducer;
