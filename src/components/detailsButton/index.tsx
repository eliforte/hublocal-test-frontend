import * as React from 'react'
import {
  Link,
  Box,
  useTheme
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface Props {
  path: string
  id: string | undefined
}

export const DetailsButton: React.FC<Props> = ({ path, id }) => {
  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <Box alignSelf="flex-end" margin={theme.spacing(2)}>
      <Link
        component="button"
        variant="body2"
        color="#eeeeee"
        onClick={() => navigate(`/home/${path}/${id}`)}
      >
        Ver detalhes
      </Link>
    </Box>
  )
}
