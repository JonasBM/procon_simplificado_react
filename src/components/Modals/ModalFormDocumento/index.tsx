import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";

import { IDocumentoSerializer } from "../../../interfacesapi";
import store from "../../../store";
import FormDocumento from "./FormDocumento";
import CommonModalFooter from "../CommonModalFooter";
import { useDispatch } from "react-redux";
import { ActionPayload } from "../../../actions/generics/mixins";
import { DocumentoCRUDAction } from "../../../actions/api/documento";
import { updateList } from "../../processos/ListaProcesso";
//import * as bootstrap from "bootstrap";

const moment = require("moment");
const queryString = require("query-string");

export const destroyDocumento = (
  _documento: IDocumentoSerializer | undefined
) => {
  if (_documento !== undefined && _documento.id !== undefined) {
    let newLine = "\r\n";
    let confirm_alert = "Tem certeza que gostaria de deletar este Documento?";
    confirm_alert += newLine;
    confirm_alert += _documento.nome;
    if (window.confirm(confirm_alert)) {
      store.dispatch(
        DocumentoCRUDAction.destroy(_documento.id) as unknown as ActionPayload
      );
      return true;
    }
  }
  return false;
};

export default function ModalFormDocumento() {
  const modalID = "ModalFormDocumento";

  const dispatch = useDispatch();

  const [documento, setDocumento] = useState<IDocumentoSerializer>();

  const [listProcessosPage, setListProcessosPage] = useState<number>();
  const [listProcessosSearchParams, setListProcessosSearchParams] =
    useState<object>();

  const handleShowModal = (e: any) => {
    const fileInput = document.getElementById("id_arquivo");
    if (fileInput) {
      (fileInput as HTMLInputElement).value = "";
    }

    let parsed_processo_id;
    let processo_id = (e.relatedTarget as HTMLElement).dataset["processo_id"];
    if (processo_id != null) {
      parsed_processo_id = parseInt(processo_id);
      if (isNaN(parsed_processo_id) || parsed_processo_id < 0) {
        parsed_processo_id = 0;
      }
    }

    let _documentos = store.getState().documentos as IDocumentoSerializer[];
    setDocumento({
      id: 0,
      processo: parsed_processo_id,
      nome: "",
      comentarios: [],
    });

    let _documento;
    let documento_id = (e.relatedTarget as HTMLElement).dataset["documento_id"];

    if (documento_id !== "0") {
      _documento = _documentos.find((el: IDocumentoSerializer) => {
        return el.id.toString() === documento_id;
      });
    }
    delete _documento?.arquivo;
    if (_documento !== undefined) {
      setDocumento(_documento);
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

  const onSubmit = (values: IDocumentoSerializer) => {
    if (values.arquivo === "") {
      delete values.arquivo;
    }
    let closeModal = false;
    if (values.id !== undefined) {
      if (values.id === 0) {
        dispatch(DocumentoCRUDAction.create(values));
        closeModal = true;
      } else {
        dispatch(DocumentoCRUDAction.update(values));
        closeModal = true;
      }
    }
    if (closeModal) {
      document.getElementById(modalID + "Close")!.click();
      if (listProcessosPage && listProcessosPage > 0) {
        updateList(listProcessosPage, listProcessosSearchParams);
      }
    }
  };

  const onDelete = () => {
    if (destroyDocumento(documento)) {
      document.getElementById(modalID + "Close")!.click();
    }
    if (listProcessosPage && listProcessosPage > 0) {
      updateList(listProcessosPage, listProcessosSearchParams);
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
              {documento !== undefined
                ? documento.id !== 0
                  ? "Editar " + documento.nome
                  : "Nova Situação"
                : "Nova Situação"}
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
            initialValues={documento}
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
                  <FormDocumento />
                </div>
                <div className="modal-footer">
                  <CommonModalFooter
                    canDelete={
                      documento !== undefined
                        ? documento.id !== 0
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
