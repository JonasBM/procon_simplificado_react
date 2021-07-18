import React from "react";
import { Field } from "react-final-form";
import { required, Error } from "./Forms";

export const InputFormFloat = ({ isHidden = false, ...props }) => {
  let className = "form-control form-control-sm";
  if (props.className !== undefined) {
    className += " " + props.className;
    delete props.className;
  }
  let classNameDiv = "form-floating mb-0";
  if (props.classNameDiv !== undefined) {
    classNameDiv += " " + props.classNameDiv;
    delete props.classNameDiv;
  }

  let id = "id_" + props.name;
  if (props.id !== undefined) {
    id = props.id;
    delete props.id;
  }

  let validate = props.validate;
  if (props.required) {
    validate = required;
  }

  return (
    <div className={isHidden ? "d-none" : classNameDiv}>
      <Field
        component="input"
        type="text"
        {...props}
        className={className}
        id={id}
        name={props.name}
        validate={validate}
      />
      <Error name={props.name} />
      {props.label && (
        <label htmlFor={id} className="mb-0">
          {props.label}
        </label>
      )}
    </div>
  );
};
