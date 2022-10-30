interface IUserLocalStorage {
  token: string
  name: string
  is_admin: boolean
}

interface IAuthConfig {
  headers: {
    Authorization: string
  }
}

export const AuthConfig = (): IAuthConfig => {
  const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
  return {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }
}
