import * as React from 'react'
import { Box, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  DrawerMenu,
  Header,
  List
} from '../../components'
import { useAppDispatch } from '../../hooks'
import { getAllCompanies, useCompanies } from '../../store/companies'

export const Companies: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const companies = useSelector(useCompanies)

  React.useEffect(() => {
    dispatch(getAllCompanies())
    if (localStorage.getItem('user') == null) {
      navigate('/')
    }
  }, [])

  return (
    <Box pb={theme.spacing(4)} width="100%">
      <Box
        display="flex"
        flexDirection="row"
      >
        <DrawerMenu />
        <Header />
      </Box>
      <List
        itens={companies.result}
        path="companies"
        title="Empresas"
        buttonText="Registrar nova empresa"
        emptyMessage="Nenhuma empresa encontrada"
      />
    </Box>
  )
}
