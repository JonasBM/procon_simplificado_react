import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SituacaoCRUDAction } from "../../../actions/api/situacao";
import { useAppSelector } from "../../../hooks";
import { ISituacaoSerializer } from "../../../interfacesapi";
import { getTipoDeSituacaoBySituacao } from "../../../utils";
import { destroySituacao } from "../../Modals/ModalFormSituação";

const moment = require("moment");

const ListaSituacoes = ({ processoID = 0 }: { processoID?: number }) => {
  const dispatch = useDispatch();
  const situacoes = useAppSelector(
    (state) => state.situacoes
  ) as ISituacaoSerializer[];

  useEffect(() => {
    if (processoID && processoID !== 0) {
      dispatch(SituacaoCRUDAction.list({ processo_id: processoID }));
    }
  }, [dispatch, processoID]);

  let tipo_de_situacao;

  return (
    <div className="container">
      <button
        data-bs-toggle="modal"
        data-bs-target="#ModalFormSituacao"
        data-situacao_id={0}
        data-processo_id={processoID}
        className="btn btn-primary"
        type="button"
        title="Criar Situação"
      >
        Nova Situação <i className="bi bi-plus-lg ms-1"></i>
      </button>

      <table className="table table-dark table-striped table-hover table-sm mt-1 table-fixed-layout">
        <thead>
          <tr>
            <th scope="col">tipo_de_situacao</th>
            <th scope="col">data</th>
            <th scope="col">Comentario</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {situacoes
            .filter((situacao) => situacao.processo === processoID)
            .map((situacao, index) => (
              <tr key={situacao.id}>
                <td>
                  {situacao.tipo_de_situacao &&
                  (tipo_de_situacao = getTipoDeSituacaoBySituacao(situacao))
                    ? tipo_de_situacao.nome
                    : "Sem Tipo"}
                </td>
                <td>{moment(situacao.data).format("DD/MM/YYYY HH:mm")}</td>
                <td
                  className="text-truncate"
                  title={situacao.comentario ? situacao.comentario : ""}
                >
                  {situacao.comentario}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-warning border-0 btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#ModalFormSituacao"
                    data-situacao_id={situacao.id}
                    data-processo_id={situacao.processo}
                    title="Editar Situação"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger border-0 btn-sm"
                    onClick={() => {
                      destroySituacao(situacao);
                    }}
                    title="Excluir Situação"
                  >
                    <i className="bi bi-x-square"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaSituacoes;
