import { GET_EVENTS_INTERESTED } from '../actions/types';
import { FrontierAction, Event } from '../../interfaces/reducerInterfaces';

const initialState: Event[] = [
  {
    eventId: '',
    dateFrom: '',
    dateTo: '',
    title: '',
    description: '',
    maxCapacity: 0,
    isPrivate: true,
    picture: '',
    pointOfInterestId: '',
    tags: [],
    attendees: [],
    possibleAttendees: [],
  },
];

const reducer = (state = initialState, action: FrontierAction<Event>) => {
  switch (action.type) {
    case GET_EVENTS_INTERESTED:
      return action.payload || initialState;
    default:
      return state;
  }
};

export default reducer;
