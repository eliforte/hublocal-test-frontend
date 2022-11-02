import * as React from 'react'
import { Box, Backdrop, CircularProgress } from '@mui/material'

export const Loading: React.FC = () => (
  <Box>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  </Box>
)
