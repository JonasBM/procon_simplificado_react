import React from "react";
import { Form } from "react-final-form";
import {
  CheckboxFormGroup,
  SelectFormGroup,
  required,
} from "../../common/Forms";

import { useDispatch } from "react-redux";
import { Fragment } from "react";

// const FormUser = ({ user }) => {
//   const dispatch = useDispatch();

//   const onDelete = () => {
//     let newLine = "\r\n";
//     let confirm_alert = "Tem certeza que gostaria de deletar este Usuário?";
//     confirm_alert += newLine;
//     confirm_alert += "Usuário: " + user.username;
//     if (window.confirm(confirm_alert)) {
//       dispatch(actionCRUDUserProfile.delete(user.id));
//       bootstrap.Modal.getInstance(document.getElementById("ModalUser")).hide();
//     }
//   };

//   const onSubmit = (values) => {
//     let closeModal = false;
//     if (values.id !== undefined) {
//       if (values.password === undefined || values.password === "") {
//         delete values["password"];
//       }
//       if (values.id === 0) {
//         dispatch(actionCRUDUserProfile.create(values));
//         closeModal = true;
//       } else {
//         dispatch(actionCRUDUserProfile.update(values));
//         closeModal = true;
//       }
//     }
//     if (closeModal) {
//       bootstrap.Modal.getInstance(document.getElementById("ModalUser")).hide();
//     }
//   };
//   return (
//     <Form
//       initialValues={user}
//       onSubmit={onSubmit}
//       render={({ handleSubmit, form }) => (
//         <form onSubmit={handleSubmit} className="needs-validation" noValidate>
//           <div className="modal-body container">
//             <div className="container">
//               <div className="form-inline">
//                 <InputFormGroup
//                   name="username"
//                   label="Usuário:"
//                   className="m-1"
//                   validate={required}
//                   format={(value) => (value ? value.toLowerCase() : "")}
//                 />
//               </div>
//               <div className="form-inline">
//                 <InputFormGroup
//                   name="first_name"
//                   label="Nome:"
//                   className="m-1"
//                   validate={required}
//                 />
//               </div>
//               <div className="form-inline">
//                 <InputFormGroup
//                   name="last_name"
//                   label="Sobrenome:"
//                   className="m-1"
//                 />
//               </div>
//               <div className="form-inline">
//                 <InputFormGroup name="email" label="Email:" className="m-1" />
//               </div>
//               <div className="form-inline">
//                 <InputFormGroup
//                   name="profile.matricula"
//                   label="Matrícula:"
//                   className="m-1"
//                 />
//               </div>

//               <CheckboxFormGroup name="is_staff" label="Administrador" />
//               <div className="form-inline">
//                 <SelectFormGroup
//                   name="profile.user_type"
//                   label="Tipo:"
//                   className="m-1"
//                   classNameDiv="mx-1"
//                   validate={required}
//                   defaultValue={UserTypes.AS}
//                 >
//                   {Object.keys(UserTypes).map((key, index) => (
//                     <option key={index} value={key}>
//                       {UserTypes[key]}
//                     </option>
//                   ))}
//                 </SelectFormGroup>
//               </div>
//               <CheckboxFormGroup name="is_active" label="Ativo" />
//               <div className="form-inline">
//                 <InputFormGroup
//                   name="password"
//                   label="Senha:"
//                   className="m-1"
//                   validate={(value) =>
//                     value
//                       ? value.length >= 4
//                         ? undefined
//                         : "A senha deve ter ao menos 6 caracteres"
//                       : undefined
//                   }
//                 />
//               </div>
//               <span>
//                 Obs.: Senha em branco não irá alterar a senha do usuário.
//               </span>
//             </div>
//           </div>
//           <CommonModalFooter
//             canDelete={
//               user !== undefined ? (user.id !== 0 ? true : false) : false
//             }
//             canCopy={false}
//             onDelete={onDelete}
//             form={form}
//           />
//         </form>
//       )}
//     />
//   );
// };

// export default FormUser;
export default Fragment;
