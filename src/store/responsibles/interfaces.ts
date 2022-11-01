export interface InputsResponsible {
  company_id: string
  place_id: string
  full_name: string
  address: string
  address_number: number
  phone_number: number
  cep: string
  complement: string
  is_main_responsable: boolean
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
}