import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../../store";
import { returnErrors, createMessage } from "../actionMessages";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
} from "../actionTypes";
import { tokenConfig } from "../actionUtils";

export interface IauthLogin {
  username: string;
  password: string;
}

//CHECK TOKEN & LOAD USER
export const tryLoadUser =
  () => (dispatch: Dispatch, getState: () => RootState) => {
    // User Loading
    let tokenHeader = tokenConfig(getState());
    if (tokenHeader != null) {
      dispatch({ type: USER_LOADING });
      return axios
        .get(process.env.REACT_APP_API_URL + "api/auth/login/", tokenHeader)
        .then((res) => {
          dispatch({
            type: USER_LOADED,
            payload: res.data,
          });
          return res.data;
        })
        .catch((err) => {
          dispatch(returnErrors(err));
          dispatch({
            type: AUTH_ERROR,
          });
        });
    } else {
      dispatch({ type: AUTH_ERROR });
    }
  };
// LOGIN USER
export const authLogin = (values: IauthLogin) => (dispatch: Dispatch) => {
  const config = {
    headers: {
      Authorization: `Basic ${btoa(values.username + ":" + values.password)}`,
    },
  };
  return axios
    .post(process.env.REACT_APP_API_URL + "api/auth/login/", null, config)
    .then((res) => {
      dispatch(createMessage({ SUCCESS: "Bem vindo!" }));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) => {
      dispatch(returnErrors(err));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};
// LOGOUT USER
export const authLogout =
  () => (dispatch: Dispatch, getState: () => RootState) => {
    let tokenHeader = tokenConfig(getState());
    console.log(tokenHeader);
    if (tokenHeader != null) {
      dispatch({ type: USER_LOADING });
      return axios
        .post(
          process.env.REACT_APP_API_URL + "api/auth/logout/",
          null,
          tokenHeader
        )
        .then((res) => {
          dispatch({
            type: LOGOUT_SUCCESS,
            payload: res.data,
          });
          return res;
        })
        .catch((err) => {
          dispatch(returnErrors(err));
          dispatch({
            type: AUTH_ERROR,
          });
        });
    } else {
      dispatch({ type: AUTH_ERROR });
    }
  };
