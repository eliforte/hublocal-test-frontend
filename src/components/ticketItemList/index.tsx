import * as React from 'react'
import dayjs from 'dayjs'
import {
  Box,
  Typography,
  Stack,
  useTheme
} from '@mui/material'
import { DetailsButton } from '../detailsButton'
import { ITicket } from '../../store/tickets/interfaces'

interface Props {
  data: ITicket
}

export const TicketItemList: React.FC<Props> = ({ data }) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        backgroundColor: 'whitesmoke',
        border: '1px solid #242424',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(5),
        borderRadius: '5px'
      }}
    >
      <Box display="flex" justifyContent="flex-end">
        <DetailsButton path="users" id={data.id} />
      </Box>
      <Stack
        direction="row"
        spacing={theme.spacing(5)}
      >
        <Box>
          <Typography variant="h6">ID:</Typography>
          <Typography variant="body2">{ data.id }</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Título:</Typography>
          <Typography variant="body2">{ data.title }</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Estabelecimento:</Typography>
          <Typography variant="body2">{ data.name }</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Status:</Typography>
          <Typography variant="body2">{ data.status }</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Criado em:</Typography>
          <Typography variant="body2">{ dayjs(data.created_at).format('DD/MM/YYYY') }</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Criado por:</Typography>
          <Typography variant="body2">{ data.created_by_user }</Typography>
        </Box>
      </Stack>
    </Box>
  )
}
