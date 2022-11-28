import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import { AxiosError } from 'axios'
import api from '../../services/api'
import {
  InputsResponsible,
  IResponsible,
  IResponsibleInitialState,
  IUserLocalStorage,
  IOneResponsibleResponse,
  IResponsibleResponse
} from './interfaces'

const initialState: IResponsibleInitialState = {
  message: '',
  statuCode: 0,
  result: [],
  error: '',
  loading: false,
  success: false
}

export const createResponsible = createAsyncThunk<IOneResponsibleResponse, InputsResponsible>(
  'responsibles/create',
  async (responsableInfos: InputsResponsible, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const res = await api.post('/api/v1/responsibles', { ...responsableInfos }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      return res.data as IOneResponsibleResponse
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

export const getAllResponsibles = createAsyncThunk<IResponsibleResponse>(
  'responsibles/getAll',
  async (_, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const res = await api.get('/api/v1/responsibles', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      return res.data as IResponsibleResponse
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

export const editResponsible = createAsyncThunk<IOneResponsibleResponse, InputsResponsible>(
  'responsibles/edit',
  async ({ id, ...infosWithoutId }: InputsResponsible, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const res = await api.put(`/api/v1/responsibles/${id}`, { ...infosWithoutId }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      return res.data as IOneResponsibleResponse
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

export const getByIdResponsible = createAsyncThunk<IOneResponsibleResponse, string | undefined>(
  'responsibles/getById',
  async (id, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const res = await api.get(`/api/v1/responsibles/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      return res.data as IOneResponsibleResponse
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

export const deleteResponsible = createAsyncThunk<IResponsible, string | undefined>(
  'responsibles/delete',
  async (id, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const res = await api.delete(`/api/v1/responsibles/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      return res.data as IResponsible
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

export const responsiblesSlice = createSlice({
  name: 'responsibles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createResponsible.pending, (state: IResponsibleInitialState) => {
        state.loading = true
      })
      .addCase(getAllResponsibles.pending, (state: IResponsibleInitialState) => {
        state.loading = true
      })
      .addCase(editResponsible.pending, (state: IResponsibleInitialState) => {
        state.loading = true
      })
      .addCase(getByIdResponsible.pending, (state: IResponsibleInitialState) => {
        state.loading = true
      })
      .addCase(deleteResponsible.pending, (state: IResponsibleInitialState) => {
        state.loading = true
      })
    builder
      .addCase(createResponsible.fulfilled, (state: IResponsibleInitialState, action: PayloadAction<IOneResponsibleResponse>) => {
        state.loading = false
        state.result = [action.payload.result]
        state.error = undefined
        Swal.fire({
          icon: 'success',
          title: 'Responsável criado com sucesso!',
          width: 400,
          padding: '1em',
          color: '#424242',
          backdrop: `
            rgba(97,97,97,0.73)
            top
          `
        })
        getAllResponsibles()
      })
      .addCase(getAllResponsibles.fulfilled, (state: IResponsibleInitialState, action: PayloadAction<IResponsibleResponse>) => {
        state.loading = false
        state.result = action.payload.result
        state.error = undefined
      })
      .addCase(editResponsible.fulfilled, (state: IResponsibleInitialState, action: PayloadAction<IOneResponsibleResponse>) => {
        state.loading = false
        state.result = [action.payload.result]
        state.error = undefined
        Swal.fire({
          icon: 'success',
          title: 'Responsável atualizado com sucesso!',
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
          window.location.pathname = '/home/places'
        }, 2000)
      })
      .addCase(getByIdResponsible.fulfilled, (state: IResponsibleInitialState, action: PayloadAction<IOneResponsibleResponse>) => {
        state.loading = false
        state.result = [action.payload.result]
        state.error = undefined
      })
      .addCase(deleteResponsible.fulfilled, (state: IResponsibleInitialState, action: PayloadAction<IResponsible>) => {
        state.loading = false
        state.error = undefined
        Swal.fire({
          icon: 'success',
          title: 'Responsável excluído com sucesso!',
          text: 'Você será redirecionado para inicial',
          width: 400,
          padding: '1em',
          color: '#424242',
          backdrop: `
            rgba(97,97,97,0.73)
            top
          `
        })
        setTimeout(() => {
          window.location.pathname = '/home/responsibles'
        }, 2000)
      })
    builder
      .addCase(createResponsible.rejected, (state, action: PayloadAction<unknown>) => {
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
      .addCase(getAllResponsibles.rejected, (state, action: PayloadAction<unknown>) => {
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
      .addCase(editResponsible.rejected, (state, action: PayloadAction<unknown>) => {
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
      .addCase(deleteResponsible.rejected, (state, action: PayloadAction<unknown>) => {
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
      .addCase(getByIdResponsible.rejected, (state, action: PayloadAction<unknown>) => {
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

export default responsiblesSlice.reducer

export const useResponsibles = (state: any) => {
  return state.responsibles as IResponsibleInitialState
}
