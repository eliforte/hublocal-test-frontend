import * as React from 'react'
import { Box, useTheme, Button } from '@mui/material'
import { Logout } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export const LogoutButton: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      padding={theme.spacing(2)}
    >
      <Button
        sx={{ color: '#f5f5f' }}
        endIcon={
          <Logout sx={{ marginLeft: theme.spacing(1) }}/>
        }
        onClick={() => handleClick()}
      >
        Sair
      </Button>
    </Box>
  )
}
