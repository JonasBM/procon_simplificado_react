import React, { Fragment, useRef, useState } from "react";
import { Field, FieldProps, useFormState } from "react-final-form";
//import { useAppSelector } from "../../hooks";

export const required = (value: any) =>
  value ? undefined : "Campo obrigatório";

interface FieldPropsWithInnerRef extends FieldProps<any, any> {
  innerRefs?: React.MutableRefObject<any>[];
}

const errorKeys: string[] = [
  "badInput",
  "patternMismatch",
  "rangeOverflow",
  "rangeUnderflow",
  "stepMismatch",
  "tooLong",
  "tooShort",
  "typeMismatch",
  "valueMissing",
];

const defaultErrors: { [key: string]: string } = {
  badInput: "Campo inválido",
  patternMismatch: "Campo fora do padrão esperado",
  rangeOverflow: "Valor muito alto",
  rangeUnderflow: "Valor muito baixo",
  stepMismatch: "Valor inválido",
  tooLong: "Texto muito longo",
  tooShort: "Texto muito curto",
  typeMismatch: "Campo fora do padrão esperado",
  valueMissing: "Campo obrigatório",
};

const defaultErrorsValues: { [key: string]: any } = {
  patternMismatch: "pattern",
  rangeOverflow: "max",
  rangeUnderflow: "min",
  stepMismatch: "step",
  tooLong: "maxLength",
  tooShort: "minLength",
};

export const Error = ({ name, innerRefs }: FieldPropsWithInnerRef) => {
  //const serverError = useAppSelector((state) => state.errors.msg[name]);
  //const serverError = {};
  let formState = useFormState();
  return (
    <Field
      name={name}
      subscription={{ error: true, touched: true, valid: true }}
    >
      {({ meta: { error, touched } }) => {
        let HTML5error: string | undefined = undefined;
        if (innerRefs !== undefined) {
          for (const innerRef of innerRefs) {
            if (innerRef.current) {
              const currentInput = innerRef.current;
              const validity: ValidityState[] = currentInput.validity;
              const internalHTML5errorKey =
                validity &&
                errorKeys.find((key: any | undefined) => validity[key]);
              if (!HTML5error && internalHTML5errorKey) {
                HTML5error = defaultErrors[internalHTML5errorKey];
                let HTML5errorValue =
                  currentInput[defaultErrorsValues[internalHTML5errorKey]];
                switch (internalHTML5errorKey) {
                  case "patternMismatch":
                    HTML5error += ", padrão esperado: " + HTML5errorValue;
                    break;
                  case "rangeOverflow":
                    HTML5error += ", valor máximo: " + HTML5errorValue;
                    break;
                  case "rangeUnderflow":
                    HTML5error += ", valor mínimo: " + HTML5errorValue;
                    break;
                  case "stepMismatch":
                    HTML5error += ", variação permitida: " + HTML5errorValue;
                    break;
                  case "tooLong":
                    HTML5error +=
                      ", máximo de " + HTML5errorValue + " caracteres";
                    break;
                  case "tooShort":
                    HTML5error +=
                      ", mínimo de " + HTML5errorValue + " caracteres";
                    break;
                  default:
                    break;
                }
              }

              currentInput.setCustomValidity(
                // error ? error : serverError ? serverError : ""
                error ? error : ""
              );
            }
          }
          // error =
          //   !error && HTML5error
          //     ? HTML5error
          //     : serverError
          //     ? serverError
          //     : error;
          error = !error && HTML5error ? HTML5error : error;
        }
        error && formState.errors && (formState.errors[name] = error);
        return error && touched ? (
          <div className="invalid-feedback text-start">{error}</div>
        ) : null;
      }}
    </Field>
  );
};

export const InputForm = ({ ref, ...props }: FieldProps<any, any>) => {
  let className = "form-control form-control-sm";
  if (props.className !== undefined) {
    className += " " + props.className;
    delete props.className;
  }

  let classNameDiv = "";
  if (props.classNameDiv !== undefined) {
    classNameDiv += " " + props.classNameDiv;
    delete props.classNameDiv;
  }

  let classNameLabel = "col-form-label col-form-label-sm";
  if (props.classNameLabel !== undefined) {
    classNameLabel += " " + props.classNameLabel;
    delete props.classNameLabel;
  }

  let id = "id_" + props.name;
  if (props.id !== undefined) {
    id = props.id;
    delete props.id;
  }

  const inputRef: React.MutableRefObject<any> = useRef();
  return (
    <Fragment>
      {props.label && (
        <label htmlFor={id} className={classNameLabel}>
          {props.label}
        </label>
      )}
      <div className={classNameDiv}>
        <Field
          component="input"
          type="text"
          {...props}
          className={className}
          id={id}
          name={props.name}
          ref={inputRef}
        />
        <Error name={props.name} innerRefs={[inputRef]} />
      </div>
    </Fragment>
  );
};

