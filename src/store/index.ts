import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './users'
import companiesReducer from './companies'
import placesReducer from './places'
import ticketsReducer from './tickets'
import responsiblesReducer from './responsibles'

const store = configureStore({
  reducer: {
    users: usersReducer,
    companies: companiesReducer,
    places: placesReducer,
    responsibles: responsiblesReducer,
    tickets: ticketsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
