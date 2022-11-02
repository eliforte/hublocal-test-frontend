import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import { AxiosError } from 'axios'
import api from '../../services/api'
import {
  IUserInitialState,
  ILoginResponse,
  IInputLogin,
  IUser,
  IRegisterInput,
  IInputsEditUser,
  IUserLocalStorage
} from './interfaces'

const initialState: IUserInitialState = {
  message: '',
  statuCode: 0,
  result: [],
  error: '',
  login: {
    is_admin: false,
    name: '',
    token: ''
  },
  loading: false,
  success: false
}

export const signUpUser = createAsyncThunk<IUser, IRegisterInput>(
  'users/register',
  async ({ name, password, email }, thunkApi) => {
    try {
      const res = await api.post('/api/v1/users', { name, email, password })
      return res.data as IUser
    } catch (err) {
      let errorMessage = 'Internal Server Error'
      if (err instanceof AxiosError) {
        if (err.response?.data.message != null) {
          errorMessage = err.response.data.message
        }
      }
      return thunkApi.rejectWithValue(errorMessage)
    }
  }
)

export const signInUser = createAsyncThunk<ILoginResponse, IInputLogin>('users/login', async ({ email, password }, thunkApi) => {
  try {
    const res = await api.post('/api/v1/login', { email, password })
    localStorage.setItem('user', JSON.stringify(res.data))
    return res.data as ILoginResponse
  } catch (err) {
    let errorMessage = 'Internal Server Error'
    if (err instanceof AxiosError) {
      if (err.response?.data.message != null) {
        errorMessage = err.response.data.message
      }
    }
    return thunkApi.rejectWithValue(errorMessage)
  }
})

export const getAllUsers = createAsyncThunk<IUser>(
  'users/getAll',
  async (_, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))

      const res = await api.get('/api/v1/users', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      return res.data as IUser
    } catch (err) {
      let errorMessage = 'Internal Server Error'
      if (err instanceof AxiosError) {
        if (err.response?.data.message != null) {
          errorMessage = err.response.data.message
        }
      }
      return thunkApi.rejectWithValue(errorMessage)
    }
  }
)

export const editUser = createAsyncThunk<IInputsEditUser, IUser>(
  'users/edit',
  async (editUserInfos: IInputsEditUser, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const paramsId = useParams()
      const res = await api.put(`/api/v1/users/${paramsId.id}`, { ...editUserInfos }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      return res.data as IUser
    } catch (err) {
      let errorMessage = 'Internal Server Error'
      if (err instanceof AxiosError) {
        if (err.response?.data.message != null) {
          errorMessage = err.response.data.message
        }
      }
      return thunkApi.rejectWithValue(errorMessage)
    }
  }
)

