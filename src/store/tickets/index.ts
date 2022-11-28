import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import { AxiosError } from 'axios'
import api from '../../services/api'
import {
  ITicketsInitialState,
  ITicket,
  ITicketInputs,
  IUserLocalStorage,
  ITicketsResponse,
  IOneTicketsResponse,
  ITicketCreateInput
} from './interfaces'

const initialState: ITicketsInitialState = {
  message: '',
  statuCode: 0,
  result: [],
  error: '',
  loading: false,
  success: false
}

export const createTicket = createAsyncThunk<ITicket, ITicketCreateInput>(
  'ticket/create',
  async (ticketsInfos: ITicketCreateInput, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const res = await api.post('/api/v1/tickets', { ...ticketsInfos }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
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

export const getAllTickets = createAsyncThunk<ITicketsResponse>(
  'ticket/getAll',
  async (_, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const res = await api.get('/api/v1/tickets', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      return res.data as ITicketsResponse
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

export const editTicket = createAsyncThunk<IOneTicketsResponse, ITicketInputs>(
  'ticket/edit',
  async ({ id, ...infosWithoutId }: ITicketInputs, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      console.log(user.token)
      const res = await api.put(`/api/v1/tickets/${id}`, { ...infosWithoutId }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      return res.data as IOneTicketsResponse
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

export const getByIdTicket = createAsyncThunk<IOneTicketsResponse, string | undefined>(
  'ticket/getById',
  async (id, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const res = await api.get(`/api/v1/tickets/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      return res.data as IOneTicketsResponse
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

export const deleteTicket = createAsyncThunk<ITicket, string | undefined>(
  'ticket/delete',
  async (id, thunkApi) => {
    try {
      const user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))
      const res = await api.delete(`/api/v1/tickets/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
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
  name: 'tickets',
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
      .addCase(getAllTickets.fulfilled, (state: ITicketsInitialState, action: PayloadAction<ITicketsResponse>) => {
        state.loading = false
        state.result = action.payload.result
        state.error = undefined
      })
      .addCase(editTicket.fulfilled, (state: ITicketsInitialState, action: PayloadAction<IOneTicketsResponse>) => {
        state.loading = false
        state.result = [action.payload.result]
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
          window.location.pathname = '/home/places'
        }, 2000)
      })
      .addCase(getByIdTicket.fulfilled, (state: ITicketsInitialState, action: PayloadAction<IOneTicketsResponse>) => {
        state.loading = false
        state.result = [action.payload.result]
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

export const useTickets = (state: any) => {
  return state.tickets as ITicketsInitialState
}
