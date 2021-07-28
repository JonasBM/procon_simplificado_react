import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  UPDATE_USERPROFILE,
} from "../../actions/actionTypes";

import { IUserProfileSerializer } from "../../interfacesapi";

const initialState: IaccountsState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
  isLoading: false,
};

export interface IaccountsState {
  expiry?: Date;
  token: string | null;
  isAuthenticated?: boolean;
  user: IUserProfileSerializer | null;
  isLoading?: boolean;
}

type Action = {
  type: string;
  payload: IaccountsState;
};

export default function reducerAuth(
  state: IaccountsState = initialState,
  action: Action
): IaccountsState {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case UPDATE_USERPROFILE:
      let _user: IUserProfileSerializer | undefined = undefined;
      if (action.payload.user) {
        _user = action.payload.user;
      } else {
        _user = action.payload as unknown as IUserProfileSerializer;
      }
      return {
        ...state,
        user:
          state.user && _user
            ? state.user.id === _user.id
              ? _user
              : state.user
            : state.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.removeItem("token");
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...initialState,
        token: null,
      };
    default:
      return state;
  }
}
