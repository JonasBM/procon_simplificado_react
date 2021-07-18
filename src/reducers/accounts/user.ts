import { UserRetrieveUpdateAction } from "../../actions/accounts/user";
import { IUserProfileSerializer } from "../../interfacesapi";

const initialState = { username: "Usuário", is_active: false };

type Action = {
  type: string;
  payload: IUserProfileSerializer;
};

export default function user(
  state: IUserProfileSerializer = initialState,
  action: Action
): IUserProfileSerializer {
  switch (action.type) {
    case UserRetrieveUpdateAction.types.RETRIEVE:
      return action.payload;
    case UserRetrieveUpdateAction.types.UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
