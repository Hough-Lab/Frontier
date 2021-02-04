import { GET_CURRENT_EVENT, CREATE_EVENT } from '../actions/types';
import { FrontierAction, Event } from '../../interfaces/reducerInterfaces';

const initialState: Event = {
  eventId: '',
  dateFrom: new Date(),
  dateTo: new Date(),
  title: '',
  description: '',
  maxCapacity: 10,
  isPrivate: true,
  picture: '',
  pointOfInterest: {
    formattedAddress: '',
    latitude: 0,
    longitude: 0,
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
