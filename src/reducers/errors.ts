import { GET_ERRORS } from "../actions/actionTypes";

export interface IerrosState {
  msg: any;
  status: number | null;
}

const initialState = {
  msg: {},
  status: null,
};

type Action = {
  type: string;
  payload: IerrosState;
};

export default function errors(
  state: IerrosState = initialState,
  action: Action
) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
      };
    default:
      return state;
  }
}
