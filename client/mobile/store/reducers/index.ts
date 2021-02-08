import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reviewReducer from './reviewReducer';
import eventReducer from './eventReducer';
import POIReducer from './POIReducer';
import allPOIReducer from './allPOIReducer';
import errorReducer from './errorReducer';
import { FrontierAction } from '../../interfaces/reducerInterfaces';

const appReducer = combineReducers({
  user: authReducer,
  review: reviewReducer,
  event: eventReducer,
  POI: POIReducer,
  allPOI: allPOIReducer,
  error: errorReducer,
});

const rootReducer = (state: any, action: FrontierAction<any>) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
