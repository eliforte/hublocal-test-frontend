import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import { AxiosError } from 'axios'
import api from '../../services/api'
import {
  IRegisterInput,
  RegisterInitialState,
  IRegisterResponse
} from './interface'

const initialState: RegisterInitialState = {
  message: '',
  statuCode: 0,
  result: {
    email: '',
    id: '',
    is_admin: false,
    name: '',
    password: ''
  },
  error: '',
  loading: false,
  success: false
}

export const signUpUser = createAsyncThunk<IRegisterResponse, IRegisterInput>(
  'user/register',
  async ({ name, password, email }, thunkApi) => {
    try {
      const res = await api.post('/api/v1/users', { name, email, password })
      return res.data as IRegisterResponse
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

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state: RegisterInitialState) => {
        state.loading = true
      })
    builder
      .addCase(signUpUser.fulfilled, (state: RegisterInitialState, action: PayloadAction<IRegisterResponse>) => {
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
    builder
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
  }
})

export default registerSlice.reducer

export const useRegister = (state: RegisterInitialState): RegisterInitialState => {
  return state
}
