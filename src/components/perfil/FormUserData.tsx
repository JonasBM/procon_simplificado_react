import React from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-final-form";
import { InputForm } from "../common/Forms";

import { IUserProfileSerializer } from "../../interfacesapi";
import { UserProfileCRUDAction } from "../../actions/accounts/user";

const FormUserData = ({ authUser }: { authUser: IUserProfileSerializer }) => {
  const dispatch = useDispatch();

  const onSubmit = (values: IUserProfileSerializer) => {
    dispatch(UserProfileCRUDAction.update(values));
  };

  return (
    <Form
      initialValues={authUser}
      onSubmit={onSubmit}
      validate={() => {
        return {};
      }}
      render={({ handleSubmit, submitFailed, form, submitting, pristine }) => (
        <form
          onSubmit={handleSubmit}
          className={
            "needs-validation" + (submitFailed ? " was-validated" : "")
          }
          noValidate
        >
          <div className="text-lg-end">
            <div className="row mb-2">
              <InputForm
                name="username"
                label="Usuário:"
                classNameDiv="col-lg-9"
                classNameLabel="col-lg-3"
              />
            </div>

            <div className="row mb-2">
              <InputForm
                name="first_name"
                label="Nome:"
                classNameDiv="col-lg-9"
                classNameLabel="col-lg-3"
              />
            </div>

            <div className="row mb-2">
              <InputForm
                name="last_name"
                label="Sobrenome:"
                classNameDiv="col-lg-9"
                classNameLabel="col-lg-3"
              />
            </div>

            <div className="row mb-2">
              <InputForm
                name="email"
                label="Email:"
                classNameDiv="col-lg-9"
                classNameLabel="col-lg-3"
              />
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary font-weight-bold">
              Salvar
            </button>
          </div>
        </form>
      )}
    />
  );
};

export default FormUserData;
