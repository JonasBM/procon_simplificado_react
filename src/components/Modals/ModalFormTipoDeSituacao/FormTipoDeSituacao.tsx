import React, { Fragment } from "react";
import { InputForm } from "../../common/Forms";
import formatString from "format-string-by-pattern";
import { Field } from "react-final-form";

const FormTipoDeSituacao = () => {
  return (
    <Fragment>
      <div className="row mb-2">
        <InputForm name="processo" type="hidden" required />
      </div>
      <div className="row mb-2">
        <InputForm
          name="nome"
          label="Nome:"
          placeholder="nome da situação"
          required
          autoFocus
        />
      </div>
      <div className="row mb-2">
        <InputForm
          name="descricao"
          label="Descricao:"
          placeholder="descrição da situação"
          type="text"
          required
        />
      </div>
      <div className="row mb-2">
        <label className="col-form-label col-form-label-sm">Cor:</label>
        <div className="input-group input-group-sm w-auto">
          <Field
            component="input"
            type="text"
            className="form-control form-control-sm"
            name="css_cor"
            parse={formatString("#AAAAAA")}
            required
          />
          <Field
            component="input"
            type="color"
            className="form-control form-control-sm"
            name="css_cor"
            required
          />
        </div>
      </div>
    </Fragment>
  );
};

export default FormTipoDeSituacao;
