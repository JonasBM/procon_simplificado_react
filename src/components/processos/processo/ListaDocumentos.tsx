import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  DocumentoCRUDAction,
  DownloadDocumento,
  DownloadDocumentosDoProcesso,
} from "../../../actions/api/documento";
import { useAppSelector } from "../../../hooks";
import {
  IDocumentoSerializer,
  IProcessoSerializer,
  IUserProfileSerializer,
} from "../../../interfacesapi";
import { getFilename, getUserByID } from "../../../utils";
import AccordionItem from "../../common/AccordionItem";
import { destroyComentario } from "../../Modals/ModalFormComentario";
import { destroyDocumento } from "../../Modals/ModalFormDocumento";

const moment = require("moment");

const ListaDocumentos = ({
  processo,
  processoID = 0,
}: {
  processo?: IProcessoSerializer;
  processoID?: number;
}) => {
  const dispatch = useDispatch();
  const documentos = useAppSelector(
    (state) => state.documentos
  ) as IDocumentoSerializer[];

  const authUser = useAppSelector(
    (state) => state.accounts.auth.user
  ) as IUserProfileSerializer;

  useEffect(() => {
    if (processoID !== 0) {
      dispatch(DocumentoCRUDAction.list({ processo_id: processoID }));
    }
  }, [dispatch, processoID]);

  return (
    <div className="container">
      <button
        data-bs-toggle="modal"
        data-bs-target="#ModalFormDocumento"
        data-documento_id={0}
        data-processo_id={processoID}
        className="btn btn-primary mx-1"
        type="button"
        title="Anexar documento"
      >
        Anexar <i className="bi bi-cloud-upload ms-1"></i>
      </button>

      <button
        className="btn btn-primary mx-1"
        type="button"
        title="Baixar todos os documentos"
        onClick={() => {
          if (processo) {
            dispatch(DownloadDocumentosDoProcesso(processo));
          }
        }}
      >
        Baixar todos <i className="bi bi-cloud-download ms-1"></i>
      </button>

      <div className="accordion mt-2" id="accordionDocumentos">
        {documentos
          .filter((documento) => documento.processo === processoID)
          .sort((a, b) =>
            a.ultima_alteracao &&
            b.ultima_alteracao &&
            a.ultima_alteracao > b.ultima_alteracao
              ? -1
              : 1
          )
          .map((documento, index) => {
            const filename = getFilename(documento.arquivo);
            return (
              <AccordionItem
                name={"documento_" + documento.id}
                title={filename.substring(20, filename.length)}
                accordionId="accordionDocumentos"
                stayOpen={true}
                key={documento.id}
                classNameBody="p-2"
                upperTitle={false}
              >
                <div className="row m-1">
                  <div>{documento.descricao}</div>
                  <div>Arquivo: {filename}</div>
                </div>
                <div className="btn-group btn-group-sm mb-1" role="group">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#ModalFormComentario"
                    data-documento_id={documento.id}
                    className="btn btn-success border-dark"
                    type="button"
                    title="Comentar"
                  >
                    Comentar <i className="bi bi-chat-left ms-1"></i>
                  </button>

                  <button
                    className="btn btn-info border-dark"
                    type="button"
                    title="Visualizar"
                    onClick={() => {
                      dispatch(DownloadDocumento(documento, true));
                    }}
                  >
                    Visualizar <i className="bi bi-chat-left ms-1"></i>
                  </button>
                  <button
                    className="btn btn-primary border-dark"
                    type="button"
                    title="Baixar todos os documentos"
                    onClick={() => {
                      dispatch(DownloadDocumento(documento));
                    }}
                  >
                    Baixar{" "}
                    <i className="bi bi-file-earmark-arrow-down ms-1"></i>
                  </button>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#ModalFormDocumento"
                    data-documento_id={documento.id}
                    data-processo_id={processoID}
                    className="btn btn-warning border-dark"
                    type="button"
                    title="Alterar documento"
                  >
                    Alterar <i className="bi bi-file-earmark-arrow-up ms-1"></i>
                  </button>

                  <button
                    className="btn btn-danger border-dark"
                    type="button"
                    title="Deletar Documento"
                    onClick={() => {
                      destroyDocumento(documento);
                    }}
                  >
                    Deletar
                  </button>
                </div>
                <ul className="list-group list-group-flush">
                  {documento.comentarios &&
                    documento.comentarios
                      .sort((a, b) =>
                        a.criado_em && b.criado_em && a.criado_em > b.criado_em
                          ? -1
                          : 1
                      )
                      .map((comentario, index) => {
                        const comentario_owner = getUserByID(comentario.owner);
                        return (
                          <li
                            className="list-group-item text-light py-1"
                            key={comentario.id}
                          >
                            <div className="d-flex w-100 justify-content-between">
                              <span className="mb-1 pre-wrap">
                                <span
                                  className={
                                    "me-1" +
                                    (comentario_owner?.first_name === "Sistema"
                                      ? " text-info"
                                      : " text-warning")
                                  }
                                >
                                  {comentario_owner?.first_name}{" "}
                                  {comentario_owner?.last_name}:
                                </span>
                                {comentario.comentario}
                              </span>
                              <small>
                                {moment(comentario.criado_em).format(
                                  "DD/MM/YYYY HH:mm"
                                )}
                                {(authUser.is_staff ||
                                  comentario.owner === authUser.id) && (
                                  <button
                                    type="button"
                                    className="btn btn-outline-danger border-0 btn-sm"
                                    onClick={() => {
                                      destroyComentario(comentario);
                                    }}
                                    title="Excluir comentário"
                                  >
                                    <i className="bi bi-x-square"></i>
                                  </button>
                                )}
                              </small>
                            </div>
                          </li>
                        );
                      })}
                </ul>
              </AccordionItem>
            );
          })}
      </div>
    </div>
  );
};

export default ListaDocumentos;
