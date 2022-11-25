import * as React from 'react'
import GlobalStyles from './styles/globalStyles'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { Companies } from './pages/companies'
import { Places } from './pages/places'
import { Responsibles } from './pages/responsibles'
import { Tickets } from './pages/tickets'
import { Users } from './pages/users'

export const App: React.FC = () => (
  <>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/tickets" element={<Tickets />} />
        <Route path="/home/companies" element={<Companies />} />
        <Route path="/home/places" element={<Places />} />
        <Route path="/home/responsibles" element={<Responsibles />} />
        <Route path="/home/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  </>
)

export default App
