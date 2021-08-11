import React, { useState } from "react";
import { Form } from "react-final-form";
import { InputForm } from "../common/Forms";
import { useDispatch } from "react-redux";
import { ChangePasswordUpdateAction } from "../../actions/accounts/user";
import {
  IChangePasswordSerializer,
  IUserProfileSerializer,
} from "../../interfacesapi";

export interface IChangePasswordCheck extends IChangePasswordSerializer {
  new_password_check: string;
}

const FormChangePassword = ({
  authUser,
}: {
  authUser: IUserProfileSerializer;
}) => {
  const dispatch = useDispatch();

  const [showPassword, setshowPassword] = useState(false);

  const onSubmit = (values: IChangePasswordCheck) => {
    if (values.new_password === values.new_password_check) {
      dispatch(
        ChangePasswordUpdateAction.update({ user: authUser, ...values })
      );
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => {
        const errors: any = {};
        if (values.new_password !== values.new_password_check) {
          errors.new_password = "As novas senhas devem ser a iguais";
        }
        return errors;
      }}
      render={({
        handleSubmit,
        submitFailed,
        submitError,
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
          {submitError && <div className="error">{submitError}</div>}

          <div className="text-lg-end">
            <div className="row mb-2">
              <InputForm
                name="old_password"
                label="Senha atual:"
                type="password"
                classNameDiv="col-lg-8"
                classNameLabel="col-lg-4"
                required
              />
            </div>

            <div className="row mb-2">
              <InputForm
                name="new_password"
                label="Nova Senha:"
                type={showPassword ? "text" : "password"}
                classNameDiv="col-lg-8"
                classNameLabel="col-lg-4"
                required
              />
            </div>
            <div className="row mb-2">
              <InputForm
                name="new_password_check"
                label="Confirmar Senha:"
                type={showPassword ? "text" : "password"}
                classNameDiv="col-lg-8"
                classNameLabel="col-lg-4"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="button"
                className="btn btn-sm btn-info me-3"
                onClick={() => {
                  setshowPassword(!showPassword);
                }}
              >
                <i className={showPassword ? "bi-eye-slash" : "bi-eye"}></i>
              </button>
              <button
                type="submit"
                className="btn btn-sm btn-primary font-weight-bold"
              >
                Alterar Senha
              </button>
            </div>
          </div>
        </form>
      )}
    />
  );
};

export default FormChangePassword;
