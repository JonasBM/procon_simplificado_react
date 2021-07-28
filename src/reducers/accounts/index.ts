import { combineReducers } from "redux";

import reducerAuth from "./reducerAuth";
import {
  UserProfileCRUDAction,
  UserRetrieveUpdateAction,
} from "../../actions/accounts/user";

export default combineReducers({
  auth: reducerAuth,
  users: UserProfileCRUDAction.reducer,
  userslist: UserRetrieveUpdateAction.reducer,
});
