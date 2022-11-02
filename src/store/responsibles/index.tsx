import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import { AxiosError } from 'axios'
import api from '../../services/api'
import {
  InputsResponsible,
  IResponsible,
  IResponsibleInitialState,
  IUserLocalStorage
} from './interfaces'

const initialState: IResponsibleInitialState = {
  message: '',
  statuCode: 0,
  result: [],
  error: '',
  loading: false,
  success: false
}

export const createResponsible = createAsyncThunk<IResponsible, InputsResponsible>(
  'responsibles/create',
  async (responsableInfos: InputsResponsible, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const res = await api.post('/api/v1/responsibles', { ...responsableInfos }, {
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

export const getAllResponsibles = createAsyncThunk<IResponsible>(
  'responsibles/getAll',
  async (_, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const res = await api.get('/api/v1/responsibles', {
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

export const editResponsible = createAsyncThunk<IResponsible, InputsResponsible>(
  'responsibles/edit',
  async (responsibleInfos: InputsResponsible, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const paramsId = useParams()
      const res = await api.put(`/api/v1/responsibles/${paramsId.id}`, { ...responsibleInfos }, {
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

export const getByIdResponsible = createAsyncThunk<IResponsible>(
  'responsibles/getById',
  async (_, thunkApi) => {
    try {
      const paramsId = useParams()
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const res = await api.get(`/api/v1/responsibles/${paramsId.id}`, {
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

export const deleteResponsible = createAsyncThunk<IResponsible>(
  'responsibles/delete',
  async (_, thunkApi) => {
    try {
      const paramsId = useParams()
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const res = await api.delete(`/api/v1/responsibles/${paramsId.id}`, {
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
      .addCase(createResponsible.fulfilled, (state: IResponsibleInitialState, action: PayloadAction<IResponsible>) => {
        state.loading = false
        state = { ...state, ...action.payload }
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
      .addCase(getAllResponsibles.fulfilled, (state: IResponsibleInitialState, action: PayloadAction<IResponsible>) => {
        state.loading = false
        state = { ...state, ...action.payload }
        state.error = undefined
      })
      .addCase(editResponsible.fulfilled, (state: IResponsibleInitialState, action: PayloadAction<IResponsible>) => {
        state.loading = false
        state = { ...state, ...action.payload }
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
          const paramsId = useParams()
          window.location.pathname = `/home/responsibles/details/${paramsId.id}`
        }, 2000)
      })
      .addCase(getByIdResponsible.fulfilled, (state: IResponsibleInitialState, action: PayloadAction<IResponsible>) => {
        state.loading = false
        state = { ...state, ...action.payload }
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

export const useResponsibles = (state: IResponsibleInitialState): IResponsibleInitialState => {
  return state
}
