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
import { useResponsibles, getAllResponsibles } from '../../store/responsibles'

export const Responsibles: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const responsibles = useSelector(useResponsibles)

  React.useEffect(() => {
    dispatch(getAllResponsibles())
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
        itens={responsibles.result}
        path="responsibles"
        title="Responsáveis"
        buttonText="Registrar novo responsável"
        emptyMessage="Nenhuma responsável encontrado"
      />
    </Box>
  )
}
