export interface IUserSerializer {
  id?: number;
  first_name?: string;
  last_name?: string;
}

export interface IProfileSerializer {
  matricula?: string | null;
}

export interface IUserProfileSerializer {
  id: number;
  profile?: IProfileSerializer;
  last_login?: string;
  date_joined?: string;
  is_superuser?: boolean;
  username: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  is_staff?: boolean;
  is_active?: boolean;
  groups?: any[];
  user_permissions?: any[];
  resethack?: [];
}

export interface IChangePasswordSerializer {
  old_password: string;
  new_password: string;
}

export interface ITipo_de_situacaoSerializer {
  id: number;
  ordem: number;
  nome: string;
  css_cor: string;
  descricao?: string | null;
  resethack?: [];
}

export interface ISituacaoSerializer {
  id: number;
  processo?: any;
  tipo_de_situacao: any;
  data?: string;
  comentario?: string | null;
  resethack?: [];
}

export interface IProcessoSerializer {
  id: number;
  criado_em?: string;
  identificacao?: string | null;
  auto_infracao?: string | null;
  reclamante?: string | null;
  reclamada?: string | null;
  cpf_cnpj?: string | null;
  ficha_de_atendimento?: string | null;
  ultima_situacao?: ISituacaoSerializer;
}

export interface IComentarioDocumentoSerializer {
  id: number;
  documento: any;
  owner?: any;
  comentario: string;
  criado_em?: string;
  resethack?: [];
}

export interface IDocumentoSerializer {
  id: number;
  processo: any;
  arquivo?: any;
  nome: any;
  descricao?: string | null;
  criado_em?: string;
  ultima_alteracao?: string;
  comentarios?: IComentarioDocumentoSerializer[];
  resethack?: [];
}
