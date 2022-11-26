import * as React from 'react'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  DrawerMenu,
  Header,
  List
} from '../../components'
import { useAppDispatch } from '../../hooks'
import { useResponsibles } from '../../store/responsibles'
import { getAllPlaces } from '../../store/places'

export const Responsibles: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const responsibles = useSelector(useResponsibles)

  React.useEffect(() => {
    dispatch(getAllPlaces())
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
      <List
        itens={responsibles.result}
        path="responsibles"
        title="Responsáveis"
        buttonText="Registrar novo responsável"
        emptyMessage="Nenhuma responsável encontrado"
      />
    </Box>
  )
}
