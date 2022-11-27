import * as React from 'react'
import {
  Box,
  useTheme,
  useMediaQuery,
  Typography
} from '@mui/material'
import { CreateButton } from '../createButton'
import { EmptyContent } from '../emptyContent'
import { UserItemList } from '../userItemList'
import { CompanyItemList } from '../companyItemList'
import { PlaceItemList } from '../placeItemList'
import { TicketItemList } from '../ticketItemList'
import { ResponsibleItemList } from '../responsibleItemList'
import { ITicket } from '../../store/tickets/interfaces'
import { ICompany } from '../../store/companies/interfaces'
import { IUser } from '../../store/users/interfaces'
import { IResponsible } from '../../store/responsibles/interfaces'
import { IPlace } from '../../store/places/interfaces'
import { useLocation } from 'react-router-dom'

interface Props {
  itens: ITicket[] | ICompany[] | IUser[] | IResponsible[] | IPlace[]
  path: string
  title: string
  buttonText: string
  emptyMessage: string
}

const listItens = [
  {
    currentPath: '/home/users',
    component: (data: any) => <UserItemList data={data}/>
  },
  {
    currentPath: '/home/companies',
    component: (data: any) => <CompanyItemList data={data}/>
  },
  {
    currentPath: '/home/places',
    component: (data: any) => <PlaceItemList data={data}/>
  },
  {
    currentPath: '/home/tickets',
    component: (data: any) => <TicketItemList data={data}/>
  },
  {
    currentPath: '/home/responsibles',
    component: (data: any) => <ResponsibleItemList data={data}/>
  }
]

export const List: React.FC<Props> = ({
  itens,
  path,
  title,
  buttonText,
  emptyMessage
}) => {
  const location = useLocation().pathname
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const formatItemToRender = listItens.find((item) => item.currentPath === location)

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
        <CreateButton path={path} text={buttonText}/>
      </Box>
      <Box
        mt={theme.spacing(10)}
        mr={theme.spacing(4)}
        ml={smDown ? theme.spacing(4) : theme.spacing(40)}
      >
        {
          !itens
            ? <EmptyContent message={emptyMessage} />
            : itens.map((item: ITicket | ICompany | IUser | IResponsible | IPlace) => {
              return <Box key={item.id}>
                {
                  formatItemToRender?.component(item)
                }
              </Box>
            })
        }
      </Box>
    </>
  )
}
