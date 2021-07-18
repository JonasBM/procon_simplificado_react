import { CRUDAction } from "../generics";

export const SituacaoCRUDAction = new CRUDAction(
  "situacao",
  process.env.REACT_APP_API_URL + "api/situacao/"
);
