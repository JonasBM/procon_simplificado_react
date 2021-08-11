import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ProcessoCRUDAction } from "../../../actions/api/processo";
import { TipoDeSituacaoCRUDAction } from "../../../actions/api/tipoDeSituacao";
import { useAppSelector } from "../../../hooks";
import {
  IProcessoSerializer,
  ITipo_de_situacaoSerializer,
} from "../../../interfacesapi";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import NavegacaoPaginas from "./NavegacaoPaginas";
import { getTipoDeSituacaoBySituacao } from "../../../utils";
import { useLayoutEffect } from "react";
import { destroyProcesso } from "../processo";
import FiltroProcesso from "./FiltroProcesso";
import store from "../../../store";
import { ActionPayload } from "../../../actions/generics/mixins";

const moment = require("moment");

const queryString = require("query-string");

type IStateProcessoSerializer = {
  count: number;
  next: string | null;
  previous: string | null;
  results: IProcessoSerializer[];
};

export const updateList = (
  page: number | undefined,
  searchParams: object | undefined
) => {
  if (page && page > 0) {
    let paramsValues = { page: page };
    if (searchParams) {
      paramsValues = {
        ...paramsValues,
        ...searchParams,
      };
    }
    store.dispatch(
      ProcessoCRUDAction.list(paramsValues) as unknown as ActionPayload
    );
    // dispatch(ProcessoCRUDAction.list({ page: listProcessosPage }));
  }
};

const Processos = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const processos = useAppSelector(
    (state) => (state.processos as IStateProcessoSerializer).results
  ) as IProcessoSerializer[];

  const processosCount = useAppSelector(
    (state) => (state.processos as IStateProcessoSerializer).count
  ) as number;

  const [searchParams, setSearchParams] = useState<object>();

  const [page, setPage] = useState(0);
  const [pageSize] = useState(5);
  const [pageMax, setPageMax] = useState(1);

  useLayoutEffect(() => {
    const parsed = queryString.parse(location.search);
    let parsedPage = 1;
    if (parsed.page) {
      parsedPage = parseInt(parsed.page);
      delete parsed.page;
      if (!isNaN(parsedPage) && parsedPage > 0) {
        setPage(parsedPage);
      }
    } else {
      setPage(1);
    }
    if (parsed) {
      setSearchParams(parsed);
    }
  }, [location.search]);

  useEffect(() => {
    if (page > 0) {
      (
        dispatch(
          TipoDeSituacaoCRUDAction.list()
        ) as unknown as Promise<ITipo_de_situacaoSerializer>
      ).then(() => {
        let paramsValues = { page: page };
        if (searchParams) {
          paramsValues = { ...paramsValues, ...searchParams };
        }
        (
          dispatch(
            ProcessoCRUDAction.list(paramsValues)
          ) as unknown as Promise<IProcessoSerializer>
        ).catch((err) => {
          if (err.response && err.response.status === 404) {
            history.push(
              "processos?page=" +
                (page - 1).toString() +
                queryString.stringify(searchParams)
            );
          }
        });
      });
    }
  }, [dispatch, history, page, searchParams]);

  useEffect(() => {
    setPageMax(Math.ceil(processosCount / pageSize));
  }, [pageSize, processosCount]);

  let ultima_situacao_tipo;

  return (
    <div className="container mt-5">
      <FiltroProcesso searchParams={searchParams} />
      <button
        className="btn btn-primary"
        type="button"
        title="Criar Processo"
        onClick={() => {
          history.push("/processos/processo/");
        }}
      >
        Adicionar <i className="bi bi-plus-lg ms-1"></i>
      </button>

      <table className="table table-dark table-striped table-hover table-sm mt-1">
        <caption className="bg-light text-center text-uppercase fs-4 fw-bold text-dark">
          Processos
        </caption>
        <thead>
          <tr>
            <th scope="col">Protocolo</th>
            <th scope="col">Auto de Infração</th>
            <th scope="col">Reclamante</th>
            <th scope="col">Reclamada</th>
            <th scope="col">CPF/CNPJ</th>
            <th scope="col">Ficha de Atendimento</th>
            <th scope="col">Local</th>
            <th scope="col">Data</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {processos &&
            processos.map((processo, index) => (
              <tr key={processo.id}>
                <td>{processo.identificacao}</td>
                <td>{processo.auto_infracao}</td>
                <td>{processo.reclamante}</td>
                <td>{processo.reclamada}</td>
                <td>{processo.cpf_cnpj}</td>
                <td>{processo.ficha_de_atendimento}</td>
                <td>
                  <span
                    title={
                      processo.ultima_situacao &&
                      processo.ultima_situacao.comentario
                        ? processo.ultima_situacao.comentario
                        : ""
                    }
                  >
                    {processo.ultima_situacao &&
                    (ultima_situacao_tipo = getTipoDeSituacaoBySituacao(
                      processo.ultima_situacao
                    ))
                      ? ultima_situacao_tipo.nome
                      : "Sem registro"}
                  </span>
                  <button
                    type="button"
                    className="btn btn-outline-info border-0 btn-sm float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#ModalFormSituacao"
                    data-situacao_id={0}
                    data-processo_id={processo.id}
                    data-listprocessos_page={page}
                    data-listprocessos_search_params={queryString.stringify(
                      searchParams
                    )}
                    title="Alterar Local"
                  >
                    <i className="bi bi-forward"></i>
                  </button>
                </td>
                <td>
                  {processo.ultima_situacao &&
                    moment(processo.ultima_situacao.data).format("DD/MM/YYYY")}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-warning border-0 btn-sm"
                    onClick={() => {
                      history.push("/processos/processo/?id=" + processo.id);
                    }}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger border-0 btn-sm"
                    onClick={() => {
                      let destroyPromise = destroyProcesso(processo);
                      if (destroyPromise) {
                        destroyPromise.then(() => {
                          let paramsValues = { page: page };
                          if (searchParams) {
                            paramsValues = { ...paramsValues, ...searchParams };
                          }
                          dispatch(ProcessoCRUDAction.list(paramsValues));
                        });
                      }
                    }}
                    title="Excluir Processo"
                  >
                    <i className="bi bi-x-square"></i>
                  </button>
                </td>
              </tr>
            ))}
          {[...Array(pageSize - processos.length)].map((e, i) => (
            <tr key={i + "complemento"}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-danger border-0 btn-sm"
                  title="Criar Processo"
                  onClick={() => {
                    history.push("/processos/processo/");
                  }}
                >
                  <i className="bi bi-plus-lg"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <NavegacaoPaginas
        page={page}
        setPage={setPage}
        pageMax={pageMax}
        searchParams={queryString.stringify(searchParams)}
      />
    </div>
  );
};

export default Processos;
