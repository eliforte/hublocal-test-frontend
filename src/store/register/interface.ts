export interface IRegisterResponse {
  id: string
  name: string
  email: string
  password: string
  is_admin: boolean
}

export interface RegisterInitialState {
  message: string
  statuCode: number
  loading: boolean
  result: IRegisterResponse
  error: string | unknown
  success: boolean
}

export interface IRegisterInput {
  name: string
  email: string
  password: string
}
