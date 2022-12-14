export interface InputsResponsible {
  id: string | undefined
  company_id: string | undefined
  place_id: string | undefined
  full_name: string
  address: string
  address_number: number
  phone_number: number
  cep: string
  complement: string
  is_main_responsable: boolean
}

export interface IUserLocalStorage {
  token: string
  name: string
  is_admin: boolean
}

export interface IResponsibleInitialState {
  message: string
  statuCode: number
  loading: boolean
  result: IResponsible[]
  error: string | unknown
  success: boolean
}

export interface IResponsible {
  id: string
  company_id?: string
  place_id?: string
  full_name: string
  address: string
  address_number: number
  phone_number: number
  cep: string
  complement: string
  is_main_responsable: boolean
  created_at: Date
  company?: {
    id: string
    name: string
  }
  place?: {
    id: string
    name: string
  }
}

export interface IResponsibleResponse {
  message: string
  statuCode: number
  result: IResponsible[]
}

export interface IOneResponsibleResponse {
  message: string
  statuCode: number
  result: IResponsible
}
