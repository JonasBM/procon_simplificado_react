import { CREATE_MESSAGE, GET_ERRORS } from "./actionTypes";
import { ImessagesState } from "../reducers/messages";
import { IerrosState } from "../reducers/errors";

// CREATE MESSAGE
export const createMessage = (
  msg: ImessagesState | string
): { type: string; payload: ImessagesState } => {
  if (typeof msg === "string") {
    msg = { INFO: msg };
  }
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};

// RETURN ERRORS
export const returnErrors = (
  err: any
): { type: string; payload: IerrosState } => {
  let msg: any;
  let status: number;
  if (err.response) {
    msg = err.response.data;
    status = err.response.status;
  } else {
    msg = { undefined_error: [err] };
    status = 0;
  }
  return {
    type: GET_ERRORS,
    payload: { msg, status },
  };
};
