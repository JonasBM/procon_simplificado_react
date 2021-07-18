import React, { Fragment } from "react";
import { useEffect } from "react";
import { Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { ProcessoCRUDAction } from "../../actions/api/processo";
import { TipoDeSituacaoCRUDAction } from "../../actions/api/tipoDeSituacao";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  IProcessoSerializer,
  ITipo_de_situacaoSerializer,
} from "../../interfacesapi";
import { useQuery } from "../../hooks";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { AppDispatch } from "../../store";

type IStateProcessoSerializer = {
  count: number;
  next: string | null;
  previous: string | null;
  results: IProcessoSerializer[];
};

const Processos = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const history = useHistory();
  const processos = useAppSelector(
    (state) => state.processos
  ) as IStateProcessoSerializer;
  const tiposDeSituacoes = useAppSelector(
    (state) => state.processos
  ) as ITipo_de_situacaoSerializer[];

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [pageMax, setPageMax] = useState(1);

  useEffect(() => {
    let parsedPage = 1;
    let querypage = query.get("page");
    if (querypage != null) {
      parsedPage = parseInt(querypage);
      if (!isNaN(parsedPage) && parsedPage > 0) {
        setPage(parsedPage);
      }
    }
  }, [query]);

  useEffect(() => {
    dispatch(ProcessoCRUDAction.list({ page: page }));
  }, [dispatch, page]);

  useEffect(() => {
    let teste = dispatch(TipoDeSituacaoCRUDAction.list(null, false));
    if (teste instanceof Promise) {
      teste.then((res) => {
        console.log(res);
      });
    }
  }, [dispatch]);

  useEffect(() => {
    setPageMax(Math.ceil(processos.count / pageSize));
  }, [pageSize, processos.count]);

  return (
    <div className="container">
      <nav className="mt-5">
        <ul className="pagination">
          <li
            className={"page-item border-end" + (page === 1 ? " disabled" : "")}
          >
            <button
              className="page-link"
              onClick={() => {
                setPage(page - 1);
                history.push("processos?page=" + (page - 1).toString());
              }}
            >
              Previous
            </button>
          </li>
          {[...Array(pageMax)].map((e, i) => {
            let thispage = i + 1;
            return (
              <li
                className={
                  "page-item border-end" + (page === thispage ? " active" : "")
                }
                key={thispage}
              >
                <button
                  className="page-link"
                  onClick={() => {
                    setPage(thispage);
                    history.push("processos?page=" + thispage.toString());
                  }}
                >
                  {thispage}
                </button>
              </li>
            );
          })}
          <li className={"page-item" + (page === pageMax ? " disabled" : "")}>
            <button
              className="page-link"
              onClick={() => {
                setPage(page + 1);
                history.push("processos?page=" + (page + 1).toString());
              }}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      <table className="table table-dark table-striped table-hover table-sm mt-1">
        <caption className="bg-light text-center text-uppercase fs-4 fw-bold text-dark">
          Processos
        </caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Protocolo</th>
            <th scope="col">Auto de Infração</th>
            <th scope="col">Reclamante</th>
            <th scope="col">Reclamada</th>
            <th scope="col">CPF/CNPJ</th>
            <th scope="col">Ficha de Atendimento</th>
            <th scope="col">Situação</th>
          </tr>
        </thead>
        <tbody>
          {processos.results.map((processo, index) => (
            <tr key={processo.id}>
              <td>{processo.id}</td>
              <td>{processo.identificacao}</td>
              <td>{processo.auto_infracao}</td>
              <td>{processo.reclamante}</td>
              <td>{processo.reclamada}</td>
              <td>{processo.cpf_cnpj}</td>
              <td>{processo.ficha_de_atendimento}</td>
              <td>
                {processo.ultima_situacao && processo.ultima_situacao.data}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Processos;
