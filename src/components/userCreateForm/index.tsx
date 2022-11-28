import * as React from 'react'
import {
  useTheme,
  Button,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Switch
} from '@mui/material'
import { Save } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks'
import {
  createUserIfAdmin,
  useUsers
} from '../../store/users'
import { Loading } from '../loading'

export const UserCreateForm: React.FC = () => {
  const [userInfos, setUserInfos] = React.useState({
    name: '',
    email: '',
    password: '',
    is_admin: false
  })
  const dispatch = useAppDispatch()
  const user = useSelector(useUsers)
  const theme = useTheme()

  const handleCreate = () => {
    dispatch(createUserIfAdmin(userInfos))
  }

  if (user.loading) return <Loading />

  return (
    <>
      <Typography
        color="#f5f5f5"
        component="h1"
        variant="h6"
        mb={theme.spacing(4)}
      >
        Dados:
      </Typography>
      <Box mb={theme.spacing(10)}>
        <Box
          sx={{
            backgroundColor: 'whitesmoke',
            border: '1px solid #242424',
            padding: theme.spacing(2),
            marginBottom: theme.spacing(5),
            borderRadius: '5px'
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nome"
            onChange={ (e) => setUserInfos({ ...userInfos, name: e.target.value })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            onChange={ (e) => setUserInfos({ ...userInfos, email: e.target.value })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            onChange={ (e) => setUserInfos({ ...userInfos, password: e.target.value })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <FormControlLabel
            onChange={() => setUserInfos({ ...userInfos, is_admin: !userInfos.is_admin })}
            control={<Switch />}
            label="Administrador"
          />
        </Box>
        <Box
          mt={theme.spacing(4)}
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            variant="contained"
            startIcon={<Save />}
            sx={{
              color: '#303030',
              backgroundColor: '#e3e3e3',
              '&:hover': {
                backgroundColor: '#7d7d7d',
                color: '#e3e3e3'
              }
            }}
            onClick={() => handleCreate()}
          >
            Criar novo usuário
          </Button>
        </Box>
      </Box>
    </>
  )
}
