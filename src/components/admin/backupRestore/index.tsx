import React from "react";
import { useDispatch } from "react-redux";
import { FileField } from "../../common/Forms";
import { Form } from "react-final-form";
import {
  DownloadTodosProcessos,
  ExportarProcessos,
} from "../../../actions/api/processo";

const BackupRestore = () => {
  const dispatch = useDispatch();

  const onSubmit = (values: { planilha: any }) => {
    if (values.planilha) {
      let newLine = "\r\n";
      let confirm_alert = "Tem certeza que gostaria de exportar esta planilha?";
      confirm_alert += newLine;
      confirm_alert += "Arquivo: " + values.planilha.name;
      confirm_alert += newLine;
      confirm_alert += "Esta ação não poderá ser desfeita!";
      if (window.confirm(confirm_alert)) {
        dispatch(ExportarProcessos(values));
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="m-2 col-lg-7 col-xl-5 col-xxl-4">
          <button
            className="btn btn-success"
            type="button"
            title="Baixar planilha com os processos"
            onClick={() => {
              dispatch(DownloadTodosProcessos());
            }}
          >
            Baixar planilha com os processos
            <i className="bi bi-cloud-download ms-1"></i>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="m-2 p-2 col-lg-7 col-xl-5 col-xxl-4 border">
          <Form
            onSubmit={onSubmit}
            validate={() => {
              return {};
            }}
            render={({
              handleSubmit,
              submitFailed,
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
                <div className="row mb-2">
                  <FileField name="planilha" label="Planilha:" />
                </div>

                <button
                  className="btn btn-danger"
                  type="submit"
                  title="Baixar planilha com os processos"
                >
                  Exportar planilha
                  <i className="bi bi-cloud-upload ms-1"></i>
                </button>
              </form>
            )}
          />
        </div>
        <div>
          A planilha deve obedecer a estrutura abaixo, começando na celula A1:
          <ul>
            <li>
              Primeira linha de cabeçalho, sem linha em branco acima, com as
              linhas subsequentes abaixo sendo os dados a serem exportados.
            </li>
            <li>
              Cada linha abaixo do cabeçalho será considerada como um processo.
            </li>
            <li>Não pode haver colunas em branco a esquerda.</li>
            <li>
              A planilha a exportar será a planilha ativa do arquivo, em caso de
              duvida remova todas as planilhas não utilizadas.
            </li>
          </ul>
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th scope="col">Data de Criação</th>
                <th scope="col">Processo</th>
                <th scope="col">Auto de Infração</th>
                <th scope="col">Reclamante</th>
                <th scope="col">Reclamada</th>
                <th scope="col">CPF/CNPJ</th>
                <th scope="col">Nome da última situação</th>
                <th scope="col">Data da última situação</th>
                <th scope="col">Ficha de Atendimento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>30/06/2018</td>
                <td>001/2018</td>
                <td>2018.050</td>
                <td>CONSUMIDOR A</td>
                <td>FORNECEDOR ABC</td>
                <td>12345678/9999-88</td>
                <td>tipo1</td>
                <td>30/08/2020</td>
                <td>4201112345678900</td>
              </tr>
              <tr>
                <td colSpan={9}>...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BackupRestore;
