import React from "react";
import { Form } from "react-final-form";
import { InputFormFloat } from "../common/FormsFloat";
import { useDispatch } from "react-redux";
import { IauthLogin, authLogin } from "../../actions/accounts/auth";
import { IaccountsState } from "../../reducers/accounts/reducerAuth";
import { useHistory } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (values: IauthLogin) => {
    (dispatch(authLogin(values)) as unknown as Promise<IaccountsState>).then(
      (res) => {
        if (res && res.user?.is_active) {
          history.push("processos/");
        }
      }
    );
  };
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col m-auto pb-5">
          <div className="row">
            <div className="col col-lg-3 col-xl-2 text-center mx-auto">
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
          <div className="row">
            <div className="col col-lg-4 col-xl-3 text-center mx-auto">
              <div className="card">
                <div className="card-body">
                  <h5>
                    To access the example app,
                    <br />
                    please contact me via email:
                    <br />
                    <a href="mailto:contato@jonasbm.com.br">
                      contato@jonasbm.com.br
                    </a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
