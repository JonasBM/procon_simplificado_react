import React, { Fragment } from "react";

import { CheckboxForm } from "../common/Forms";

const CommonModalFooter = ({
  isDisabled = false,
  canDelete = false,
  canCopy = false,
  onDelete,
  form,
  submitting = false,
  pristine = false,
}: {
  isDisabled?: boolean;
  canDelete?: boolean;
  canCopy?: boolean;
  onDelete: any;
  form: any;
  submitting?: boolean;
  pristine?: boolean;
}) => {
  return (
    <Fragment>
      {canDelete && (
        <button
          type="button"
          className="me-auto btn btn-danger font-weight-bold"
          onClick={onDelete}
          disabled={isDisabled}
        >
          Deletar
        </button>
      )}
      {form && (
        <button
          type="button"
          className="btn btn-secondary font-weight-bold"
          onClick={() => {
            form.reset();
          }}
          title="Recarregar informações iniciais"
          disabled={isDisabled}
        >
          <i className="bi bi-arrow-repeat" />
        </button>
      )}

      <button
        type="button"
        className="btn btn-secondary font-weight-bold"
        data-bs-dismiss="modal"
      >
        Fechar
      </button>

      <button
        type="submit"
        className="btn btn-primary font-weight-bold"
        disabled={isDisabled}
      >
        Salvar
      </button>

      {canCopy && (
        <CheckboxForm
          name="criarnovo"
          label="Criar novo"
          tooltip="Salva como um novo evento"
          disabled={isDisabled}
        />
      )}
    </Fragment>
  );
};

export default CommonModalFooter;
