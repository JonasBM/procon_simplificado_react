import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authLogoutAll } from "../../actions/accounts/auth";
import { useAppSelector } from "../../hooks";
import { IUserProfileSerializer } from "../../interfacesapi";
import FormChangePassword from "./FormChangePassword";
import FormUserData from "./FormUserData";

const Perfil = () => {
  const dispatch = useDispatch();
  const authUser = useAppSelector(
    (state) => state.accounts.auth.user
  ) as IUserProfileSerializer;

  const handleLogoutAll = () => {
    let newLine = "\r\n";
    let confirm_alert = "Tem certeza que gostaria sair de todas as Instâncias?";
    confirm_alert += newLine;
    confirm_alert += "Você terá que entrar novamente em todos os dispositivos.";
    if (window.confirm(confirm_alert)) {
      dispatch(authLogoutAll());
    }
  };

  return (
    <div className="modal-body container">
      <div className="row text-center mb-3">
        <h5>
          {"Bem vindo, "}
          {authUser
            ? authUser.first_name
              ? authUser.first_name
              : authUser.username
            : ""}
          {"!"}
        </h5>
        <h6>
          {" (último login: "}
          {authUser ? authUser.last_login : ""}
          {")"}
        </h6>
      </div>

      <div className="row">
        <div className="col-12 offset-lg-1 col-lg-5">
          <div>
            <FormUserData authUser={authUser} />
          </div>
        </div>
        <div className="col-12 offset-lg-1 col-lg-5 mt-2 mt-lg-0">
          <div className="mt-2">
            <FormChangePassword authUser={authUser} />
          </div>
          <div className="mt-2 mt-lg-5 p-2 text-center">
            <button
              type="button"
              className="btn btn-danger font-weight-bold"
              onClick={handleLogoutAll}
            >
              Sair de todos os locais
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
