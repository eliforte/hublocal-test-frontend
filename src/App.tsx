import * as React from 'react'
import GlobalStyles from './styles/globalStyles'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { Home } from './pages/home'

export const App: React.FC = () => (
  <>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </>
)

export default App
