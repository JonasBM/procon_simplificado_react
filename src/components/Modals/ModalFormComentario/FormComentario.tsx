import React, { Fragment } from "react";
import { InputForm } from "../../common/Forms";

const FormDocumento = () => {
  return (
    <Fragment>
      <div className="row mb-2">
        <InputForm
          name="comentario"
          label="Comentário:"
          placeholder="comentário sobre o documento"
          component="textarea"
          cols="40"
          rows="20"
        />
      </div>
    </Fragment>
  );
};

export default FormDocumento;
