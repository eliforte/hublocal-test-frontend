import * as React from 'react'
import { Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { getByIdUser } from '../../store/users'
import { DrawerMenu, Header, Details } from '../../components'

export const UserDetails: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  React.useEffect(() => {
    dispatch(getByIdUser(id))
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
      <Box>
        <Details title="Detalhes do usuário"/>
      </Box>
    </Box>
  )
}
