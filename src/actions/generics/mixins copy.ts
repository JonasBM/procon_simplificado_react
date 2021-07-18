import axios from "axios";
import { returnErrors } from "../actionMessages";
import { formatData, tokenConfig } from "../../actions/actionUtils";
import { Dispatch, Action } from "redux";
import { RootState } from "../../store";
import { ThunkAction } from "redux-thunk";

export type AppThunk = ThunkAction<any, RootState, null, Action<any>>;

var names: string[] = [];

type PayloadType = {
  id: number;
};

type PayloadPageType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PayloadType[];
};

type ActionPayload = {
  type: string;
  payload: PayloadPageType | PayloadType | number;
};

export class BaseMixin {
  name: string;
  url: string;
  types: {
    LIST_OPTIONS: string;
    LIST_HEAD: string;
    LIST: string;
    CREATE: string;
    RETRIEVE: string;
    UPDATE: string;
    DESTROY: string;
  };

  header: { [key: string]: string };
  initialState: PayloadPageType;
  useAuthentication: boolean;

  constructor(
    name: string,
    url: string,
    options: {
      header?: { [key: string]: string };
      initialState?: PayloadPageType;
      useAuthentication?: boolean;
    } = {
      header: { "Content-Type": "application/json" },
      initialState: { count: 0, next: null, previous: null, results: [] },
      useAuthentication: true,
    }
  ) {
    if (names.includes(name)) {
      throw new Error(
        'name: "' + name + '" already exists. name must be unique.'
      );
    } else {
      names.push(name);
      this.name = name;
      this.url = url;
    }
    this.types = {
      LIST_OPTIONS: "LIST_OPTIONS" + this.name.toUpperCase(),
      LIST_HEAD: "LIST_HEAD" + this.name.toUpperCase(),
      LIST: "LIST_" + this.name.toUpperCase(),
      CREATE: "CREATE_" + this.name.toUpperCase(),
      RETRIEVE: "RETRIEVE_" + this.name.toUpperCase(),
      UPDATE: "UPDATE_" + this.name.toUpperCase(),
      DESTROY: "DESTROY_" + this.name.toUpperCase(),
    };
    this.header =
      options.header !== undefined
        ? options.header
        : { "Content-Type": "application/json" };
    this.initialState =
      options.initialState !== undefined
        ? options.initialState
        : { count: 0, next: null, previous: null, results: [] };
    this.useAuthentication =
      options.useAuthentication !== undefined
        ? options.useAuthentication
        : true;
  }

  reducer = (
    state: PayloadPageType = this.initialState,
    action: ActionPayload
  ): PayloadPageType => {
    let payload_page: PayloadPageType;
    let payload_instance: PayloadType;
    let payload_id: number;
    switch (action.type) {
      case this.types.LIST:
        if (action.payload.hasOwnProperty("count")) {
          payload_page = action.payload as PayloadPageType;
          return payload_page;
        }
        throw new Error(
          "List received not a array object (payload[]) in generics.mixins.reducer|LIST"
        );
      case this.types.CREATE:
        payload_instance = action.payload as PayloadType;
        return {
          ...state,
          results: [...state.results.concat(payload_instance)],
        };
      case this.types.RETRIEVE:
        payload_instance = action.payload as PayloadType;
        return {
          ...state,
          results: [
            ...state.results.map((o) =>
              o.id === payload_instance.id ? payload_instance : o
            ),
          ],
        };
      case this.types.UPDATE:
        payload_instance = action.payload as PayloadType;
        return {
          ...state,
          results: [
            ...state.results.map((o) =>
              o.id === payload_instance.id ? payload_instance : o
            ),
          ],
        };
      case this.types.DESTROY:
        if (typeof action.payload == "number") {
          payload_id = action.payload as number;
          return {
            ...state,
            results: [...state.results.filter((o) => o.id !== payload_id)],
          };
        }
        throw new Error(
          "Destroy received not a number(id) in generics.mixins.reducer|DESTROY"
        );
      default:
        return state;
    }
  };

  // LIST_OPTIONS
  listOptions() {
    return (dispatch: Dispatch, getState: () => RootState): void => {
      axios
        .options(
          this.url,
          this.useAuthentication
            ? tokenConfig(getState(), this.header)
            : this.header
        )
        .then((res) => {
          dispatch({
            type: this.types.LIST_OPTIONS,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch(returnErrors(err));
        });
    };
  }

  //LIST_HEAD
  listHead() {
    return (dispatch: Dispatch, getState: () => RootState): void => {
      axios
        .head(
          this.url,
          this.useAuthentication
            ? tokenConfig(getState(), this.header)
            : this.header
        )
        .then((res) => {
          dispatch({
            type: this.types.LIST_HEAD,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch(returnErrors(err));
        });
    };
  }
}

export class ListMixin extends BaseMixin {
  list(object: any = undefined) {
    console.log("list ");
    return (dispatch: Dispatch, getState: () => RootState) => {
      let headerWithValues = Object.assign(
        {},
        { params: formatData(object, this.header) },
        this.useAuthentication
          ? tokenConfig(getState(), this.header)
          : this.header
      );
      axios
        .get(this.url, headerWithValues)
        .then((res) => {
          dispatch({
            type: this.types.LIST,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch(returnErrors(err));
        });
    };
  }
}

export class CreateMixin extends BaseMixin {
  create(object: any) {
    return (dispatch: Dispatch, getState: () => RootState) => {
      axios
        .post(
          this.url,
          formatData(object, this.header),
          this.useAuthentication
            ? tokenConfig(getState(), this.header)
            : this.header
        )
        .then((res) => {
          dispatch({
            type: this.types.CREATE,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch(returnErrors(err));
        });
    };
  }
}

export class RetrieveMixin extends BaseMixin {
  retrieve(id: number) {
    return (dispatch: Dispatch, getState: () => RootState) => {
      axios
        .get(
          this.url + id + "/",
          this.useAuthentication
            ? tokenConfig(getState(), this.header)
            : this.header
        )
        .then((res) => {
          dispatch({
            type: this.types.RETRIEVE,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch(returnErrors(err));
        });
    };
  }
}

export class UpdateMixin extends BaseMixin {
  update(object: any) {
    return (dispatch: Dispatch, getState: () => RootState): void => {
      if (!object.id) {
        return;
      }
      axios
        .patch(
          this.url + object.id + "/",
          formatData(object, this.header),
          this.useAuthentication
            ? tokenConfig(getState(), this.header)
            : this.header
        )
        .then((res) => {
          dispatch({
            type: this.types.UPDATE,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch(returnErrors(err));
        });
    };
  }
}

export class DestroyMixin extends BaseMixin {
  destroy(id: number) {
    return (dispatch: Dispatch, getState: () => RootState): void => {
      axios
        .delete(
          this.url + id + "/",
          this.useAuthentication
            ? tokenConfig(getState(), this.header)
            : this.header
        )
        .then((res) => {
          dispatch({
            type: this.types.DESTROY,
            payload: id,
          });
        })
        .catch((err) => {
          dispatch(returnErrors(err));
        });
    };
  }
}
