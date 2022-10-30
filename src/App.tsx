import * as React from 'react'
import GlobalStyles from './styles/globalStyles'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Login } from './pages/login'

export const App: React.FC = () => (
  <>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </>
)

export default App
