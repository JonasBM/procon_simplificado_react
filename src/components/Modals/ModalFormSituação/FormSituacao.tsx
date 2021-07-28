import React, { Fragment } from "react";
import { InputForm, required, SelectForm } from "../../common/Forms";
import formatString from "format-string-by-pattern";
import { Field } from "react-final-form";
import { useAppSelector } from "../../../hooks";
import { ITipo_de_situacaoSerializer } from "../../../interfacesapi";

const FormSituacao = () => {
  const tiposDeSituacoes = useAppSelector(
    (state) => state.tiposdesituacoes
  ) as ITipo_de_situacaoSerializer[];

  return (
    <Fragment>
      <div className="row mb-2">
        <InputForm name="processo" type="hidden" required />
      </div>
      <div className="row mb-2">
        <SelectForm
          name="tipo_de_situacao"
          label="Tipo de Situação:"
          classNameDiv="col-lg-9"
          classNameLabel="col-lg-3"
          required
          autoFocus
        >
          <option value="">---------</option>
          {tiposDeSituacoes.map((tipoDeSituacao, index) => (
            <option key={tipoDeSituacao.id} value={tipoDeSituacao.id}>
              {tipoDeSituacao.ordem} - {tipoDeSituacao.nome}
            </option>
          ))}
        </SelectForm>
      </div>
      <div className="row mb-2">
        <InputForm
          name="data"
          label="Data:"
          type="datetime-local"
          classNameDiv="col-lg-9"
          classNameLabel="col-lg-3"
          validate={required}
        />
      </div>
      <div className="row mb-2">
        <InputForm
          name="comentario"
          label="Comentario:"
          placeholder="Comentario diverso"
          type="text"
          classNameDiv="col-lg-9"
          classNameLabel="col-lg-3"
        />
      </div>
    </Fragment>
  );
};

export default FormSituacao;
