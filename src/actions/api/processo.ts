import { Dispatch } from "redux";
import { RootState } from "../../store";
import { CRUDAction } from "../generics";
import { formatData, tokenConfig } from "../actionUtils";
import axios from "axios";
import { returnErrors } from "../actionMessages";
import moment from "moment";

export const ProcessoCRUDAction = new CRUDAction(
  "processo",
  process.env.REACT_APP_API_URL + "api/processo/",
  { paginated: true }
);

export const DownloadTodosProcessos =
  () => (dispatch: Dispatch, getState: () => RootState) => {
    let headerWithValues = Object.assign(
      {},
      {
        responseType: "blob",
      },
      tokenConfig(getState())
    );

    try {
      axios
        .get(
          process.env.REACT_APP_API_URL + "api/download_todos_processos/",
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
            "Procon_Simplificado" + moment().format("YYYY-MM-DD") + ".xlsx";
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

export const ExportarProcessos =
  (object: { planilha: any }) =>
  (dispatch: Dispatch, getState: () => RootState) => {
    const header = { "Content-Type": "multipart/form-data" };
    try {
      axios
        .put(
          process.env.REACT_APP_API_URL + "api/exportar_processos/",
          formatData(object, header),
          tokenConfig(getState(), header)
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          dispatch(returnErrors(err));
        });
    } catch (err) {
      console.log(err);
    }
  };
