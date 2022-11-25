import * as React from 'react'
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { useLocation } from 'react-router-dom'

export const Header: React.FC = () => {
  const path = useLocation().pathname
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      display="flex"
      flexDirection="row"
      marginLeft={
        smDown || (path === '/register' || path === '/')
          ? theme.spacing(2)
          : theme.spacing(29)
      }
      maxWidth="100vw"
    >
      <Typography
        color="#f5f5f5"
        component="h1"
        variant="h2"
        sx={{
          pt: '10px',
          pl: '10px',
          width: '100%',
          borderRadius: '5px'
        }}
      >
        HubTeste
      </Typography>
    </Box>
  )
}
