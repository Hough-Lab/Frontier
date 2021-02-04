import { FrontierAction } from '../../interfaces/reducerInterfaces';
import { SET_ERROR, CLEAR_ERROR } from '../actions/types';

const reducer = (state = '', action: FrontierAction<string>) => {
  switch (action.type) {
    case SET_ERROR:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
