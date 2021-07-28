import React, { Fragment } from "react";
import { FileField, InputForm, required } from "../../common/Forms";

const FormDocumento = () => {
  return (
    <Fragment>
      <div className="row mb-2">
        <InputForm
          name="comentario"
          label="Comentario:"
          placeholder="Descrição do documento"
          component="textarea"
          cols="40"
          rows="20"
        />
      </div>
    </Fragment>
  );
};

export default FormDocumento;
