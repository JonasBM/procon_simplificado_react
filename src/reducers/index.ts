import { combineReducers } from "redux";

import accounts from "./accounts";
import errors from "./errors";
import messages from "./messages";
import { ProcessoCRUDAction } from "../actions/api/processo";
import { TipoDeSituacaoCRUDAction } from "../actions/api/tipoDeSituacao";
import { SituacaoCRUDAction } from "../actions/api/situacao";
export default combineReducers({
  accounts,
  errors,
  messages,
  processos: ProcessoCRUDAction.reducer,
  tiposdesituacoes: TipoDeSituacaoCRUDAction.reducer,
  situacoes: SituacaoCRUDAction.reducer,
});
