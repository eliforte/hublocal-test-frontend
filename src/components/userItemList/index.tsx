import * as React from 'react'
import {
  Box,
  Typography,
  Chip,
  Stack,
  useTheme
} from '@mui/material'
import { DetailsButton } from '../detailsButton'
import { IUser } from '../../store/users/interfaces'

interface Props {
  data: IUser
}

export const UserItemList: React.FC<Props> = ({ data }) => {
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
          <Typography variant="h6">Nome:</Typography>
          <Typography variant="body2">{ data.name }</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Email:</Typography>
          <Typography variant="body2">{ data.email }</Typography>
        </Box>
        <Box display={ data.is_admin ? 'grid' : 'none'}>
          <Chip label="Administrador" color="success" />
        </Box>
      </Stack>
    </Box>
  )
}
