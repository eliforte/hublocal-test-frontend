import * as React from 'react'
import {
  Box,
  useTheme,
  useMediaQuery,
  Typography
} from '@mui/material'
import { CreateButton } from '../createButtom'
import { EmptyContent } from '../emptyContent'
import { ITicket } from '../../store/tickets/interfaces'
import { ICompany } from '../../store/companies/interfaces'
import { IUser } from '../../store/users/interfaces'
import { IResponsible } from '../../store/responsibles/interfaces'
import { IPlace } from '../../store/places/interfaces'

interface Props {
  itens: ITicket[] | ICompany[] | IUser[] | IResponsible[] | IPlace[]
  path: string
  title: string
  buttonText: string
  emptyMessage: string
}

export const List: React.FC<Props> = ({
  itens,
  path,
  title,
  buttonText,
  emptyMessage
}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

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
            : itens.map((item: ITicket | ICompany | IUser | IResponsible | IPlace, index) => {
              return <Typography key={item.id}>{ index }</Typography>
            })
        }
      </Box>
    </>
  )
}