export const getByIdUser = createAsyncThunk<IUser>(
  'users/getById',
  async (_, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const paramsId = useParams()
      const res = await api.get(`/api/v1/users/${paramsId.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      return res.data as IUser
    } catch (err) {
      let errorMessage = 'Internal Server Error'
      if (err instanceof AxiosError) {
        if (err.response?.data.message != null) {
          errorMessage = err.response.data.message
        }
      }
      return thunkApi.rejectWithValue(errorMessage)
    }
  }
)

export const deleteUser = createAsyncThunk<IUser>(
  'users/delete',
  async (_, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const paramsId = useParams()
      const res = await api.delete(`/api/v1/users/${paramsId.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      return res.data as IUser
    } catch (err) {
      let errorMessage = 'Internal Server Error'
      if (err instanceof AxiosError) {
        if (err.response?.data.message != null) {
          errorMessage = err.response.data.message
        }
      }
      return thunkApi.rejectWithValue(errorMessage)
    }
  }
)

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state: IUserInitialState) => {
        state.loading = true
      })
      .addCase(signUpUser.pending, (state: IUserInitialState) => {
        state.loading = true
      })
      .addCase(getAllUsers.pending, (state: IUserInitialState) => {
        state.loading = true
      })
      .addCase(editUser.pending, (state: IUserInitialState) => {
        state.loading = true
      })
      .addCase(getByIdUser.pending, (state: IUserInitialState) => {
        state.loading = true
      })
      .addCase(deleteUser.pending, (state: IUserInitialState) => {
        state.loading = true
      })
    builder
      .addCase(signInUser.fulfilled, (state: IUserInitialState, action: PayloadAction<ILoginResponse>) => {
        state.loading = false
        state = { ...state, ...action.payload }
        state.error = undefined
        window.location.pathname = '/home/tickets'
      })
      .addCase(signUpUser.fulfilled, (state: IUserInitialState, action: PayloadAction<IUser>) => {
        state.loading = false
        state = { ...state, ...action.payload }
        state.error = undefined
        Swal.fire({
          icon: 'success',
          title: 'Conta criada com sucesso!',
          text: 'Você será redirecionado para página de login.',
          width: 400,
          padding: '1em',
          color: '#424242',
          backdrop: `
            rgba(97,97,97,0.73)
            top
          `
        })
        setTimeout(() => {
          window.location.pathname = '/'
        }, 2000)
      })
      .addCase(getAllUsers.fulfilled, (state: IUserInitialState, action: PayloadAction<IUser>) => {
        state.loading = false
        state = { ...state, ...action.payload }
        state.error = undefined
      })
      .addCase(editUser.fulfilled, (state: IUserInitialState, action: PayloadAction<IInputsEditUser>) => {
        state.loading = false
        state = { ...state, ...action.payload }
        state.error = undefined
        Swal.fire({
          icon: 'success',
          title: 'Usuário atualizado com sucesso!',
          text: 'Você será redirecionado',
          width: 400,
          padding: '1em',
          color: '#424242',
          backdrop: `
            rgba(97,97,97,0.73)
            top
          `
        })
        setTimeout(() => {
          const paramsId = useParams()
          window.location.pathname = `/home/user/details/${paramsId.id}`
        }, 2000)
      })
      .addCase(deleteUser.fulfilled, (state: IUserInitialState, action: PayloadAction<IUser>) => {
        state.loading = false
        state.error = undefined
        Swal.fire({
          icon: 'success',
          title: 'Usuário excluído com sucesso!',
          text: 'Você será redirecionado',
          width: 400,
          padding: '1em',
          color: '#424242',
          backdrop: `
            rgba(97,97,97,0.73)
            top
          `
        })
        setTimeout(() => {
          window.location.pathname = '/home/users'
        }, 2000)
      })
    builder
      .addCase(signInUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false
        state.error = action.payload
        Swal.fire({
          icon: 'warning',
          title: 'Ops!',
          text: `${state.error}`,
          width: 400,
          padding: '1em',
          color: '#424242',
          backdrop: `
            rgba(97,97,97,0.73)
            top
          `
        })
      })
      .addCase(signUpUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false
        state.error = action.payload
        Swal.fire({
          icon: 'warning',
          title: 'Ops!',
          text: `${state.error}`,
          width: 400,
          padding: '1em',
          color: '#424242',
          backdrop: `
            rgba(97,97,97,0.73)
            top
          `
        })
      })
      .addCase(getAllUsers.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false
        state.error = action.payload
        Swal.fire({
          icon: 'warning',
          title: 'Ops!',
          text: `${state.error}`,
          width: 400,
          padding: '1em',
          color: '#424242',
          backdrop: `
            rgba(97,97,97,0.73)
            top
          `
        })
      })
      .addCase(editUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false
        state.error = action.payload
        Swal.fire({
          icon: 'warning',
          title: 'Ops!',
          text: `${state.error}`,
          width: 400,
          padding: '1em',
          color: '#424242',
          backdrop: `
            rgba(97,97,97,0.73)
            top
          `
        })
      })
      .addCase(deleteUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false
        state.error = action.payload
        Swal.fire({
          icon: 'warning',
          title: 'Ops!',
          text: `${state.error}`,
          width: 400,
          padding: '1em',
          color: '#424242',
          backdrop: `
            rgba(97,97,97,0.73)
            top
          `
        })
      })
      .addCase(getByIdUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false
        state.error = action.payload
        Swal.fire({
          icon: 'warning',
          title: 'Ops!',
          text: `${state.error}`,
          width: 400,
          padding: '1em',
          color: '#424242',
          backdrop: `
            rgba(97,97,97,0.73)
            top
          `
        })
      })
  }
})

export default userSlice.reducer

export const useUsers = (state: IUserInitialState): IUserInitialState => {
  return state
}
