import { ReadOnlyAction, CRUDAction, UpdateAction } from "../generics";

export const UserRetrieveUpdateAction = new ReadOnlyAction(
  "user",
  process.env.REACT_APP_API_URL + "api/user/"
);

export const UserProfileCRUDAction = new CRUDAction(
  "userprofile",
  process.env.REACT_APP_API_URL + "api/userprofile/"
);

export const ChangePasswordUpdateAction = new UpdateAction(
  "changepassword",
  process.env.REACT_APP_API_URL + "api/changepassword/"
);
