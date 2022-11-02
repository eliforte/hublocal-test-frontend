export interface ITicket {
  id: string
  title: string
  created_at: Date | string
  update_at: Date | string
  created_by_user: string
  upgradable_by_user: string
  status: string
  address: string
  address_number: number
  cep: string
  complement: string
  name: string
}

export interface IUserLocalStorage {
  token: string
  name: string
  is_admin: boolean
}

export interface ITicketsInitialState {
  message: string
  statuCode: number
  loading: boolean
  result: ITicket[]
  error: string | unknown
  success: boolean
}

export interface ITicketInputs {
  upgradable_by_user: string
  status: string
  address: string
  address_number: number
  cep: string
  complement: string
  name: string
}
