import * as React from 'react'
import {
  Box,
  useTheme,
  useMediaQuery,
  Typography
} from '@mui/material'
import { useLocation } from 'react-router-dom'
import { UserCreateForm } from '../userCreateForm'
import { CompanyCreateForm } from '../companyCreateForm'
import { PlaceCreateForm } from '../placeCreateForm'
import { ResponsibleCreateForm } from '../responsibleCreateForm'
import { TicketCreateForm } from '../ticketCreateForm'

interface Props {
  title: string
}

const listItens = [
  {
    currentPath: '/home/users/create',
    component: () => <UserCreateForm />
  },
  {
    currentPath: '/home/companies/create',
    component: () => <CompanyCreateForm />
  },
  {
    currentPath: '/home/places/create',
    component: () => <PlaceCreateForm />
  },
  {
    currentPath: '/home/responsibles/create',
    component: () => <ResponsibleCreateForm />
  },
  {
    currentPath: '/home/tickets/create',
    component: () => <TicketCreateForm />
  }
]

export const Create: React.FC<Props> = ({ title }) => {
  const location = useLocation().pathname
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const formatItemToRender = listItens.find((item) => location.includes(item.currentPath))

  return (
    <>
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
          { title }
        </Typography>
      </Box>
      <Box
        mt={theme.spacing(5)}
        mr={theme.spacing(4)}
        ml={smDown ? theme.spacing(4) : theme.spacing(40)}
      >
        {
          formatItemToRender?.component()
        }
      </Box>
    </>
  )
}
