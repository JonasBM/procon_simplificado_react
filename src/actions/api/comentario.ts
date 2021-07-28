import { CRUDAction } from "../generics";

export const ComentarioCRUDAction = new CRUDAction(
  "comentario",
  process.env.REACT_APP_API_URL + "api/comentario/"
);
