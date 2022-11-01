import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './login'
import registerReducer from './register'

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
