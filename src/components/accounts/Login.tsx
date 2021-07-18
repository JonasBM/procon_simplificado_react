import React from "react";
import { Form } from "react-final-form";
import { InputFormFloat } from "../common/FormsFloat";
import { useDispatch } from "react-redux";
import {
  IauthLogin,
  authLogin,
  tryLoadUser,
} from "../../actions/accounts/auth";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../hooks";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useAppSelector((state) => state.accounts.auth);
  useEffect(() => {
    dispatch(tryLoadUser());
  }, [dispatch]);

  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated != null) {
      if (auth.isAuthenticated) {
        history.goBack();
      }
    }
  }, [auth, history]);

  const onSubmit = (values: IauthLogin) => {
    dispatch(authLogin(values));
  };
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col col-lg-3 text-center m-auto pb-5">
          <Form
            initialValues={{ username: "", password: "" }}
            onSubmit={onSubmit}
            render={({ handleSubmit, submitFailed }) => (
              <form
                onSubmit={handleSubmit}
                className={
                  "needs-validation" + (submitFailed && " was-validated")
                }
                noValidate
              >
                <h4 className="font-weight-normal">Acesso restrito</h4>
                <InputFormFloat
                  name="username"
                  label="Usuário:"
                  placeholder="Usuário"
                  type="text"
                  className="m-1"
                  classNameDiv="mx-1"
                  required
                  autoFocus
                />
                <InputFormFloat
                  name="password"
                  label="Senha:"
                  placeholder="Senha"
                  type="password"
                  className="m-1"
                  classNameDiv="mx-1"
                  required
                />
                <button className="btn btn-primary m-1" type="submit">
                  Entrar
                </button>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
