import {
  ISituacaoSerializer,
  ITipo_de_situacaoSerializer,
  IUserProfileSerializer,
} from "./interfacesapi";
import store from "./store";

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  for (let i = 0, len = baseCtors.length; i < len; i++) {
    const baseCtor = baseCtors[i];
    const propertyKeys = Object.getOwnPropertyNames(baseCtor.prototype);
    for (let j = 0, len2 = propertyKeys.length; j < len2; j++) {
      const name = propertyKeys[j];
      if (name !== "constructor") {
        derivedCtor.prototype[name] = baseCtor.prototype[name];
      }
    }
  }
}

export function formatDate(date: Date): string {
  //2018-06-12
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2)
  );
}

export function formatDateTime(date: Date): string {
  //2018-06-12T19:30
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2) +
    "T" +
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2)
  );
}

export function serialize(object: object) {
  var str = [];
  for (const key in object)
    if (object.hasOwnProperty(key)) {
      str.push(
        encodeURIComponent(key) +
          "=" +
          encodeURIComponent(object[key as keyof object])
      );
    }
  return str.join("&");
}

export function getTipoDeSituacaoByID(
  id: number
): ITipo_de_situacaoSerializer | undefined {
  if (id > 0) {
    const tiposdesituacoes = store.getState()
      .tiposdesituacoes as ITipo_de_situacaoSerializer[];

    let tiposdesituacao = tiposdesituacoes.find((e) => e.id === id);
    return tiposdesituacao;
  }
}

export function getTipoDeSituacaoBySituacao(
  situacao: ISituacaoSerializer
): ITipo_de_situacaoSerializer | undefined {
  return getTipoDeSituacaoByID(situacao.tipo_de_situacao);
}

export function getUserByID(id: number): IUserProfileSerializer | undefined {
  if (id > 0) {
    const userslist = store.getState().accounts
      .userslist as IUserProfileSerializer[];
    let user = userslist.find((e) => e.id === id);
    return user;
  }
}

export function getFilename(fullPath: string): string {
  if (fullPath) {
    const startIndex =
      fullPath.indexOf("\\") >= 0
        ? fullPath.lastIndexOf("\\")
        : fullPath.lastIndexOf("/");
    const filename = fullPath.substring(startIndex);
    if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
      return filename.substring(1);
    }
  }
  return "";
}
