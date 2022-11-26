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
import { useNavigate } from 'react-router-dom'
import { Header, Loading } from '../../components'
import { useAppDispatch } from '../../hooks'
import { signInUser } from '../../store/users'

export const Login: React.FC = () => {
  const [inputInfos, setInputInfos] = React.useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = React.useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    dispatch(signInUser(inputInfos))
    setLoading(false)
  }

  React.useEffect(() => {
    if (localStorage.getItem('user') != null) {
      navigate('/home/tickets')
    }
  }, [loading])

  return (
    <>
      <Header />
      {
        loading
          ? <Loading />
          : <Container
          sx={{
            margin: 'auto auto',
            display: 'flex',
            alignItems: 'center',
            height: '100%'
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
              Entrar
            </Typography>
            <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{ mt: 1 }}>
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
                Entrar
              </Button>
              <Grid container sx={{ justifyContent: 'center' }}>
                <Grid item>
                  <Link component="button" onClick={() => navigate('/register') } variant="body2">
                    {'Ainda não tem conta? Cadastre-se'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      }
    </>
  )
}
