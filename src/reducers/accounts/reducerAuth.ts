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

interface IaccountsState {
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
      return {
        ...state,
        user:
          state.user && action.payload.user
            ? state.user.id === action.payload.user.id
              ? action.payload.user
              : state.user
            : null,
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
