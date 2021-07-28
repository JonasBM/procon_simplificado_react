import React, { Fragment } from "react";
import { FileField, InputForm, required } from "../../common/Forms";

const FormDocumento = () => {
  return (
    <Fragment>
      <div className="row mb-2">
        <InputForm name="processo" type="hidden" required />
      </div>
      <div className="row mb-2">
        <FileField
          name="arquivo"
          label="Arquivo:"
          type="file"
          classNameDiv="col-lg-9"
          classNameLabel="col-lg-3"
          required={false}
        />
      </div>
      <div className="row mb-2">
        <InputForm
          name="nome"
          label="Nome:"
          placeholder="Nome para o documento"
          classNameDiv="col-lg-9"
          classNameLabel="col-lg-3"
          format={(value) =>
            value ? value.replace(/[\/\\?%*:|"<>#$!`&@{}='+=]/g, "") : ""
          }
          required
        />
        {/* //# < > $ + % ! ` & * ' | {} ? " = / \ : @ */}
        <span>{"Não usar: # < > $ + % ! ` & * ' | { } ? \" = /  : "}</span>
      </div>
      <div className="row mb-2">
        <InputForm
          name="descricao"
          label="Descrição:"
          placeholder="Descrição do documento"
          type="text"
          classNameDiv="col-lg-9"
          classNameLabel="col-lg-3"
        />
      </div>
    </Fragment>
  );
};

export default FormDocumento;
