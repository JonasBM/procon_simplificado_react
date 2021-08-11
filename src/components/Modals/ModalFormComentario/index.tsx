import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";

import { IComentarioDocumentoSerializer } from "../../../interfacesapi";
import store from "../../../store";
import FormComentario from "./FormComentario";
import CommonModalFooter from "../CommonModalFooter";
import { useDispatch } from "react-redux";
import { ActionPayload } from "../../../actions/generics/mixins";
import { ComentarioCRUDAction } from "../../../actions/api/comentario";
import { DocumentoCRUDAction } from "../../../actions/api/documento";

export const destroyComentario = (
  _comentario: IComentarioDocumentoSerializer | undefined
) => {
  if (_comentario !== undefined && _comentario.id !== undefined) {
    let newLine = "\r\n";
    let confirm_alert = "Tem certeza que gostaria de deletar este Comentário?";
    confirm_alert += newLine;
    confirm_alert += _comentario.comentario;
    if (window.confirm(confirm_alert)) {
      (
        store.dispatch(
          ComentarioCRUDAction.destroy(
            _comentario.id
          ) as unknown as ActionPayload
        ) as unknown as Promise<number>
      ).then((res) => {
        store.dispatch(
          DocumentoCRUDAction.retrieve(
            _comentario.documento
          ) as unknown as ActionPayload
        );
      });
      return true;
    }
  }
  return false;
};

export default function ModalFormSituação() {
  const modalID = "ModalFormComentario";

  const dispatch = useDispatch();

  const [comentario, setComentario] =
    useState<IComentarioDocumentoSerializer>();

  const handleShowModal = (e: any) => {
    let parsed_documento_id;
    let documento_id = (e.relatedTarget as HTMLElement).dataset["documento_id"];
    if (documento_id != null) {
      parsed_documento_id = parseInt(documento_id);
      if (isNaN(parsed_documento_id) || parsed_documento_id < 0) {
        parsed_documento_id = 0;
      }
    }

    setComentario({
      id: 0,
      documento: parsed_documento_id,
      comentario: "",
      resethack: [],
    });
  };

  const onSubmit = (values: IComentarioDocumentoSerializer) => {
    let closeModal = false;
    if (values.id !== undefined) {
      if (values.id === 0) {
        (
          dispatch(
            ComentarioCRUDAction.create(values)
          ) as unknown as Promise<IComentarioDocumentoSerializer>
        ).then((res) => {
          if (res) {
            if (comentario?.documento) {
              dispatch(DocumentoCRUDAction.retrieve(comentario.documento));
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
    if (destroyComentario(comentario)) {
      document.getElementById(modalID + "Close")!.click();
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
            <h5 className="modal-title font-weight-bold">Novo Comentário</h5>
            <button
              id={modalID + "Close"}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <Form
            initialValues={comentario}
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
                  <FormComentario />
                </div>
                <div className="modal-footer">
                  <CommonModalFooter
                    canDelete={false}
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
