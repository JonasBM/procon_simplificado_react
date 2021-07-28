import React from "react";
import { Form } from "react-final-form";
import { useHistory } from "react-router-dom";
import { serialize } from "../../../../utils";
import AccordionItem from "../../../common/AccordionItem";
import FormFiltroProcesso from "./FormFiltroProcesso";

const FiltroProcesso = ({
  searchParams,
}: {
  searchParams: object | undefined;
}) => {
  const history = useHistory();

  const onSubmit = (values: object) => {
    let url = "?page=1";
    let query_string = serialize(values);
    if (query_string) {
      url += "&" + query_string;
    }
    history.push(url);
  };

  return (
    <div className="row mb-3">
      <div className="accordion mt-2" id="filtroProcesso">
        <AccordionItem
          name="Filtros"
          title="Filtros"
          accordionId="filtroProcesso"
        >
          <div>
            <Form
              initialValues={searchParams}
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
                  <FormFiltroProcesso />
                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary font-weight-bold"
                      disabled={submitting || pristine}
                    >
                      Aplicar filtro
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
                  </div>
                </form>
              )}
            />
          </div>
        </AccordionItem>
      </div>
    </div>
  );
};

export default FiltroProcesso;
