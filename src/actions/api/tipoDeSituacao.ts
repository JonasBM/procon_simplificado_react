import { CRUDAction } from "../generics";

export const TipoDeSituacaoCRUDAction = new CRUDAction(
  "tipodesituacao",
  process.env.REACT_APP_API_URL + "api/tipodesituacao/"
);
