import {
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import * as React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

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
  const pagePath = useLocation().pathname
  const Navigate = useNavigate()

  return (
    <ListItemButton sx={{ backgroundColor: pagePath === path ? '#757575' : 'white' }} onClick={ () => Navigate(path) }>
      <ListItemIcon sx={{ color: pagePath === path ? 'white' : '#757575' }}>
        { icon }
      </ListItemIcon>
      <ListItemText sx={{ color: pagePath === path ? 'white' : '#757575' }} primary={ name } />
  </ListItemButton>
  )
}
