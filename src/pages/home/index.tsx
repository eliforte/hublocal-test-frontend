import * as React from 'react'
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DrawerMenu } from '../../components/drawer'
import { Header } from '../../components/header'
// import { CartItem } from '../../components/cardItem'
import { CreateButton } from '../../components/createButtom'

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  React.useEffect(() => {
    if (localStorage.getItem('user') == null) {
      navigate('/')
    }
  }, [])

  return (
    <Box width="100%">
      <Box display="flex" flexDirection="row">
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
          Tickets
        </Typography>
        <CreateButton path="tickets" text="ticket"/>
      </Box>
    </Box>
  )
}
