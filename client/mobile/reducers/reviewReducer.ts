import { GET_CURRENT_REVIEW, CREATE_REVIEW } from '../actions/types';
import { FrontierAction, Review } from '../interfaces/reducerInterfaces';

const initialState: Review = {
  reviewId: '',
  createdAt: '',
  budgetLevel: 0,
  title: '',
  description: '',
  rating: 0,
  safetyRating: 0,
  safetyComment: '',
  picture: '',
  pointOfInterest: {
    formattedAddress: '',
    latitude: '',
    longitude: '',
  },
  tags: [],
};

const reducer = (state = initialState, action: FrontierAction<Review>) => {
  switch (action.type) {
    case GET_CURRENT_REVIEW:
      return action.payload || initialState;
    case CREATE_REVIEW:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
