import * as React from 'react'
import {
  Box,
  Typography,
  useTheme
} from '@mui/material'
import { DetailsButton } from '../detailsButton'
import { useParams } from 'react-router-dom'

export const CartItem: React.FC = () => {
  const { id } = useParams()
  const theme = useTheme()

  return (
    <Box
      margin={theme.spacing(0)}
    >
      <Box
        display="flex"
        ml={theme.spacing(1)}
        mt={theme.spacing(10)}
      >
        <DetailsButton id={id} path="tickets" />
        <Box>
          <Typography variant="subtitle1" gutterBottom>teste</Typography>
        </Box>
      </Box>
    </Box>
  )
}
