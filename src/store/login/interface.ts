export interface ILoginInput {
  email: string
  password: string
}

export interface LoginInitialState {
  message: string
  statuCode: number
  loading: boolean
  result: {
    name: string
    is_admin: boolean
    token: string
  }
  error: string | unknown
  success: boolean
}

export interface ILoginResponse {
  token: string
  name: string
  is_admin: boolean
}

export interface IAuthError {
  code: string
  message: string
  id: string
}
