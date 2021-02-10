import { GET_POI_BY_ID } from '../actions/types';
import { FrontierAction, POI } from '../../interfaces/reducerInterfaces';

const initialState: POI = {
  formattedAddress: '',
  pointOfInterestId: '',
  latitude: 0,
  longitude: 0,
  createdAt: '',
  updatedAt: '',
  events: [],
  reviews: [],
};

const reducer = (state = initialState, action: FrontierAction<POI>) => {
  switch (action.type) {
    case GET_POI_BY_ID:
      return { ...action.payload } || initialState;
    default:
      return state;
  }
};

export default reducer;
