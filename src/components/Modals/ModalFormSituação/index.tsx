import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";

import { ISituacaoSerializer } from "../../../interfacesapi";
import store from "../../../store";
import FormSituacao from "./FormSituacao";
import CommonModalFooter from "../CommonModalFooter";
import { useDispatch } from "react-redux";
import { ActionPayload } from "../../../actions/generics/mixins";
import { SituacaoCRUDAction } from "../../../actions/api/situacao";
import { getTipoDeSituacaoBySituacao } from "../../../utils";
import { updateList } from "../../processos/ListaProcesso";
import { DocumentoCRUDAction } from "../../../actions/api/documento";
//import * as bootstrap from "bootstrap";

const moment = require("moment");
const queryString = require("query-string");

export const destroySituacao = (_situacao: ISituacaoSerializer | undefined) => {
  if (_situacao !== undefined && _situacao.id !== undefined) {
    let newLine = "\r\n";
    let confirm_alert = "Tem certeza que gostaria de deletar este local?";
    confirm_alert += newLine;
    confirm_alert +=
      getTipoDeSituacaoBySituacao(_situacao)?.nome +
      " | " +
      moment(_situacao.data).format("DD-MM-YYYY HH:mm");

    if (window.confirm(confirm_alert)) {
      store.dispatch(
        SituacaoCRUDAction.destroy(_situacao.id) as unknown as ActionPayload
      );
      return true;
    }
  }
  return false;
};

export default function ModalFormSituação() {
  const modalID = "ModalFormSituacao";

  const dispatch = useDispatch();

  const [situacao, setSituacao] = useState<ISituacaoSerializer>();

  const [listProcessosPage, setListProcessosPage] = useState<number>();
  const [listProcessosSearchParams, setListProcessosSearchParams] =
    useState<object>();

  const handleShowModal = (e: any) => {
    let parsed_processo_id;
    let processo_id = (e.relatedTarget as HTMLElement).dataset["processo_id"];
    if (processo_id != null) {
      parsed_processo_id = parseInt(processo_id);
      if (isNaN(parsed_processo_id) || parsed_processo_id < 0) {
        parsed_processo_id = 0;
      }
    }

    let _situacoes = store.getState().situacoes as ISituacaoSerializer[];
    setSituacao({
      id: 0,
      processo: parsed_processo_id,
      tipo_de_situacao: null,
      data: moment().format("YYYY-MM-DDTHH:mm"),
      comentario: null,
      resethack: [],
    });

    let _situacao;
    let situacao_id = (e.relatedTarget as HTMLElement).dataset["situacao_id"];

    if (situacao_id !== "0") {
      _situacao = _situacoes.find((el: ISituacaoSerializer) => {
        return el.id.toString() === situacao_id;
      });
    }
    if (_situacao !== undefined) {
      setSituacao(_situacao);
    }

    let parsed_listprocessos_page;
    let listprocessos_page = (e.relatedTarget as HTMLElement).dataset[
      "listprocessos_page"
    ];
    if (listprocessos_page != null) {
      parsed_listprocessos_page = parseInt(listprocessos_page);
      if (!isNaN(parsed_listprocessos_page) || parsed_listprocessos_page > 0) {
        setListProcessosPage(parsed_listprocessos_page);
      }
    } else {
      setListProcessosPage(0);
    }

    let listprocessos_search_params = (e.relatedTarget as HTMLElement).dataset[
      "listprocessos_search_params"
    ];
    if (listprocessos_search_params) {
      setListProcessosSearchParams(
        queryString.parse(listprocessos_search_params)
      );
    }
  };

  const onSubmit = (values: ISituacaoSerializer) => {
    let closeModal = false;
    if (values.id !== undefined) {
      if (values.id === 0) {
        (
          dispatch(
            SituacaoCRUDAction.create(values)
          ) as unknown as Promise<ISituacaoSerializer>
        ).then((res) => {
          if (res) {
            if (listProcessosPage && listProcessosPage > 0) {
              updateList(listProcessosPage, listProcessosSearchParams);
            } else {
              dispatch(DocumentoCRUDAction.list({ processo_id: res.processo }));
            }
          }
        });
        closeModal = true;
      } else {
        (
          dispatch(
            SituacaoCRUDAction.update(values)
          ) as unknown as Promise<ISituacaoSerializer>
        ).then((res) => {
          if (res) {
            if (listProcessosPage && listProcessosPage > 0) {
              updateList(listProcessosPage, listProcessosSearchParams);
            } else {
              dispatch(DocumentoCRUDAction.list({ processo_id: res.processo }));
            }
          }
        });
        closeModal = true;
      }
    }
    if (closeModal) {
      document.getElementById(modalID + "Close")!.click();
    }
  };

  const onDelete = () => {
    if (destroySituacao(situacao)) {
      document.getElementById(modalID + "Close")!.click();
      if (listProcessosPage && listProcessosPage > 0) {
        updateList(listProcessosPage, listProcessosSearchParams);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("show.bs.modal", handleShowModal);
    return () => window.removeEventListener("show.bs.modal", handleShowModal);
  }, []);

  return (
    <div
      id={modalID}
      className="modal fade"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title font-weight-bold">
              {situacao !== undefined
                ? situacao.id !== 0
                  ? "Editar " + situacao.data
                  : "Novo Local"
                : "Novo Local"}
            </h5>
            <button
              id={modalID + "Close"}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <Form
            initialValues={situacao}
            onSubmit={onSubmit}
            validate={() => {
              return {};
            }}
            render={({
              handleSubmit,
              submitFailed,
              form,
              submitting,
              pristine,
            }) => (
              <form
                onSubmit={handleSubmit}
                className={
                  "needs-validation" + (submitFailed ? " was-validated" : "")
                }
                noValidate
              >
                <div className="modal-body">
                  <FormSituacao />
                </div>
                <div className="modal-footer">
                  <CommonModalFooter
                    canDelete={
                      situacao !== undefined
                        ? situacao.id !== 0
                          ? true
                          : false
                        : false
                    }
                    canCopy={false}
                    onDelete={onDelete}
                    form={form}
                  />
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
}
