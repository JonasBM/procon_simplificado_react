import { AxiosRequestConfig } from "axios";
import { RootState } from "../store";

export const formatData = (objeto: any, header: { [key: string]: string }) => {
  if (objeto && header) {
    if (header["Content-Type"] === "multipart/form-data") {
      return Object.keys(objeto).reduce((formData, key) => {
        formData.append(key, objeto[key]);
        return formData;
      }, new FormData());
    }
  }
  return objeto;
};

// Setup config with token - helper function
export const tokenConfig = (
  getState: RootState,
  header: { [key: string]: string } = { "Content-Type": "application/json" }
): AxiosRequestConfig | undefined => {
  // Get token from state
  const token = getState.accounts.auth.token;
  if (token == null) {
    return undefined;
  }
  // Headers
  if (header === undefined) {
    header = { "Content-Type": "application/json" };
  }

  const config = {
    headers: header,
  };
  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};
