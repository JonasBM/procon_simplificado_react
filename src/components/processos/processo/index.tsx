import React, { Fragment, useEffect, useState } from "react";
import { Form } from "react-final-form";
import { IProcessoSerializer } from "../../../interfacesapi";
import { ProcessoCRUDAction } from "../../../actions/api/processo";
import { TipoDeSituacaoCRUDAction } from "../../../actions/api/tipoDeSituacao";
import { useDispatch } from "react-redux";
import { useQuery } from "../../../hooks";
import { useLayoutEffect } from "react";
import FormProcesso from "./FormProcesso";
import ListaSituacoes from "./ListaSituacoes";
import AccordionItem from "../../common/AccordionItem";
import { useHistory } from "react-router-dom";
import store from "../../../store";
import { ActionPayload } from "../../../actions/generics/mixins";
import ListaDocumentos from "./ListaDocumentos";

export const destroyProcesso = (_processo: IProcessoSerializer | undefined) => {
  if (_processo !== undefined && _processo.id !== undefined) {
    let newLine = "\r\n";
    let confirm_alert = "Tem certeza que gostaria de deletar este Processo?";
    confirm_alert += newLine;
    confirm_alert += "Protocolo: " + _processo.identificacao;
    if (window.confirm(confirm_alert)) {
      return store.dispatch(
        ProcessoCRUDAction.destroy(_processo.id) as unknown as ActionPayload
      ) as unknown as Promise<any>;
    } else {
      return null;
    }
  }
};

const Processo = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();

  const [processo, setProcesso] = useState<IProcessoSerializer>();
  const [processoID, setProcessoID] = useState<number>();

  useLayoutEffect(() => {
    let processoID = 0;
    let query_id = query.get("id");
    if (query_id != null) {
      let _processoID = parseInt(query_id);
      if (!isNaN(_processoID) && _processoID > 0) {
        processoID = _processoID;
      }
    }
    setProcessoID(processoID);
  }, [query]);

  useEffect(() => {
    setProcesso({
      id: 0,
      identificacao: "",
      auto_infracao: "",
      reclamante: "",
      reclamada: "",
      cpf_cnpj: "",
      ficha_de_atendimento: null,
    });

    if (processoID !== undefined && processoID !== 0) {
      (
        dispatch(
          ProcessoCRUDAction.retrieve(processoID, false)
        ) as unknown as Promise<IProcessoSerializer>
      ).then((data) => {
        setProcesso(data);
      });
    }
  }, [dispatch, processoID]);

  useEffect(() => {
    dispatch(TipoDeSituacaoCRUDAction.list());
  }, [dispatch]);

  const onSubmit = (values: IProcessoSerializer) => {
    if (values.id !== undefined) {
      if (values.id === 0) {
        (
          dispatch(
            ProcessoCRUDAction.create(values, false)
          ) as unknown as Promise<IProcessoSerializer>
        ).then((res) => {
          if (res) {
            history.replace("/processos/processo/?id=" + res.id);
          }
        });
      } else {
        (
          dispatch(
            ProcessoCRUDAction.update(values)
          ) as unknown as Promise<IProcessoSerializer>
        ).then((res) => {
          if (res) {
            history.replace("/processos/processo/?id=" + res.id);
          }
        });
      }
    }
  };

  const onDelete = () => {
    if (destroyProcesso(processo)) {
      history.goBack();
    }
  };

  return (
    <div className="container-xxl">
      <div className="row justify-content-center my-2 my-lg-5">
        <div className="col-lg-9">
          <button
            className="btn btn-primary m-2"
            type="button"
            title="Criar Processo"
            onClick={() => {
              history.goBack();
            }}
          >
            <i className="bi bi-arrow-left me-1"></i> Voltar
          </button>

          {processo && processo.id !== 0 && (
            <button
              className="btn btn-primary m-2"
              type="button"
              title="Criar Processo"
              onClick={() => {
                history.push("/processos/processo/");
              }}
            >
              Novo Processo <i className="bi bi-plus-lg ms-1"></i>
            </button>
          )}

          <Form
            initialValues={processo}
            mutators={{
              setValue: ([field, value], state, { changeValue }) => {
                changeValue(state, field, () => value);
              },
            }}
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
                <div className="w-100 card">
                  <h5 className="card-header text-center">
                    {processo !== undefined
                      ? processo.id !== 0
                        ? "Editar processo " + processo.identificacao
                        : "Criação de Processo"
                      : "Criação de Processo"}
                  </h5>
                  <div className="card-body text-lg-end">
                    <FormProcesso />
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary font-weight-bold"
                        disabled={submitting || pristine}
                      >
                        Salvar
                      </button>

                      {form && (
                        <button
                          type="button"
                          className="btn btn-secondary font-weight-bold ms-1"
                          onClick={() => {
                            form.reset();
                          }}
                          title="Recarregar informações iniciais"
                          disabled={submitting || pristine}
                        >
                          <i className="bi bi-arrow-repeat" />
                        </button>
                      )}

                      {form && processo && processo.id !== 0 ? (
                        <Fragment>
                          <button
                            type="button"
                            className="btn btn-primary font-weight-bold ms-5 d-none"
                            onClick={() => {
                              form.mutators.setValue("id", 0);
                              form.submit();
                            }}
                          >
                            Salvar como Novo
                          </button>

                          <button
                            type="button"
                            className="btn btn-danger font-weight-bold ms-5"
                            onClick={onDelete}
                          >
                            Deletar
                          </button>
                        </Fragment>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </form>
            )}
          />
        </div>
      </div>

      {processo && processo.id !== 0 ? (
        <div className="row justify-content-center my-2 my-lg-5">
          <div className="col-lg-8">
            <div className="accordion mt-2" id="accordionProcesso">
              <AccordionItem
                name="situacoes"
                title="Lista de Locais"
                accordionId="accordionProcesso"
                isOpen={true}
                stayOpen={true}
              >
                <ListaSituacoes processoID={processoID} />
              </AccordionItem>
              <AccordionItem
                name="documentos"
                title="Documentos"
                accordionId="accordionProcesso"
                stayOpen={true}
              >
                <ListaDocumentos processo={processo} processoID={processoID} />
              </AccordionItem>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Processo;
