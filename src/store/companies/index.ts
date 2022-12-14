import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import { AxiosError } from 'axios'
import api from '../../services/api'
import {
  IInputsCompany,
  ICompanyInitialState,
  ICompany,
  IUserLocalStorage,
  ICompanyResponse,
  IOneCompanyResponse,
  ICompanyForm
} from './interfaces'

const initialState: ICompanyInitialState = {
  message: '',
  statuCode: 0,
  result: [],
  error: '',
  loading: false,
  success: false
}

export const createCompany = createAsyncThunk<IOneCompanyResponse, IInputsCompany>(
  'companies/create',
  async (companyInfos: IInputsCompany, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const res = await api.post('/api/v1/companies', { ...companyInfos }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      return res.data as IOneCompanyResponse
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

export const getAllCompanies = createAsyncThunk<ICompanyResponse>(
  'companies/getAll',
  async (_, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const res = await api.get('/api/v1/companies', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      return res.data as ICompanyResponse
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

export const editCompany = createAsyncThunk<IOneCompanyResponse, ICompanyForm>(
  'companies/edit',
  async ({ id, ...infosWithoutId }: ICompanyForm, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const res = await api.put(`/api/v1/companies/${id}`, { ...infosWithoutId }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      return res.data as IOneCompanyResponse
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

export const getByIdCompany = createAsyncThunk<IOneCompanyResponse, string | undefined>(
  'companies/getById',
  async (id, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const res = await api.get(`/api/v1/companies/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      return res.data as IOneCompanyResponse
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

export const deleteCompany = createAsyncThunk<ICompany, string | undefined>(
  'companies/delete',
  async (id, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const res = await api.delete(`/api/v1/companies/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      return res.data as ICompany
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

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCompany.pending, (state: ICompanyInitialState) => {
        state.loading = true
      })
      .addCase(getAllCompanies.pending, (state: ICompanyInitialState) => {
        state.loading = true
      })
      .addCase(editCompany.pending, (state: ICompanyInitialState) => {
        state.loading = true
      })
      .addCase(getByIdCompany.pending, (state: ICompanyInitialState) => {
        state.loading = true
      })
      .addCase(deleteCompany.pending, (state: ICompanyInitialState) => {
        state.loading = true
      })
    builder
      .addCase(createCompany.fulfilled, (state: ICompanyInitialState, action: PayloadAction<IOneCompanyResponse>) => {
        state.loading = false
        state = { ...state, ...action.payload.result }
        state.error = undefined
        Swal.fire({
          icon: 'success',
          title: 'Empresa registrada com sucesso!',
          width: 400,
          padding: '1em',
          color: '#424242',
          backdrop: `
            rgba(97,97,97,0.73)
            top
          `
        })
        getAllCompanies()
      })
      .addCase(getAllCompanies.fulfilled, (state: ICompanyInitialState, action: PayloadAction<ICompanyResponse>) => {
        state.loading = false
        state.result = action.payload.result
        state.error = undefined
      })
      .addCase(editCompany.fulfilled, (state: ICompanyInitialState, action: PayloadAction<IOneCompanyResponse>) => {
        state.loading = false
        state.result = [action.payload.result]
        state.error = undefined
        Swal.fire({
          icon: 'success',
          title: 'Empresa atualizada com sucesso!',
          text: 'Voc?? ser?? redirecionado',
          width: 400,
          padding: '1em',
          color: '#424242',
          backdrop: `
            rgba(97,97,97,0.73)
            top
          `
        })
        setTimeout(() => {
          window.location.pathname = '/home/companies'
        }, 2000)
      })
      .addCase(getByIdCompany.fulfilled, (state: ICompanyInitialState, action: PayloadAction<IOneCompanyResponse>) => {
        state.loading = false
        state.result = [action.payload.result]
        state.error = undefined
      })
      .addCase(deleteCompany.fulfilled, (state: ICompanyInitialState, action: PayloadAction<ICompany>) => {
        state.loading = false
        state.error = undefined
        Swal.fire({
          icon: 'success',
          title: 'Estabelecimento exclu??do com sucesso!',
          text: 'Voc?? ser?? redirecionado',
          width: 400,
          padding: '1em',
          color: '#424242',
          backdrop: `
            rgba(97,97,97,0.73)
            top
          `
        })
        setTimeout(() => {
          window.location.pathname = '/home/companies'
        }, 2000)
      })
    builder
      .addCase(createCompany.rejected, (state, action: PayloadAction<unknown>) => {
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
      .addCase(getAllCompanies.rejected, (state, action: PayloadAction<unknown>) => {
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
      .addCase(editCompany.rejected, (state, action: PayloadAction<unknown>) => {
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
      .addCase(deleteCompany.rejected, (state, action: PayloadAction<unknown>) => {
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
      .addCase(getByIdCompany.rejected, (state, action: PayloadAction<unknown>) => {
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

export default companiesSlice.reducer

export const useCompanies = (state: any) => {
  return state.companies as ICompanyInitialState
}
