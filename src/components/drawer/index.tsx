import * as React from 'react'
import {
  Box,
  Drawer,
  useTheme,
  Divider,
  Typography,
  List,
  useMediaQuery,
  Button
} from '@mui/material'
import {
  Person,
  Article,
  AdminPanelSettings,
  Place,
  Business,
  AccountBox,
  Menu
} from '@mui/icons-material'
import { ItemList } from '../itemList'
import { useNavigate } from 'react-router-dom'

export const DrawerMenu: React.FC = () => {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [userInfos, setUserInfos] = React.useState<string>('')
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const Navigate = useNavigate()

  const getUserInfos = () => {
    if (localStorage.getItem('user') != null) {
      const data = JSON.parse(String(localStorage.getItem('user')))
      setUserInfos(data.result.name)
    } else {
      Navigate('/')
    }
  }

  const handleToggle = () => {
    setOpen(!open)
  }

  React.useEffect(() => {
    getUserInfos()
  }, [])

  return (
    <>
      <Button
        sx={{
          padding: '5px',
          margin: '5px',
          border: '1px solid transparent'
        }}
        onClick={() => handleToggle()}
        variant="outlined"
      >
        <Menu
          fontSize='large'
          sx={{ heigth: '25px', margin: '5px', color: '#f5f5f5' }}
        />
      </Button>
      <Drawer
        open={open}
        variant={ smDown ? 'temporary' : 'permanent' }
        onClose={handleToggle}
      >
        <Box
          width={theme.spacing(28)}
          display="flex"
          flexDirection="column"
          height="100%"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
          >
            <Person sx={{ height: theme.spacing(10), width: theme.spacing(10) }} />
            <Typography component="h1" variant="h5">
              Olá, { userInfos }
            </Typography>
          </Box>
          <Divider />
          <Box>
            <List component="nav">
              <ItemList name="Tickets" path="/home" icon={ <Article /> } />
              <ItemList name="Empresas" path="/companies" icon={ <Business /> } />
              <ItemList name="Estabelecimentos" path="/places" icon={ <Place /> } />
              <ItemList name="Responsáveis" path="/responsibles" icon={ <AdminPanelSettings /> } />
              <ItemList name="Usuários" path="/users" icon={ <AccountBox /> } />
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}
