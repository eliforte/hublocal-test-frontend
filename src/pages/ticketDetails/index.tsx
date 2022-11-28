import * as React from 'react'
import { Box, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DrawerMenu, Header, Details } from '../../components'

export const TicketDetails: React.FC = () => {
  const navigate = useNavigate()
  const theme = useTheme()

  React.useEffect(() => {
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
      <Box>
        <Details title="Detalhes do ticket"/>
      </Box>
    </Box>
  )
}
