import { GET_POI_BY_ID } from '../actions/types';
import { FrontierAction, POIData } from '../../interfaces/reducerInterfaces';

const initialState: POIData = {
  formattedAddress: '',
  pointOfInterestId: '',
  events: [],
  reviews: [],
};

const reducer = (state = initialState, action: FrontierAction<POIData>) => {
  switch (action.type) {
    case GET_POI_BY_ID:
      return action.payload || initialState;
    default:
      return state;
  }
};

export default reducer;
