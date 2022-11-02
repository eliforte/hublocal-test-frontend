import * as React from 'react'
import { Box } from '@mui/material'
import { DrawerMenu } from '../../components/drawer'
import { Header } from '../../components/header'
import { CartItem } from '../../components/cardItem'
import { useNavigate } from 'react-router-dom'

export const Home: React.FC = () => {
  const navigate = useNavigate()

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
      <CartItem />
    </Box>
  )
}
