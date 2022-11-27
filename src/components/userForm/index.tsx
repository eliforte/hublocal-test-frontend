import * as React from 'react'
import dayjs from 'dayjs'
import {
  useTheme,
  useMediaQuery,
  Button,
  Box,
  Stack,
  Typography,
  TextField,
  Chip,
  FormControlLabel,
  Switch
} from '@mui/material'
import { Delete, Save } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import {
  getByIdUser,
  editUser,
  deleteUser,
  useUsers
} from '../../store/users'
import { Loading } from '../loading'

export const UserForm: React.FC = () => {
  const { id } = useParams()
  const [editInputs, setEditInputs] = React.useState({
    name: '',
    email: '',
    is_admin: false,
    id
  })
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const user = useSelector(useUsers)
  const navigate = useNavigate()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const handleDelete = () => {
    dispatch(deleteUser(id))
  }

  const handleUpdate = () => {
    dispatch(editUser(editInputs))
  }

  React.useEffect(() => {
    dispatch(getByIdUser(id))
    if (localStorage.getItem('user') == null) {
      navigate('/')
    }
  }, [])

  if (user.loading) return <Loading />

  return (
    <>
      <Typography
        color="#f5f5f5"
        component="h1"
        variant="h6"
        mb={theme.spacing(4)}
      >
        Informações pessoais:
      </Typography>
      <Box
        sx={{
          backgroundColor: 'whitesmoke',
          border: '1px solid #242424',
          padding: theme.spacing(2),
          marginBottom: theme.spacing(5),
          borderRadius: '5px'
        }}
      >
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            startIcon={<Delete />}
            sx={{
              color: '#de1b1b',
              border: 'none'
            }}
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        </Box>
        {
          user.result[0]
            ? <Stack
              direction="row"
              spacing={ smDown ? theme.spacing(0) : theme.spacing(5)}
              flexWrap="wrap"
            >
              <Box padding={ smDown ? theme.spacing(2) : theme.spacing(0) }>
                <Typography variant="h6">Nome:</Typography>
                <Typography variant="body2">{ user.result[0].name }</Typography>
              </Box>
              <Box padding={ smDown ? theme.spacing(2) : theme.spacing(0) }>
                <Typography variant="h6">Email:</Typography>
                <Typography variant="body2">{ user.result[0].email }</Typography>
              </Box>
              <Box
                padding={ smDown ? theme.spacing(2) : theme.spacing(0) }
                display={ user.result[0].is_admin ? 'flex' : 'none'}>
                <Chip label="Administrador" color="success" />
              </Box>
              <Box
                padding={ smDown ? theme.spacing(2) : theme.spacing(0) }
              >
                <Typography variant="h6">Criado em:</Typography>
                <Typography variant="body2">{ dayjs(user.result[0].created_at).format('DD/MM/YYYY') }</Typography>
              </Box>
            </Stack>
            : <Loading />
        }
      </Box>
      <Box mb={theme.spacing(10)}>
        <Typography
          color="#f5f5f5"
          component="h1"
          variant="h6"
          mb={theme.spacing(3)}
        >
          Editar informações do usuário:
        </Typography>
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
            onChange={ (e) => setEditInputs({ ...editInputs, name: e.target.value })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            onChange={ (e) => setEditInputs({ ...editInputs, email: e.target.value })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <FormControlLabel
            onChange={() => setEditInputs({ ...editInputs, is_admin: !editInputs.is_admin })}
            control={<Switch />}
            label="Administrador"
          />
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              startIcon={<Save />}
              onClick={() => handleUpdate()}
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}
