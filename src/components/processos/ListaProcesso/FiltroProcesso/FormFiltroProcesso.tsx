import React, { Fragment } from "react";
import { InputForm, SelectForm } from "../../../common/Forms";
import formatString from "format-string-by-pattern";
import { ITipo_de_situacaoSerializer } from "../../../../interfacesapi";
import { useAppSelector } from "../../../../hooks";

export type IFiltroProcesso = {
  identificacao?: string;
  auto_infracao?: string;
  ficha_de_atendimento?: string;
  reclamante?: string;
  reclamada?: string;
  cpf_cnpj?: string;
  tipo_de_situacao?: string;
};

const FormFiltroProcesso = () => {
  const tiposDeSituacoes = useAppSelector(
    (state) => state.tiposdesituacoes
  ) as ITipo_de_situacaoSerializer[];

  return (
    <div className="text-lg-end">
      <div className="row mb-2">
        <div className="col-lg-4">
          <div className="row">
            <InputForm
              name="identificacao"
              label="Numero do processo:"
              type="text"
              classNameDiv="col-lg-6"
              classNameLabel="col-lg-6"
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="row">
            <InputForm
              name="auto_infracao"
              label="Auto de Infração:"
              type="text"
              classNameDiv="col-lg-6"
              classNameLabel="col-lg-6"
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="row">
            <InputForm
              name="ficha_de_atendimento"
              label="Ficha de atendimento:"
              type="text"
              classNameDiv="col-lg-6"
              classNameLabel="col-lg-6"
            />
          </div>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-lg-4">
          <div className="row">
            <InputForm
              name="reclamante"
              label="Reclamante:"
              type="text"
              classNameDiv="col-lg-6"
              classNameLabel="col-lg-6"
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="row">
            <InputForm
              name="reclamada"
              label="Reclamada:"
              type="text"
              classNameDiv="col-lg-6"
              classNameLabel="col-lg-6"
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="row">
            <InputForm
              name="cpf_cnpj"
              label="CPF/CNPJ:"
              type="text"
              classNameDiv="col-lg-6"
              classNameLabel="col-lg-6"
              parse={(value) => {
                if (!value) return value;
                const onlyNumbers = value.replace(/[^\d]/g, "");
                if (value.length > 14) {
                  return formatString("99.999.999/9999-99", onlyNumbers);
                } else {
                  return formatString("999.999.999-99", onlyNumbers);
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-lg-4">
          <div className="row">
            <SelectForm
              name="tipo_de_situacao"
              label="Situação atual:"
              classNameDiv="col-lg-6"
              classNameLabel="col-lg-6"
            >
              <option value="">---------</option>
              {tiposDeSituacoes.map((tipoDeSituacao, index) => (
                <option key={tipoDeSituacao.id} value={tipoDeSituacao.id}>
                  {tipoDeSituacao.ordem} - {tipoDeSituacao.nome}
                </option>
              ))}
            </SelectForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormFiltroProcesso;
