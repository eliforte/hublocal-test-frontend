export interface ICompany {
  id: string
  name: string
  cnpj: string
  description: string
  created_at: Date
  user_id: string
}

export interface IUserLocalStorage {
  token: string
  name: string
  is_admin: boolean
}

export interface ICompanyForm {
  name: string
  cnpj: string
  description: string
}

export interface ICompanyResponsible {
  full_name: string
  address: string
  address_number: number
  phone_number: number
  cep: string
  complement: string
  is_main_responsable: boolean
}

export interface IInputsCompany {
  company: ICompanyForm
  responsible: ICompanyResponsible
}

export interface ICompanyInitialState {
  message: string
  statuCode: number
  loading: boolean
  result: ICompany[]
  error: string | unknown
  success: boolean
}
