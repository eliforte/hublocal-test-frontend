import * as React from 'react'
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'

export const Header: React.FC = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      display="flex"
      flexDirection="row"
      marginLeft={ smDown ? theme.spacing(0) : theme.spacing(29)}
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
