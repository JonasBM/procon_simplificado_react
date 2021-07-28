import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  ChangeTipoDeSituacaoOrdemAction,
  TipoDeSituacaoCRUDAction,
} from "../../../actions/api/tipoDeSituacao";
import { useAppSelector } from "../../../hooks";
import { ITipo_de_situacaoSerializer } from "../../../interfacesapi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { destroyTipoDeSituacao } from "../../Modals/ModalFormTipoDeSituacao";

const TiposDeSituacoes = () => {
  const dispatch = useDispatch();
  const tiposDeSituacoes = useAppSelector(
    (state) => state.tiposdesituacoes
  ) as ITipo_de_situacaoSerializer[];

  useEffect(() => {
    dispatch(TipoDeSituacaoCRUDAction.list());
  }, [dispatch]);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    if (result.source.index !== result.destination.index) {
      dispatch(
        ChangeTipoDeSituacaoOrdemAction({
          tipo_de_situacao_id: result.draggableId,
          ordem_anterior: result.source.index + 1,
          ordem_nova: result.destination.index + 1,
        })
      );
    }
  }

  return (
    <div className="container">
      <button
        data-bs-toggle="modal"
        data-bs-target="#ModalFormTipoDeSituacao"
        data-tipodesituacao_id={0}
        className="btn btn-primary"
        type="button"
        title="Criar Tipo de Situação"
      >
        Adicionar <i className="bi bi-plus-lg ms-1"></i>
      </button>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tiposDeSituacoes">
          {(provided) => (
            <table className="table table-dark table-striped table-hover table-sm mt-1">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Nome</th>
                  <th scope="col">Cor</th>
                  <th scope="col">Descrição</th>
                  <th scope="col"></th>
                </tr>
              </thead>

              <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {tiposDeSituacoes.map((tipoDeSituacao, index) => {
                  return (
                    <Draggable
                      key={tipoDeSituacao.id}
                      draggableId={tipoDeSituacao.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <tr
                          key={tipoDeSituacao.id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <td>-</td>
                          <td>{tipoDeSituacao.nome}</td>
                          <td>{tipoDeSituacao.css_cor}</td>
                          <td>{tipoDeSituacao.descricao}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-warning border-0 btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#ModalFormTipoDeSituacao"
                              data-tipodesituacao_id={tipoDeSituacao.id}
                              title="Editar Tipo de Situação"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-danger border-0 btn-sm"
                              onClick={() => {
                                destroyTipoDeSituacao(tipoDeSituacao);
                              }}
                              title="Excluir Tipo de Situação"
                            >
                              <i className="bi bi-x-square"></i>
                            </button>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  );
                })}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
      <span className="text-dark fw-bold">
        Obs.: Clique e arraste para rearranjar a ordem.
      </span>
    </div>
  );
};

export default TiposDeSituacoes;
