import * as React from 'react'
import {
  Box,
  Typography,
  // useMediaQuery,
  useTheme
} from '@mui/material'
import { DetailsButton } from '../detailsButton'
import { useParams } from 'react-router-dom'

export const CartItem: React.FC = () => {
  const { id } = useParams()
  const theme = useTheme()
  // const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      margin={theme.spacing(0)}
    >
      <Box
        sx={{
          backgroundColor: '#757575',
          padding: theme.spacing(2),
          flexDirection: 'column',
          borderRadius: theme.spacing(2),
          maxWidth: '90%'
        }}
        display="flex"
        marginLeft={theme.spacing(1)}
        marginTop={theme.spacing(10)}
      >
        <DetailsButton id={id} path="tickets" />
        <Box>
          <Typography variant="subtitle1" gutterBottom>teste</Typography>
        </Box>
      </Box>
    </Box>
  )
}
