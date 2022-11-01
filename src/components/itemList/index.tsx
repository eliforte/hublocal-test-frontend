import {
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  name: string
  path: string
  icon: React.ReactNode
}

export const ItemList: React.FC<Props> = ({
  name,
  path,
  icon
}) => {
  const Navigate = useNavigate()

  return (
    <ListItemButton onClick={ () => Navigate(path) }>
      <ListItemIcon>
        { icon }
      </ListItemIcon>
      <ListItemText primary={ name } />
  </ListItemButton>
  )
}
