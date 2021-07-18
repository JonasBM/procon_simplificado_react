import axios from "axios";
import { returnErrors } from "./actionMessages";
import { formatData, tokenConfig } from "../actions/actionUtils";
import { createMessage } from "./actionMessages";
import { Dispatch, Action } from "redux";
import { RootState } from "../store";
import { ThunkAction } from "redux-thunk";

export type AppThunk = ThunkAction<any, RootState, null, Action<any>>;

var nomes: string[] = [];

export class actionCRUD {
  nome: string;
  url: string;
  types: {
    CREATE: string;
    READ: string;
    READ_OPTIONS: string;
    UPDATE: string;
    DELETE: string;
  };
  header: { [key: string]: string };

  constructor(
    nome: string,
    url: string,
    header = { "Content-Type": "application/json" }
  ) {
    if (nomes.includes(nome)) {
      throw new Error('nome: "' + nome + '" já existe, o nome deve ser unico.');
    } else {
      nomes.push(nome);
      this.nome = nome;
      this.url = url;
    }
    this.types = {
      CREATE: "CREATE_" + this.nome.toUpperCase(),
      READ: "READ_" + this.nome.toUpperCase(),
      READ_OPTIONS: "READ_OPTIONS" + this.nome.toUpperCase(),
      UPDATE: "UPDATE_" + this.nome.toUpperCase(),
      DELETE: "DELETE_" + this.nome.toUpperCase(),
    };
    this.header = header;
  }

  // CREATE
  create = (objeto: any) => (dispatch: Dispatch, getState: () => RootState) => {
    axios
      .post(
        this.url,
        formatData(objeto, this.header),
        tokenConfig(getState(), this.header)
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: this.types.CREATE,
          payload: res.data,
        });
        dispatch(createMessage({ CRUDcreate: "Criado com sucesso" }));
      })
      .catch((err) => {
        dispatch(returnErrors(err));
      });
  };

  // READ
  read = (objeto: any) => (
    dispatch: Dispatch,
    getState: () => RootState
  ): void => {
    let headerWithValues = Object.assign(
      {},
      { params: formatData(objeto, this.header) },
      tokenConfig(getState(), this.header)
    );
    axios
      .get(this.url, headerWithValues)
      .then((res) => {
        console.log(res);
        dispatch({
          type: this.types.READ,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err));
      });
  };

  // READ_OPTIONS
  readOptions = () => (dispatch: Dispatch, getState: () => RootState): void => {
    axios
      .options(this.url, tokenConfig(getState(), this.header))
      .then((res) => {
        console.log(res);
        dispatch({
          type: this.types.READ_OPTIONS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err));
      });
  };

  // UPDATE
  update = (objeto: any) => (
    dispatch: Dispatch,
    getState: () => RootState
  ): void => {
    axios
      .patch(
        this.url + objeto.id + "/",
        formatData(objeto, this.header),
        tokenConfig(getState(), this.header)
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: this.types.UPDATE,
          payload: res.data,
        });
        dispatch(createMessage({ CRUDupdate: "Atualizado com sucesso" }));
      })
      .catch((err) => {
        dispatch(returnErrors(err));
      });
  };

  //DELETE
  delete = (id: number) => (
    dispatch: Dispatch,
    getState: () => RootState
  ): void => {
    axios
      .delete(this.url + id + "/", tokenConfig(getState(), this.header))
      .then((res) => {
        console.log(res);
        dispatch({
          type: this.types.DELETE,
          payload: id,
        });
        dispatch(createMessage({ CRUDdelete: "Deletado com sucesso" }));
      })
      .catch((err) => {
        dispatch(returnErrors(err));
      });
  };

  //HEAD
  head = (id: number) => (
    dispatch: Dispatch,
    getState: () => RootState
  ): void => {
    axios
      .head(this.url, tokenConfig(getState(), this.header))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        dispatch(returnErrors(err));
      });
  };
}
