import * as React from 'react'
import { Box, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DrawerMenu, Header, List } from '../../components'
import { useAppDispatch } from '../../hooks'
import { getAllUsers, useUsers } from '../../store/users'

export const Users: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const users = useSelector(useUsers)
  const theme = useTheme()

  React.useEffect(() => {
    dispatch(getAllUsers())
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
        itens={users.result}
        path="users"
        title="Usuários"
        buttonText="Registrar novo usuário"
        emptyMessage="Nenhum usuário encontrado"
      />
    </Box>
  )
}
