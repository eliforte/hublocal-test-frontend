
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import { AxiosError } from 'axios'
import api from '../../services/api'
import {
  LoginInitialState,
  ILoginResponse,
  ILoginInput
} from './interface'

const initialState: LoginInitialState = {
  message: '',
  statuCode: 0,
  result: {
    name: '',
    is_admin: false,
    token: ''
  },
  error: '',
  loading: false,
  success: false
}

export const signInUser = createAsyncThunk<ILoginResponse, ILoginInput>('user/login', async ({ email, password }, thunkApi) => {
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

export const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state: LoginInitialState) => {
        state.loading = true
      })
    builder
      .addCase(signInUser.fulfilled, (state: LoginInitialState, action: PayloadAction<ILoginResponse>) => {
        state.loading = false
        state = { ...state, ...action.payload }
        state.error = undefined
        window.location.pathname = '/home'
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
  }
})

export default loginSlice.reducer

export const useLogin = (state: LoginInitialState): LoginInitialState => {
  return state
}
