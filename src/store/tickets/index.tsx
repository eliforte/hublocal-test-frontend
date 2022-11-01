import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import { AxiosError } from 'axios'
import api from '../../services/api'
import { AuthConfig } from '../../services/authConfig'
import { ITicketsInitialState, ITicket, ITicketInputs } from './interfaces'

const paramsId = useParams()

const authorizationConfig = AuthConfig()

const initialState: ITicketsInitialState = {
  message: '',
  statuCode: 0,
  result: [],
  error: '',
  loading: false,
  success: false
}

export const createTicket = createAsyncThunk<ITicket, ITicketInputs>(
  'ticket/create',
  async (ticketsInfos: ITicketInputs, thunkApi) => {
    try {
      const res = await api.post('/api/v1/tickets', { ...ticketsInfos }, { ...authorizationConfig })
      return res.data as ITicket
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

export const getAllTickets = createAsyncThunk<ITicket>(
  'ticket/getAll',
  async (_, thunkApi) => {
    try {
      const res = await api.get('/api/v1/tickets')
      return res.data as ITicket
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

export const editTicket = createAsyncThunk<ITicket, ITicketInputs>(
  'ticket/edit',
  async (ticketsInfos: ITicketInputs, thunkApi) => {
    try {
      const res = await api.put(`/api/v1/tickets/${paramsId.id}`, { ...ticketsInfos }, { ...authorizationConfig })
      return res.data as ITicket
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

export const getByIdTicket = createAsyncThunk<ITicket>(
  'ticket/getById',
  async (_, thunkApi) => {
    try {
      const res = await api.get(`/api/v1/tickets/${paramsId.id}`, { ...authorizationConfig })
      return res.data as ITicket
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

export const deleteTicket = createAsyncThunk<ITicket>(
  'ticket/delete',
  async (_, thunkApi) => {
    try {
      const res = await api.delete(`/api/v1/tickets/${paramsId.id}`, { ...authorizationConfig })
      return res.data as ITicket
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

export const ticketsSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state: ITicketsInitialState) => {
        state.loading = true
      })
      .addCase(getAllTickets.pending, (state: ITicketsInitialState) => {
        state.loading = true
      })
      .addCase(editTicket.pending, (state: ITicketsInitialState) => {
        state.loading = true
      })
      .addCase(getByIdTicket.pending, (state: ITicketsInitialState) => {
        state.loading = true
      })
      .addCase(deleteTicket.pending, (state: ITicketsInitialState) => {
        state.loading = true
      })
    builder
      .addCase(createTicket.fulfilled, (state: ITicketsInitialState, action: PayloadAction<ITicket>) => {
        state.loading = false
        state = { ...state, ...action.payload }
        state.error = undefined
        Swal.fire({
          icon: 'success',
          title: 'Ticket criado com sucesso!',
          width: 400,
          padding: '1em',
          color: '#424242',
          backdrop: `
            rgba(97,97,97,0.73)
            top
          `
        })
        getAllTickets()
      })
      .addCase(getAllTickets.fulfilled, (state: ITicketsInitialState, action: PayloadAction<ITicket>) => {
        state.loading = false
        state = { ...state, ...action.payload }
        state.error = undefined
      })
      .addCase(editTicket.fulfilled, (state: ITicketsInitialState, action: PayloadAction<ITicket>) => {
        state.loading = false
        state = { ...state, ...action.payload }
        state.error = undefined
        Swal.fire({
          icon: 'success',
          title: 'Ticket atualizado com sucesso!',
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
          window.location.pathname = `/home/tickets/details/${paramsId.id}`
        }, 2000)
      })
      .addCase(getByIdTicket.fulfilled, (state: ITicketsInitialState, action: PayloadAction<ITicket>) => {
        state.loading = false
        state = { ...state, ...action.payload }
        state.error = undefined
      })
      .addCase(deleteTicket.fulfilled, (state: ITicketsInitialState, action: PayloadAction<ITicket>) => {
        state.loading = false
        state.error = undefined
        Swal.fire({
          icon: 'success',
          title: 'Ticket excluído com sucesso!',
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
          window.location.pathname = '/home/tickets'
        }, 2000)
      })
    builder
      .addCase(createTicket.rejected, (state, action: PayloadAction<unknown>) => {
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
      .addCase(getAllTickets.rejected, (state, action: PayloadAction<unknown>) => {
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
      .addCase(editTicket.rejected, (state, action: PayloadAction<unknown>) => {
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
      .addCase(deleteTicket.rejected, (state, action: PayloadAction<unknown>) => {
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
      .addCase(getByIdTicket.rejected, (state, action: PayloadAction<unknown>) => {
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

export default ticketsSlice.reducer

export const useTickets = (state: ITicketsInitialState): ITicketsInitialState => {
  return state
}
