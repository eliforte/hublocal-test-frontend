import * as React from 'react'
import {
  Box,
  Typography,
  Chip,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { DetailsButton } from '../detailsButton'
import { IUser } from '../../store/users/interfaces'

interface Props {
  data: IUser
}

export const UserItemList: React.FC<Props> = ({ data }) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

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
        flexWrap="wrap"
        spacing={ smDown ? theme.spacing(0) : theme.spacing(4) }
      >
        <Box p={theme.spacing(1)}>
          <Typography variant="h6">Nome:</Typography>
          <Typography variant="body2">{ data.name }</Typography>
        </Box>
        <Box p={theme.spacing(1)}>
          <Typography variant="h6">Email:</Typography>
          <Typography variant="body2">{ data.email }</Typography>
        </Box>
        <Box
          alignItems="center"
          display={ data.is_admin ? 'flex' : 'none'}
          p={theme.spacing(1)}
        >
          <Chip label="Administrador" color="success" />
        </Box>
      </Stack>
    </Box>
  )
}
