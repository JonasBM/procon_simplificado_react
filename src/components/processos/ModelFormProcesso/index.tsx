import React, { useEffect, useState } from "react";
import store from "../../../store";
import FormUser from "./FormProcesso";

// export default function ModalFormUser() {
//   const [user, setUser] = useState();

//   const handleShowModal = (e) => {
//     const users = store.getState().user.userprofiles.users;
//     let user;
//     if (e.relatedTarget.dataset.user_id !== "0") {
//       user = users.find(
//         (user) => user.id.toString() === e.relatedTarget.dataset.user_id
//       );
//     }
//     if (user !== undefined) {
//       setUser(user);
//     } else {
//       setUser({
//         id: 0,
//         username: "",
//         first_name: "",
//         last_name: "",
//         email: "",
//         is_staff: false,
//         is_active: true,
//         profile: {
//           matricula: "",
//           user_type: "PA",
//         },
//         resethack: [],
//       });
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("show.bs.modal", handleShowModal);
//     return () => window.removeEventListener("show.bs.modal", handleShowModal);
//   }, []);

//   return (
//     <div
//       id="ModalUser"
//       className="modal fade"
//       tabIndex="-1"
//       role="dialog"
//       aria-hidden="true"
//       data-bs-backdrop="static"
//     >
//       <div className="modal-dialog" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title font-weight-bold">
//               {user !== undefined
//                 ? user.id !== 0
//                   ? "Editar " + user.username
//                   : "Novo usuário"
//                 : "Novo usuário"}
//             </h5>
//             <button
//               type="button"
//               className="close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//             >
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <FormUser user={user} />
//         </div>
//       </div>
//     </div>
//   );
// }
