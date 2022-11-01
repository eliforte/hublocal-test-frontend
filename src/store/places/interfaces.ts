
export interface IInputsPlace {
  place: {
    name: string
    address: string
    address_number: number
    complement: string
    cep: string
  }
  responsible: {
    full_name: string
    address: string
    address_number: number
    phone_number: number
    cep: string
    complement: string
    is_main_responsable: boolean
  }
  company_id: string
}

export interface IPlace {
  id: string
  name: string
  address: string
  address_number: number
  complement: string
  cep: string
  created_at: Date
}

export interface IPlaceInitialState {
  message: string
  statuCode: number
  loading: boolean
  result: IPlace[]
  error: string | unknown
  success: boolean
}
