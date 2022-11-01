import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import { AxiosError } from 'axios'
import api from '../../services/api'
import { AuthConfig } from '../../services/authConfig'
import { IInputsCompany, ICompanyInitialState, ICompany } from './interface'

const paramsId = useParams()

const authorizationConfig = AuthConfig()

const initialState: ICompanyInitialState = {
  message: '',
  statuCode: 0,
  result: [],
  error: '',
  loading: false,
  success: false
}

export const createCompany = createAsyncThunk<ICompany, IInputsCompany>(
  'companies/create',
  async (companyInfos: IInputsCompany, thunkApi) => {
    try {
      const res = await api.post('/api/v1/companies', { ...companyInfos }, { ...authorizationConfig })
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

export const getAllCompanies = createAsyncThunk<ICompany>(
  'companies/getAll',
  async (_, thunkApi) => {
    try {
      const res = await api.get('/api/v1/companies')
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

export const editCompany = createAsyncThunk<ICompany, IInputsCompany>(
  'companies/edit',
  async (companyInfos: IInputsCompany, thunkApi) => {
    try {
      const res = await api.put(`/api/v1/companies/${paramsId.id}`, { ...companyInfos }, { ...authorizationConfig })
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

export const getByIdCompany = createAsyncThunk<ICompany>(
  'companies/getById',
  async (_, thunkApi) => {
    try {
      const res = await api.get(`/api/v1/companies/${paramsId.id}`, { ...authorizationConfig })
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

export const deleteCompany = createAsyncThunk<ICompany>(
  'companies/delete',
  async (_, thunkApi) => {
    try {
      const res = await api.delete(`/api/v1/companies/${paramsId.id}`, { ...authorizationConfig })
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
      .addCase(createCompany.fulfilled, (state: ICompanyInitialState, action: PayloadAction<ICompany>) => {
        state.loading = false
        state = { ...state, ...action.payload }
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
      .addCase(getAllCompanies.fulfilled, (state: ICompanyInitialState, action: PayloadAction<ICompany>) => {
        state.loading = false
        state = { ...state, ...action.payload }
        state.error = undefined
      })
      .addCase(editCompany.fulfilled, (state: ICompanyInitialState, action: PayloadAction<ICompany>) => {
        state.loading = false
        state = { ...state, ...action.payload }
        state.error = undefined
        Swal.fire({
          icon: 'success',
          title: 'Empresa atualizada com sucesso!',
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
          window.location.pathname = `/home/companies/details/${paramsId.id}`
        }, 2000)
      })
      .addCase(getByIdCompany.fulfilled, (state: ICompanyInitialState, action: PayloadAction<ICompany>) => {
        state.loading = false
        state = { ...state, ...action.payload }
        state.error = undefined
      })
      .addCase(deleteCompany.fulfilled, (state: ICompanyInitialState, action: PayloadAction<ICompany>) => {
        state.loading = false
        state.error = undefined
        Swal.fire({
          icon: 'success',
          title: 'Estabelecimento excluído com sucesso!',
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
          window.location.pathname = '/home/companies'
        }, 2000)
      })
    builder
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

export const useCompanies = (state: ICompanyInitialState): ICompanyInitialState => {
  return state
}
