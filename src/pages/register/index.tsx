import * as React from 'react'
import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from '@mui/material'
import { useAppDispatch } from '../../hooks'
import { Header } from '../../components/header'
import { signUpUser } from '../../store/users'
import { useNavigate } from 'react-router-dom'

export const Register: React.FC = () => {
  const [inputInfos, setInputInfos] = React.useState({
    email: '',
    password: '',
    name: ''
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(signUpUser(inputInfos))
  }

  return (
    <>
      <Header />
      <Container
        sx={{
          margin: 'auto auto',
          display: 'flex',
          height: '100%',
          alignItems: 'center'
        }}
        component="main"
        maxWidth="xs"
      >
        <Box
          sx={{
            justifyContent: 'center',
            margin: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
            backgroundColor: '#f5f5f5',
            borderRadius: '5px'
          }}
        >
          <Typography color="#212121" component="h1" variant="h5">
            Cadastrar
          </Typography>
          <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              onChange={ (e) => setInputInfos({ ...inputInfos, name: e.target.value })}
              name="name"
              autoFocus
              sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              onChange={ (e) => setInputInfos({ ...inputInfos, email: e.target.value })}
              name="email"
              autoFocus
              sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              onChange={ (e) => setInputInfos({ ...inputInfos, password: e.target.value })}
              type="password"
              id="password"
              sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#424242',
                '&:hover': {
                  backgroundColor: '#212121'
                }
              }}
            >
              Cadastrar-se
            </Button>
            <Grid container sx={{ justifyContent: 'center' }}>
              <Grid item>
                <Link component="button" onClick={() => navigate('/login')} variant="body2">
                  {'Já tem conta? Faça login'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}
