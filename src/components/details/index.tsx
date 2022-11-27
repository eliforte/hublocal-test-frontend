import * as React from 'react'
import {
  Box,
  useTheme,
  useMediaQuery,
  Typography
} from '@mui/material'
import { useLocation } from 'react-router-dom'
import { UserForm } from '../userForm'

interface Props {
  title: string
}

const listItens = [
  {
    currentPath: '/details/users',
    component: () => <UserForm />
  }
  /* {
    currentPath: '/details/companies',
    component: () => <CompanyForm />
  },
  {
    currentPath: '/details/places',
    component: () => <PlaceForm />
  },
  {
    currentPath: '/details/tickets',
    component: () => <TicketForm />
  },
  {
    currentPath: '/details/responsibles',
    component: () => <ResponsibleForm />
  } */
]

export const Details: React.FC<Props> = ({ title }) => {
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
        mt={theme.spacing(10)}
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
