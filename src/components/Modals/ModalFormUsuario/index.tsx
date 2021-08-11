import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";

import { IUserProfileSerializer } from "../../../interfacesapi";
import store from "../../../store";
import FormUsuario from "./FormUsuario";
import CommonModalFooter from "../CommonModalFooter";
import { useDispatch } from "react-redux";
import { ActionPayload } from "../../../actions/generics/mixins";
import { UserProfileCRUDAction } from "../../../actions/accounts/user";
//import * as bootstrap from "bootstrap";

export const destroyUsuario = (
  _usuario: IUserProfileSerializer | undefined
) => {
  if (_usuario !== undefined && _usuario.id !== undefined) {
    let newLine = "\r\n";
    let confirm_alert = "Tem certeza que gostaria de deletar este Usuario?";
    confirm_alert += newLine;
    confirm_alert += _usuario.username;
    if (window.confirm(confirm_alert)) {
      store.dispatch(
        UserProfileCRUDAction.destroy(_usuario.id) as unknown as ActionPayload
      );
      return true;
    }
  }
  return false;
};

export default function ModalFormSituação() {
  const modalID = "ModalFormUsuario";
  const dispatch = useDispatch();
  const [usuario, setUsuario] = useState<IUserProfileSerializer>();

  const handleShowModal = (e: any) => {
    let _usuarios = store.getState().accounts.users as IUserProfileSerializer[];
    setUsuario({
      id: 0,
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      is_staff: false,
      is_active: true,
      resethack: [],
    });

    let _usuario;
    let usuario_id = (e.relatedTarget as HTMLElement).dataset["usuario_id"];

    if (usuario_id !== "0") {
      _usuario = _usuarios.find((el: IUserProfileSerializer) => {
        return el.id.toString() === usuario_id;
      });
    }
    if (_usuario !== undefined) {
      setUsuario(_usuario);
    }
  };

  const onSubmit = (values: IUserProfileSerializer) => {
    let closeModal = false;
    if (values.id !== undefined) {
      if (values.id === 0) {
        dispatch(UserProfileCRUDAction.create(values));
        closeModal = true;
      } else {
        console.log(values);
        dispatch(UserProfileCRUDAction.update(values));
        closeModal = true;
      }
    }
    if (closeModal) {
      document.getElementById(modalID + "Close")!.click();
    }
  };

  const onDelete = () => {
    if (destroyUsuario(usuario)) {
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
              {usuario !== undefined
                ? usuario.id !== 0
                  ? "Editar " + usuario.username
                  : "Novo Usuário"
                : "Nova Usuário"}
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
            initialValues={usuario}
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
                  <FormUsuario />
                  {usuario && usuario.id !== 0 && (
                    <span>
                      Obs.: Senha em branco não irá alterar a senha do usuário.
                    </span>
                  )}
                </div>
                <div className="modal-footer">
                  <CommonModalFooter
                    canDelete={
                      usuario !== undefined
                        ? usuario.id !== 0
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
