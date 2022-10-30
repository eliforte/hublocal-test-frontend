import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
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

export const signUpUser = createAsyncThunk<ILoginResponse, ILoginInput>('user/login', async (userInfos, thunkApi) => {
  try {
    const res = await api.post('/api/v1/login', userInfos)
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
      .addCase(signUpUser.pending, (state: LoginInitialState) => {
        state.loading = true
      })
    builder
      .addCase(signUpUser.fulfilled, (state: LoginInitialState, action: PayloadAction<ILoginResponse>) => {
        state.loading = false
        state = { ...state, ...action.payload }
        state.error = undefined
      })
    builder
      .addCase(signUpUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default loginSlice.reducer

export const useLogin = (state: LoginInitialState): LoginInitialState => {
  return state
}
