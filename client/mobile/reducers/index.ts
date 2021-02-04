import { combineReducers } from 'redux';
import authReducer from './reviewReducer';
import reviewReducer from './eventReducer';
import eventReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  user: authReducer,
  review: reviewReducer,
  event: eventReducer,
  error: errorReducer,
});
