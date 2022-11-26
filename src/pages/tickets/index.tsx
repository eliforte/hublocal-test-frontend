import * as React from 'react'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DrawerMenu } from '../../components/drawer'
import { Header } from '../../components/header'
import { getAllTickets, useTickets } from '../../store/tickets'
import { useAppDispatch } from '../../hooks'
import { List } from '../../components/list'

export const Tickets: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const tickets = useSelector(useTickets)

  React.useEffect(() => {
    dispatch(getAllTickets())
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
        itens={tickets.result}
        path="tickets"
        title="Tickets"
        buttonText="Criar ticket"
        emptyMessage="Nenhum ticket encontrado"
      />
    </Box>
  )
}
