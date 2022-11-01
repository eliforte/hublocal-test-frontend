import * as React from 'react'
import {
  Box,
  Typography,
  useTheme
} from '@mui/material'

export const Header: React.FC = () => {
  const theme = useTheme()

  return (
    <Box marginLeft={theme.spacing(29)}>
      <Typography
        color="#f5f5f5"
        component="h1"
        variant="h2"
        sx={{
          pt: '10px',
          pl: '10px',
          width: '100vw',
          borderRadius: '5px'
        }}
      >
        HubTeste
      </Typography>
    </Box>
  )
}
