import { Dispatch } from "redux";
import { RootState } from "../../store";
import { CRUDAction } from "../generics";
import { formatData, tokenConfig } from "../actionUtils";
import axios from "axios";
import { returnErrors } from "../actionMessages";

export const TipoDeSituacaoCRUDAction = new CRUDAction(
  "tipodesituacao",
  process.env.REACT_APP_API_URL + "api/tipodesituacao/"
);

export const ChangeTipoDeSituacaoOrdemAction =
  (object: {
    tipo_de_situacao_id: number;
    ordem_anterior: number;
    ordem_nova: number;
  }) =>
  (dispatch: Dispatch, getState: () => RootState) => {
    let header = { "Content-Type": "application/json" };

    let headerWithValues = Object.assign(
      {},
      { params: formatData(object, header) },
      tokenConfig(getState(), header)
    );

    return axios
      .get(
        process.env.REACT_APP_API_URL + "api/changetipodesituacaoordem/",
        headerWithValues
      )
      .then((res) => {
        dispatch({
          type: "LIST_TIPODESITUACAO",
          payload: res.data,
        });
        return res.data;
      })
      .catch((err) => {
        dispatch(returnErrors(err));
      });
  };
