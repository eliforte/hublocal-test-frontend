import * as React from 'react'
import {
  Link,
  Box
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface Props {
  path: string
  id: string | undefined
}

export const DetailsButton: React.FC<Props> = ({ path, id }) => {
  const navigate = useNavigate()

  return (
    <Box alignSelf="flex-end">
      <Link
        component="button"
        variant="body2"
        color="#787878"
        onClick={() => navigate(`/details/${path}/${id}`)}
      >
        Ver detalhes
      </Link>
    </Box>
  )
}
