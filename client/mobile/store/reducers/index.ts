import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reviewReducer from './reviewReducer';
import eventReducer from './eventReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  user: authReducer,
  review: reviewReducer,
  event: eventReducer,
  error: errorReducer,
});
