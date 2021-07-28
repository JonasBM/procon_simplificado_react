import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";

import { ITipo_de_situacaoSerializer } from "../../../interfacesapi";
import store from "../../../store";
import FormTipoDeSituacao from "./FormTipoDeSituacao";
import { TipoDeSituacaoCRUDAction } from "../../../actions/api/tipoDeSituacao";
import CommonModalFooter from "../CommonModalFooter";
import { useDispatch } from "react-redux";
import { ActionPayload } from "../../../actions/generics/mixins";
//import * as bootstrap from "bootstrap";

export const destroyTipoDeSituacao = (
  _tipoDeSituacao: ITipo_de_situacaoSerializer | undefined
) => {
  if (_tipoDeSituacao !== undefined && _tipoDeSituacao.id !== undefined) {
    let newLine = "\r\n";
    let confirm_alert =
      "Tem certeza que gostaria de deletar este Tipo de Situação?";
    confirm_alert += newLine;
    confirm_alert += "Nome: " + _tipoDeSituacao.nome;
    if (window.confirm(confirm_alert)) {
      store.dispatch(
        TipoDeSituacaoCRUDAction.destroy(
          _tipoDeSituacao.id
        ) as unknown as ActionPayload
      );
      return true;
    }
  }
  return false;
};

export default function ModalFormTipoDeSituacao() {
  const modalID = "ModalFormTipoDeSituacao";

  const dispatch = useDispatch();

  const [tipoDeSituacao, setTipoDeSituacao] =
    useState<ITipo_de_situacaoSerializer>();

  const handleShowModal = (e: any) => {
    let _tipoSDeSituacoes = store.getState()
      .tiposdesituacoes as ITipo_de_situacaoSerializer[];

    let MaxOrder = Math.max.apply(
      Math,
      _tipoSDeSituacoes.map(function (o) {
        return o.ordem;
      })
    );
    if (MaxOrder === -Infinity) {
      MaxOrder = 0;
    }

    setTipoDeSituacao({
      id: 0,
      ordem: MaxOrder + 1,
      nome: "",
      css_cor: "#000000",
      descricao: null,
    });

    let _tipoDeSituacao;
    let tipodesituacao_id = (e.relatedTarget as HTMLElement).dataset[
      "tipodesituacao_id"
    ];

    if (tipodesituacao_id !== "0") {
      _tipoDeSituacao = _tipoSDeSituacoes.find(
        (el: ITipo_de_situacaoSerializer) => {
          return el.id.toString() === tipodesituacao_id;
        }
      );
    }

    if (_tipoDeSituacao !== undefined) {
      setTipoDeSituacao(_tipoDeSituacao);
    }
  };

  const onSubmit = (values: ITipo_de_situacaoSerializer) => {
    let closeModal = false;
    if (values.id !== undefined) {
      if (values.id === 0) {
        dispatch(TipoDeSituacaoCRUDAction.create(values));
        closeModal = true;
      } else {
        dispatch(TipoDeSituacaoCRUDAction.update(values));
        closeModal = true;
      }
    }
    if (closeModal) {
      document.getElementById(modalID + "Close")!.click();
    }
  };

  const onDelete = () => {
    if (destroyTipoDeSituacao(tipoDeSituacao)) {
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
            <h5 className="modal-title font-weight-bold">
              {tipoDeSituacao !== undefined
                ? tipoDeSituacao.id !== 0
                  ? "Editar " + tipoDeSituacao.nome
                  : "Novo Tipo de Situação"
                : "Novo Tipo de Situação"}
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
            initialValues={tipoDeSituacao}
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
                  <FormTipoDeSituacao />
                </div>
                <div className="modal-footer">
                  <CommonModalFooter
                    canDelete={
                      tipoDeSituacao !== undefined
                        ? tipoDeSituacao.id !== 0
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
