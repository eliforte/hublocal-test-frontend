import * as React from 'react'
import {
  Tooltip,
  useMediaQuery,
  useTheme,
  Fab
} from '@mui/material'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

interface Props {
  path: string
  text: string
}

export const CreateButton: React.FC<Props> = ({ path, text }) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Fab
      sx={{
        backgroundColor: 'whitesmoke',
        '&:hover': {
          backgroundColor: '#adadad'
        },
        position: 'fixed',
        top: '90%',
        left: smDown ? '80%' : '90%',
        border: '1px solid #969696'
      }}
    >
      <Tooltip title={`Registrar ${text}`}>
        <Add
          sx={{ maring: '1px' }}
          onClick={() => navigate(`/home/${path}/create`)}
        />
      </Tooltip>
    </Fab>
  )
}
