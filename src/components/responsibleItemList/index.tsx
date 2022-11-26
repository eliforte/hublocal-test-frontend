import * as React from 'react'
import {
  Box,
  Typography,
  Stack,
  useTheme
} from '@mui/material'
import { DetailsButton } from '../detailsButton'
import { IResponsible } from '../../store/responsibles/interfaces'

interface Props {
  data: IResponsible
}

export const ResponsibleItemList: React.FC<Props> = ({ data }) => {
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
          <Typography variant="h6">Nome Completo:</Typography>
          <Typography variant="body2">{ data.full_name }</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Endereço:</Typography>
          <Typography variant="body2">{ data.address }</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Telefone:</Typography>
          <Typography variant="body2">{ data.phone_number }</Typography>
        </Box>
      </Stack>
    </Box>
  )
}
