import { GET_CURRENT_USER } from '../actions/types';
import { FrontierAction, User } from '../interfaces/reducerInterfaces';

const initialState: User = {
  userId: '',
  isBusiness: false,
  username: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  language: '',
  from: '',
  lastSeen: '',
  profilePicture: '',
  email: '',
  verifications: 0,
  certified: false,
};

const reducer = (state = initialState, action: FrontierAction<User>) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.payload || initialState;
    case REGISTER_STUDENT:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
