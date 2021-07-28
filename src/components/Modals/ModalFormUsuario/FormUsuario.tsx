import React, { Fragment } from "react";
import { InputForm, CheckboxForm } from "../../common/Forms";

const FormDocumento = () => {
  return (
    <Fragment>
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

      <CheckboxForm name="is_staff" label="Administrador" />
      <CheckboxForm name="is_active" label="Ativo" />

      <div className="row mb-2">
        <InputForm
          name="password"
          label="Senha:"
          classNameDiv="col-lg-9"
          classNameLabel="col-lg-3"
          validate={(value) =>
            value
              ? value.length >= 4
                ? undefined
                : "A senha deve ter ao menos 6 caracteres"
              : undefined
          }
        />
      </div>
    </Fragment>
  );
};

export default FormDocumento;
