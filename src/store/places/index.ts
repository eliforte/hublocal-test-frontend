import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import { AxiosError } from 'axios'
import api from '../../services/api'
import { AuthConfig } from '../../services/authConfig'
import { IInputsPlace, IPlace, IPlaceInitialState } from './interfaces'

const paramsId = useParams()

const authorizationConfig = AuthConfig()

const initialState: IPlaceInitialState = {
  message: '',
  statuCode: 0,
  result: [],
  error: '',
  loading: false,
  success: false
}

export const createPlace = createAsyncThunk<IPlace, IInputsPlace>(
  'places/create',
  async (placeInfos: IInputsPlace, thunkApi) => {
    try {
      const res = await api.post('/api/v1/places', { ...placeInfos }, { ...authorizationConfig })
      return res.data as IPlace
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

export const getAllPlaces = createAsyncThunk<IPlace>(
  'places/getAll',
  async (_, thunkApi) => {
    try {
      const res = await api.get('/api/v1/places')
      return res.data as IPlace
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

export const editPlace = createAsyncThunk<IPlace, IInputsPlace>(
  'places/edit',
  async (placeInfos: IInputsPlace, thunkApi) => {
    try {
      const res = await api.put(`/api/v1/places/${paramsId.id}`, { ...placeInfos }, { ...authorizationConfig })
      return res.data as IPlace
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

export const getByIdPlace = createAsyncThunk<IPlace>(
  'places/getById',
  async (_, thunkApi) => {
    try {
      const res = await api.get(`/api/v1/places/${paramsId.id}`, { ...authorizationConfig })
      return res.data as IPlace
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

export const deletePlace = createAsyncThunk<IPlace>(
  'places/delete',
  async (_, thunkApi) => {
    try {
      const res = await api.delete(`/api/v1/places/${paramsId.id}`, { ...authorizationConfig })
      return res.data as IPlace
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

export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPlace.pending, (state: IPlaceInitialState) => {
        state.loading = true
      })
      .addCase(getAllPlaces.pending, (state: IPlaceInitialState) => {
        state.loading = true
      })
      .addCase(editPlace.pending, (state: IPlaceInitialState) => {
        state.loading = true
      })
      .addCase(getByIdPlace.pending, (state: IPlaceInitialState) => {
        state.loading = true
      })
      .addCase(deletePlace.pending, (state: IPlaceInitialState) => {
        state.loading = true
      })
    builder
      .addCase(createPlace.fulfilled, (state: IPlaceInitialState, action: PayloadAction<IPlace>) => {
        state.loading = false
        state = { ...state, ...action.payload }
        state.error = undefined
        Swal.fire({
          icon: 'success',
          title: 'Estabelecimento registrado com sucesso!',
          width: 400,
          padding: '1em',
          color: '#424242',
          backdrop: `
            rgba(97,97,97,0.73)
            top
          `
        })
        getAllPlaces()
      })
      .addCase(getAllPlaces.fulfilled, (state: IPlaceInitialState, action: PayloadAction<IPlace>) => {
        state.loading = false
        state = { ...state, ...action.payload }
        state.error = undefined
      })
      .addCase(editPlace.fulfilled, (state: IPlaceInitialState, action: PayloadAction<IPlace>) => {
        state.loading = false
        state = { ...state, ...action.payload }
        state.error = undefined
        Swal.fire({
          icon: 'success',
          title: 'Estabelecimento atualizado com sucesso!',
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
          window.location.pathname = `/home/places/details/${paramsId.id}`
        }, 2000)
      })
      .addCase(getByIdPlace.fulfilled, (state: IPlaceInitialState, action: PayloadAction<IPlace>) => {
        state.loading = false
        state = { ...state, ...action.payload }
        state.error = undefined
      })
      .addCase(deletePlace.fulfilled, (state: IPlaceInitialState, action: PayloadAction<IPlace>) => {
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
          window.location.pathname = '/home/places'
        }, 2000)
      })
    builder
      .addCase(getAllPlaces.rejected, (state, action: PayloadAction<unknown>) => {
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
      .addCase(editPlace.rejected, (state, action: PayloadAction<unknown>) => {
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
      .addCase(deletePlace.rejected, (state, action: PayloadAction<unknown>) => {
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
      .addCase(getByIdPlace.rejected, (state, action: PayloadAction<unknown>) => {
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

export default placesSlice.reducer

export const usePlaces = (state: IPlaceInitialState): IPlaceInitialState => {
  return state
}