export const FileField = ({
  ref,
  validate,
  ...props
}: FieldProps<any, any>) => {
  let className = "form-control form-control-sm";
  if (props.className !== undefined) {
    className += " " + props.className;
    delete props.className;
  }

  let classNameDiv = "";
  if (props.classNameDiv !== undefined) {
    classNameDiv += " " + props.classNameDiv;
    delete props.classNameDiv;
  }

  let classNameLabel = "col-form-label col-form-label-sm";
  if (props.classNameLabel !== undefined) {
    classNameLabel += " " + props.classNameLabel;
    delete props.classNameLabel;
  }

  let id = "id_" + props.name;
  if (props.id !== undefined) {
    id = props.id;
    delete props.id;
  }

  const [label, setLabel] = useState(props.label);
  const inputRef: React.MutableRefObject<any> = useRef();
  return (
    <Fragment>
      {props.label && (
        <label htmlFor={id} className={classNameLabel}>
          {props.label}
        </label>
      )}
      <div className={classNameDiv}>
        <Field name={props.name} validate={validate}>
          {({ input: { value, onChange, ...input } }) => (
            <input
              {...input}
              type="file"
              onChange={({ target }) => {
                if (target.files) {
                  onChange(target.files[0]);
                  if (target.files[0] !== undefined) {
                    setLabel(target.files[0].name);
                  } else {
                    setLabel(props.label);
                  }
                }
              }}
              {...props}
              className={className}
              id={id}
              name={props.name}
              ref={inputRef}
            />
          )}
        </Field>
        <Error name={props.name} innerRefs={[inputRef]} />
      </div>
    </Fragment>
  );
};

export const SelectForm = ({ ref, ...props }: FieldProps<any, any>) => {
  let className = "form-select form-select-sm";
  if (props.className !== undefined) {
    className += " " + props.className;
    delete props.className;
  }

  let classNameDiv = "";
  if (props.classNameDiv !== undefined) {
    classNameDiv += " " + props.classNameDiv;
    delete props.classNameDiv;
  }

  let classNameLabel = "col-form-label col-form-label-sm";
  if (props.classNameLabel !== undefined) {
    classNameLabel += " " + props.classNameLabel;
    delete props.classNameLabel;
  }

  let id = "id_" + props.name;
  if (props.id !== undefined) {
    id = props.id;
    delete props.id;
  }

  const inputRef: React.MutableRefObject<any> = useRef();
  return (
    <Fragment>
      {props.label && (
        <label htmlFor={id} className={classNameLabel}>
          {props.label}
        </label>
      )}
      <div className={classNameDiv}>
        <Field
          component="select"
          {...props}
          className={className}
          id={id}
          name={props.name}
          ref={inputRef}
        />
        <Error name={props.name} innerRefs={[inputRef]} />
      </div>
    </Fragment>
  );
};

export const CheckboxForm = ({ ref, ...props }: FieldProps<any, any>) => {
  let className = "custom-control-input";
  if (props.className !== undefined) {
    className += " " + props.className;
    delete props.className;
  }

  let classNameDiv = "custom-control custom-checkbox";
  if (props.classNameDiv !== undefined) {
    classNameDiv += " " + props.classNameDiv;
    delete props.classNameDiv;
  }

  let classNameLabel = "col-form-label col-form-label-sm ms-1";
  if (props.classNameLabel !== undefined) {
    classNameLabel += " " + props.classNameLabel;
    delete props.classNameLabel;
  }

  let id = "id_" + props.name;
  if (props.id !== undefined) {
    id = props.id;
    delete props.id;
  }

  const inputRef: React.MutableRefObject<any> = useRef();
  return (
    <Fragment>
      <div className={classNameDiv}>
        <Field
          component="input"
          type="checkbox"
          {...props}
          className={className}
          id={id}
          name={props.name}
          ref={inputRef}
        />
        {props.label && (
          <label htmlFor={id} className={classNameLabel}>
            {props.label}
          </label>
        )}
        <Error name={props.name} innerRefs={[inputRef]} />
      </div>
    </Fragment>
  );
};

export const ComboboxFormGroup = ({ isHidden = false, ...props }) => {
  let className = "form-control form-control-sm";
  if (props.className !== undefined) {
    className += " " + props.className;
  }
  let id = "id_" + props.name;
  if (props.id !== undefined) {
    id = props.id;
    delete props.id;
  }
  const { children, ...childprops } = props;
  return (
    <div className={props.isHidden ? "d-none" : "form-group mb-0"}>
      {props.label && (
        <label htmlFor={id} className="mb-0">
          {props.label}
        </label>
      )}
      <Field
        component="input"
        type="text"
        {...childprops}
        className={className}
        id={id}
        name={props.name}
        list={id + "_list"}
      />
      <datalist id={id + "_list"}>{children}</datalist>
      <Error name={props.name} />
    </div>
  );
};

export const ToogleFieldSet = ({ isDisabled = false, ...props }) => {
  if (isDisabled) {
    return <fieldset disabled>{props.children}</fieldset>;
  } else {
    return <fieldset>{props.children}</fieldset>;
  }
};
