import * as React from 'react'
import {
  Box,
  Link,
  useTheme
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface Props {
  path: string
  text: string
}

export const CreateButton: React.FC<Props> = ({ path, text }) => {
  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <Box>
      <Link
        component="button"
        variant="body2"
        onClick={() => navigate(`/home/${path}/create`)}
        sx={{
          textDecoration: 'none',
          padding: theme.spacing(2),
          fontSize: '18px',
          backgroundColor: 'whitesmoke',
          borderRadius: '5px',
          color: '#3b3b3b'
        }}
      >
        { `Criar ${text}` }
      </Link>
    </Box>
  )
}
