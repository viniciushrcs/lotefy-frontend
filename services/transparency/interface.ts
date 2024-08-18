export interface EnterpriseDto {
  empreendimento_id: string
  nome: string
  spe_pj_id: string
  vgv: string
  spe_constituida: boolean
  imovel_integralizado: boolean
  imovel_id: string
  user_id: string
  imovel: Imovel
  spe_data: SpeData
  user: User
  documentos: any[]
}

export interface Imovel {
  corretor: any
  endereco: Endereco[]
  imovel_id: string
  matricula: string
  corretor_id: any
  imobiliaria: Imobiliaria
  imobiliaria_id: string
  proprietario_id: string
  proprietario_tipo: string
  imovel_status_negociacao: string
  proprietario: Proprietario
}

export interface Endereco {
  uf: string
  rua: string
  pf_id: any
  pj_id: any
  bairro: string
  cidade: string
  numero: string
  imovel_id: string
  complemento: string
  endereco_id: string
}

export interface Imobiliaria {
  cnae: string
  cnpj: string
  email: any
  pj_id: string
  funcionarios: any
  razao_social: string
  nome_fantasia: any
  data_de_abertura: string
}

export interface Proprietario {
  pj_id: string
  cnpj: string
  cpf: string
  razao_social: string
  funcionarios: any
  cnae: string
  email: any
  nome_fantasia: any
  data_de_abertura: string
}

export interface SpeData {
  cnae: string
  cnpj: string
  email: any
  pj_id: string
  pj_socios: PjSocios[]
  funcionarios: any
  razao_social: string
  nome_fantasia: string
  data_de_abertura: string
  documentos: any[]
}

export interface PjSocios {
  id: string
  pf_id?: string
  pj_id?: string
  pf_socio?: PfSocio
  pj_socio?: PjSocio
  pj_socio_id: string
  participacao: string
}

export interface PfSocio {
  rg: any
  cpf: string
  creci: any
  pf_id: string
  celular: any
  user_id: any
  profissao: any
  cpf_conjuge: any
  estado_civil: any
  nome_conjuge: any
  email_conjuge: any
  nacionalidade: any
}

export interface PjSocio {
  cnae: string
  cnpj: string
  email: any
  pj_id: string
  funcionarios: any
  razao_social: string
  nome_fantasia: any
  data_de_abertura: string
}

export interface User {
  nome: string
  email: string
  pf_data: any[]
  user_id: string
  user_pj: any[]
  criado_em: string
  user_roles: UserRole[]
}

export interface UserRole {
  role_id: number
  user_id: string
  user_roles_id: string
}

