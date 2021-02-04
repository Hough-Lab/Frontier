import { GET_CURRENT_EVENT, CREATE_EVENT } from '../actions/types';
import { FrontierAction, Event } from '../interfaces/reducerInterfaces';

const initialState: Event = {
  eventId: '',
  dateFrom: '',
  dateTo: '',
  title: '',
  description: '',
  maxCapacity: 0,
  isPrivate: true,
  picture: '',
  pointOfInterest: {
    formattedAddress: '',
    latitude: '',
    longitude: '',
  },
  tags: [],
};

const reducer = (state = initialState, action: FrontierAction<Event>) => {
  switch (action.type) {
    case GET_CURRENT_EVENT:
      return action.payload || initialState;
    case CREATE_EVENT:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
