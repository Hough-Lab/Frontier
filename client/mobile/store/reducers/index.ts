import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reviewReducer from './reviewReducer';
import eventReducer from './eventReducer';
// import POIReducer, from './POIReducer'
import errorReducer from './errorReducer';

export default combineReducers({
  user: authReducer,
  review: reviewReducer,
  event: eventReducer,
  // pointOfInterest: POIReducer,
  error: errorReducer,
});
