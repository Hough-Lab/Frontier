import { combineReducers } from "redux";
import authReducer from "./authReducer";
import reviewReducer from "./reviewReducer";
import eventReducer from "./eventReducer";
import allPOIReducer from "./allPOIReducer";
import errorReducer from "./errorReducer";
import POIReducer from "./POIReducer";
import { FrontierAction } from "../../interfaces/reducerInterfaces";

const appReducer = combineReducers({
  user: authReducer,
  review: reviewReducer,
  event: eventReducer,
  allPOI: allPOIReducer,
  error: errorReducer,
  POI: POIReducer,
});

const rootReducer = (state: any, action: FrontierAction<any>) => {
  if (action.type === "LOGOUT_USER") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
