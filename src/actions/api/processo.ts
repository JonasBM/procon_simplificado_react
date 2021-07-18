import { CRUDAction } from "../generics";

export const ProcessoCRUDAction = new CRUDAction(
  "processo",
  process.env.REACT_APP_API_URL + "api/processo/",
  { paginated: true }
);
