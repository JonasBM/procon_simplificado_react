import axios from "axios";
import { Dispatch } from "redux";
import { IDocumentoSerializer, IProcessoSerializer } from "../../interfacesapi";
import { RootState } from "../../store";
import { returnErrors } from "../actionMessages";
import { tokenConfig } from "../actionUtils";
import { CRUDAction } from "../generics";

export const DocumentoCRUDAction = new CRUDAction(
  "documento",
  process.env.REACT_APP_API_URL + "api/documento/",
  { header: { "Content-Type": "multipart/form-data" } }
);

export const DownloadDocumento =
  (documento: IDocumentoSerializer, newTab = false) =>
  (dispatch: Dispatch, getState: () => RootState) => {
    //fileName = fileName.replace(/[/\\?%*:|"<>,;=]/g, "-");
    let extension = "";
    if (documento.arquivo) {
      extension = documento.arquivo.split(".").pop();
    }

    let axiosConfig = tokenConfig(getState());
    if (axiosConfig) {
      axiosConfig.responseType = "blob";
    }

    let url = documento.arquivo;

    if (!documento.arquivo.startsWith("https")) {
      url = documento.arquivo.replace("http", "https");
    }

    try {
      axios
        .get(url, axiosConfig)
        .then((response) => {
          const file = new Blob([response.data], {
            type: response.headers["content-type"],
          });
          const fileURL = URL.createObjectURL(file);
          var fileLink = document.createElement("a");
          fileLink.href = fileURL;
          if (newTab) {
            fileLink.target = "_blank";
          } else {
            fileLink.download = extension
              ? documento.nome + "." + extension
              : documento.nome;
          }
          fileLink.click();
          URL.revokeObjectURL(fileURL);
        })
        .catch((err) => {
          dispatch(returnErrors(err));
        });
    } catch (err) {
      console.log(err);
    }
  };

export const DownloadDocumentosDoProcesso =
  (processo: IProcessoSerializer) =>
  (dispatch: Dispatch, getState: () => RootState) => {
    let headerWithValues = Object.assign(
      {},
      {
        responseType: "blob",
        params: { processo_id: processo.id },
      },
      tokenConfig(getState())
    );

    try {
      axios
        .get(
          process.env.REACT_APP_API_URL +
            "api/download_documentos_do_processo/",
          headerWithValues
        )
        .then((response) => {
          const file = new Blob([response.data], {
            type: response.headers["content-type"],
          });
          const fileURL = URL.createObjectURL(file);
          var fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.download =
            "documentos_processo_" +
            processo.identificacao?.replace(/[/\\?%*:|"<>#$!`&@{}='+=]/g, "");
          fileLink.click();
          URL.revokeObjectURL(fileURL);
        })
        .catch((err) => {
          dispatch(returnErrors(err));
        });
    } catch (err) {
      console.log(err);
    }
  };
