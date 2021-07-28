import React, { Fragment } from "react";
import { InputForm } from "../../common/Forms";
import formatString from "format-string-by-pattern";

const FormProcesso = () => {
  const ano = new Date().getFullYear();

  return (
    <Fragment>
      <div className="row mb-2">
        <InputForm
          name="identificacao"
          label="Numero do processo:"
          placeholder={"000/" + ano}
          type="text"
          classNameDiv="col-lg-9"
          classNameLabel="col-lg-3"
          required
          autoFocus
        />
      </div>
      <div className="row mb-2">
        <InputForm
          name="auto_infracao"
          label="Auto de Infração:"
          placeholder={"000/" + ano}
          type="text"
          classNameDiv="col-lg-9"
          classNameLabel="col-lg-3"
        />
      </div>
      <div className="row mb-2">
        <InputForm
          name="reclamante"
          label="Reclamante:"
          placeholder="Nome do reclamante"
          type="text"
          classNameDiv="col-lg-9"
          classNameLabel="col-lg-3"
          required
        />
      </div>
      <div className="row mb-2">
        <InputForm
          name="reclamada"
          label="Reclamada:"
          placeholder="Nome da reclamada"
          type="text"
          classNameDiv="col-lg-9"
          classNameLabel="col-lg-3"
          required
        />
      </div>
      <div className="row mb-2">
        <InputForm
          name="cpf_cnpj"
          label="CPF/CNPJ:"
          placeholder="Documento da reclamada"
          type="text"
          classNameDiv="col-lg-9"
          classNameLabel="col-lg-3"
          parse={(value) => {
            if (!value) return value;
            const onlyNumbers = value.replace(/[^\d]/g, "");
            if (value.length > 14) {
              return formatString("99.999.999/9999-99", onlyNumbers);
            } else {
              return formatString("999.999.999-99", onlyNumbers);
            }
          }}
          required
        />
      </div>
      <div className="row mb-2">
        <InputForm
          name="ficha_de_atendimento"
          label="Ficha de atendimento:"
          placeholder="Numero da ficha de atendimento"
          type="text"
          classNameDiv="col-lg-9"
          classNameLabel="col-lg-3"
          required
        />
      </div>
    </Fragment>
  );
};

export default FormProcesso;
