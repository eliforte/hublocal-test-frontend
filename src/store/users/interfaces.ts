export interface IInputLogin {
  email: string
  password: string
}

export interface IUserLocalStorage {
  token: string
  name: string
  is_admin: boolean
}

export interface ILoginResponse {
  token: string
  name: string
  is_admin: boolean
}

export interface IUserInitialState {
  message: string
  statuCode: number
  result: IUser[]
  error: string | unknown
  login: {
    is_admin: boolean
    name: string
    token: string
  }
  loading: boolean
  success: boolean | undefined
}

export interface IUser {
  id: string
  name: string
  email: string
  is_admin: boolean
  created_at?: Date
  password?: string
}

export interface IRegisterInput {
  name: string
  email: string
  password: string
}

export interface IInputsEditUser {
  name?: string
  email?: string
  password?: string
  is_admin?: boolean
}

export interface IUsersResponse {
  message: string
  result: IUser[]
  statusCode: number
}
