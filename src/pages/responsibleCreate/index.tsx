import * as React from 'react'
import { Box, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DrawerMenu, Header, Create } from '../../components'

export const ResponsibleCreate: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()

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
        <Create title="Registrar pessoa responsável"/>
      </Box>
    </Box>
  )
}
