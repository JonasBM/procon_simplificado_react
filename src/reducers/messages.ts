import { CREATE_MESSAGE } from "../actions/actionTypes";

const initialState = {};

export interface ImessagesState {
  CRUDcreate?: string;
  CRUDread?: string;
  CRUDupdate?: string;
  CRUDdelete?: string;
  ERROR?: string;
  INFO?: string;
  SUCCESS?: string;
}

type Action = {
  type: string;
  payload: ImessagesState;
};

export default function messages(
  state: ImessagesState = initialState,
  action: Action
) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
}
