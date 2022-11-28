import * as React from 'react'
import GlobalStyles from './styles/globalStyles'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import {
  Login,
  Register,
  Companies,
  Places,
  Responsibles,
  Tickets,
  UserCreate,
  UserDetails,
  CompanyCreate,
  Users,
  ResponsibleDetails,
  CompanyDetails,
  PlaceDetails,
  PlaceCreate,
  ResponsibleCreate,
  TicketDetails,
  TicketCreate
} from './pages'

export const App: React.FC = () => (
  <>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/users/create" element={<UserCreate />} />
        <Route path="/home/companies/create" element={<CompanyCreate />} />
        <Route path="/home/places/create" element={<PlaceCreate />} />
        <Route path="/home/responsibles/create" element={<ResponsibleCreate />} />
        <Route path="/home/tickets/create" element={<TicketCreate />} />
        <Route path="/home/tickets" element={<Tickets />} />
        <Route path="/home/companies" element={<Companies />} />
        <Route path="/home/places" element={<Places />} />
        <Route path="/home/responsibles" element={<Responsibles />} />
        <Route path="/home/users" element={<Users />} />
        <Route path="/details/users/:id" element={<UserDetails />} />
        <Route path="/details/companies/:id" element={<CompanyDetails />} />
        <Route path="/details/places/:id" element={<PlaceDetails />} />
        <Route path="/details/responsibles/:id" element={<ResponsibleDetails />} />
        <Route path="/details/tickets/:id" element={<TicketDetails />} />
      </Routes>
    </BrowserRouter>
  </>
)

export default App
