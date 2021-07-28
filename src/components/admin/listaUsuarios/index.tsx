import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UserProfileCRUDAction } from "../../../actions/accounts/user";
import { useAppSelector } from "../../../hooks";
import { IUserProfileSerializer } from "../../../interfacesapi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { destroyUsuario } from "../../Modals/ModalFormUsuario";

const Usuarios = () => {
  const dispatch = useDispatch();
  const usuarios = useAppSelector(
    (state) => state.accounts.users
  ) as IUserProfileSerializer[];

  useEffect(() => {
    dispatch(UserProfileCRUDAction.list());
  }, [dispatch]);

  return (
    <div className="container">
      <button
        data-bs-toggle="modal"
        data-bs-target="#ModalFormUsuario"
        data-tipodesituacao_id={0}
        className="btn btn-primary"
        type="button"
        title="Criar Usuário"
      >
        Adicionar <i className="bi bi-plus-lg ms-1"></i>
      </button>

      <table className="table table-dark table-striped table-hover table-sm mt-1">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Usuário</th>
            <th scope="col">Nome</th>
            <th scope="col">Sobrenome</th>
            <th scope="col">Email</th>
            <th scope="col">Administrador</th>
            <th scope="col">Último Login</th>
            <th scope="col">Ativo</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((usuario, index) => {
            return (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.username}</td>
                <td>{usuario.first_name}</td>
                <td>{usuario.last_name}</td>
                <td>{usuario.email}</td>
                <td>{usuario.is_staff ? "Sim" : "Não"}</td>
                <td>{usuario.last_login}</td>
                <td>{usuario.is_active ? "Sim" : "Não"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-warning border-0 btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#ModalFormUsuario"
                    data-usuario_id={usuario.id}
                    title="Editar Usuário"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger border-0 btn-sm"
                    onClick={() => {
                      destroyUsuario(usuario);
                    }}
                    title="Excluir Usuário"
                  >
                    <i className="bi bi-x-square"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
