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
import { getAllPlaces, usePlaces } from '../../store/places'

export const Places: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const places = useSelector(usePlaces)

  React.useEffect(() => {
    dispatch(getAllPlaces())
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
        itens={places.result}
        path="places"
        title="Estabelecimentos"
        buttonText="Registrar novo estabelecimento"
        emptyMessage="Nenhuma estabelecimento encontrado"
      />
    </Box>
  )
}
