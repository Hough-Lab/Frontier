import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import { coordinatesReducer } from './coordinatesReducer';

export const rootReducer = combineReducers({
  user: authReducer,
  error: errorReducer,
  coordinates: coordinatesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
