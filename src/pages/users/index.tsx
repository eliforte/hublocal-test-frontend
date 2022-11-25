import * as React from 'react'
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DrawerMenu } from '../../components/drawer'
import { Header } from '../../components/header'
import { CreateButton } from '../../components/createButtom'
import { useAppDispatch } from '../../hooks'
import { EmptyContent } from '../../components/emptyContent'
import { getAllUsers, useUsers } from '../../store/users'
import { IUser } from '../../store/users/interfaces'

export const Users: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const users = useSelector(useUsers)
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  React.useEffect(() => {
    dispatch(getAllUsers())
    if (localStorage.getItem('user') == null) {
      navigate('/')
    }
  }, [])

  return (
    <Box width="100%">
      <Box
        display="flex"
        flexDirection="row"
      >
        <DrawerMenu />
        <Header />
      </Box>
      <Box
        display="flex"
        mt={theme.spacing(10)}
        mr={theme.spacing(4)}
        ml={smDown ? theme.spacing(4) : theme.spacing(40)}
        justifyContent="space-between"
      >
        <Typography
          color="#f5f5f5"
          component="h1"
          variant="h4"
        >
          Usuários
        </Typography>
        <CreateButton path="users" text="usuário"/>
      </Box>
      <Box
        mt={theme.spacing(10)}
        mr={theme.spacing(4)}
        ml={smDown ? theme.spacing(4) : theme.spacing(40)}
      >
        {
          !users.result
            ? <EmptyContent item="usuário" />
            : users.result.map((user: IUser, index) => {
              return <Typography key={`${user.name}-${index}`}>{ user.name }</Typography>
            })
        }
      </Box>
    </Box>
  )
}
