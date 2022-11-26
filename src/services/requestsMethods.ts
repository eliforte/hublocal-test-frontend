import api from './api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { useParams } from 'react-router-dom'

export interface IUserLocalStorage {
  token: string
  name: string
  is_admin: boolean
}

export default abstract class RequestsMethods<T> {
  protected _path: string

  protected _state: string

  readonly _user: IUserLocalStorage = JSON.parse(String(localStorage.getItem('user')))

  constructor (path: string, state: string) {
    this._path = path
    this._state = state
  }

  public login = async () => createAsyncThunk<T>(
    `${this._state}/login`,
    async (loginInputs, thunkApi) => {
      try {
        const res = await api.post(`${this._path}/login`, loginInputs)
        localStorage.setItem('user', JSON.stringify(res.data.result))
        return res.data as T
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

  public create = async () => createAsyncThunk<T>(`${this._state}/create`, async (inputs, thunkApi) => {
    try {
      const res = await api.post(this._path, { inputs }, {
        headers: {
          Authorization: `Bearer ${this._user.token}`
        }
      })
      return res.data as T
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

  public getAll = async () => createAsyncThunk<T>(`${this._state}/getAll`, async (_, thunkApi) => {
    try {
      const res = await api.get(this._path, {
        headers: {
          Authorization: `Bearer ${this._user.token}`
        }
      })
      return res.data as T
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

  public edit = async () => createAsyncThunk<T>(
    `${this._state}/edit`,
    async (editUserInfos, thunkApi) => {
      try {
        const paramsId = useParams()
        const res = await api.put(`${this._path}${paramsId.id}`, { editUserInfos }, {
          headers: {
            Authorization: `Bearer ${this._user.token}`
          }
        })
        return res.data as T
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

  public getById = async () => createAsyncThunk<T>(
    `${this._state}/getById`,
    async (_, thunkApi) => {
      try {
        const paramsId = useParams()
        const res = await api.get(`${this._path}${paramsId.id}`, {
          headers: {
            Authorization: `Bearer ${this._user.token}`
          }
        })
        return res.data as T
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

  public delete = async () => createAsyncThunk<T>(
    `${this._state}/delete`,
    async (_, thunkApi) => {
      try {
        const paramsId = useParams()
        const res = await api.delete(`${this._path}${paramsId.id}`, {
          headers: {
            Authorization: `Bearer ${this._user.token}`
          }
        })
        return res.data as T
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
}
