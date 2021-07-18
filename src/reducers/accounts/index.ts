import { combineReducers } from "redux";
import user from "./user";

import reducerAuth from "./reducerAuth";

export default combineReducers({
  auth: reducerAuth,
  user: user,
});
