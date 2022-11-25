import * as React from 'react'
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ITicket } from '../../store/tickets/interfaces'
import { DrawerMenu } from '../../components/drawer'
import { Header } from '../../components/header'
import { CreateButton } from '../../components/createButtom'
import { getAllTickets, useTickets } from '../../store/tickets'
import { useAppDispatch } from '../../hooks'
import { EmptyContent } from '../../components/emptyContent'

export const Tickets: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const tickets = useSelector(useTickets)
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

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
      <Box
        mt={theme.spacing(10)}
        mr={theme.spacing(4)}
        ml={smDown ? theme.spacing(4) : theme.spacing(40)}
      >
        {
          !tickets.result
            ? <EmptyContent item="ticket" />
            : tickets.result.map((ticket: ITicket) => {
              return <Typography key={ticket.id}>{ ticket.name }</Typography>
            })
        }
      </Box>
    </Box>
  )
}
