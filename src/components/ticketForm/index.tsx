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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material'
import { Delete, Save } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import {
  deleteTicket,
  editTicket,
  getByIdTicket,
  useTickets
} from '../../store/tickets'
import { Loading } from '../loading'
import { getAllUsers, useUsers } from '../../store/users'

export const TicketForm: React.FC = () => {
  const { id } = useParams()
  const [editInputs, setEditInputs] = React.useState({
    status: '',
    name: '',
    address: '',
    address_number: 0,
    complement: '',
    cep: '',
    id
  })
  const [userId, setUserId] = React.useState('')
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const tickets = useSelector(useTickets)
  const users = useSelector(useUsers)
  const navigate = useNavigate()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const handleDelete = () => {
    dispatch(deleteTicket(id))
  }

  const handleUpdate = () => {
    const upgradableByUser = users.result.find((user) => user.id === userId)
    dispatch(editTicket({ ...editInputs, upgradable_by_user: upgradableByUser?.id }))
  }

  React.useEffect(() => {
    dispatch(getByIdTicket(id))
    dispatch(getAllUsers())
    if (localStorage.getItem('user') == null) {
      navigate('/')
    }
  }, [])

  if (tickets.loading) return <Loading />

  return (
    <>
      <Typography
        color="#f5f5f5"
        component="h1"
        variant="h6"
        mb={theme.spacing(4)}
      >
        Informações do estabelecimento:
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
          tickets.result[0]
            ? <Stack
                direction="row"
                spacing={ smDown ? theme.spacing(0) : theme.spacing(5)}
                flexWrap="wrap"
                alignItems="center"
              >
                <Box padding={ smDown ? theme.spacing(2) : theme.spacing(1) }>
                  <Typography variant="h6">Título:</Typography>
                  <Typography variant="body2">{ tickets.result[0].title }</Typography>
                </Box>
                <Box padding={ smDown ? theme.spacing(2) : theme.spacing(1) }>
                  <Typography variant="h6">Status:</Typography>
                  <Typography variant="body2">{ tickets.result[0].status }</Typography>
                </Box>
                <Box padding={ smDown ? theme.spacing(2) : theme.spacing(1) }>
                  <Typography variant="h6">Estabelecimento:</Typography>
                  <Typography variant="body2">{ tickets.result[0].name }</Typography>
                </Box>
                <Box padding={ smDown ? theme.spacing(2) : theme.spacing(1) }>
                  <Typography variant="h6">Endereço:</Typography>
                  <Typography variant="body2">{ tickets.result[0].address }</Typography>
                </Box>
                <Box padding={ smDown ? theme.spacing(2) : theme.spacing(1) }>
                  <Typography variant="h6">Nº:</Typography>
                  <Typography variant="body2">{ tickets.result[0].address_number }</Typography>
                </Box>
                <Box
                  display={ tickets.result[0].complement ? 'flex' : 'none' }
                  padding={ smDown ? theme.spacing(2) : theme.spacing(1) }
                  flexDirection="column"
                >
                  <Typography variant="h6">Complemento:</Typography>
                  <Typography variant="body2">{ tickets.result[0].complement }</Typography>
                </Box>
                <Box padding={ smDown ? theme.spacing(2) : theme.spacing(1) }>
                  <Typography variant="h6">CEP:</Typography>
                  <Typography variant="body2">{ tickets.result[0].cep }</Typography>
                </Box>
                <Box
                  padding={ smDown ? theme.spacing(2) : theme.spacing(1) }
                >
                  <Typography variant="h6">Registrada em:</Typography>
                  <Typography variant="body2">{ dayjs(tickets.result[0].created_at).format('DD/MM/YYYY') }</Typography>
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
          Novas informações do ticket e estabelecimento:
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
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel sx={{ color: '#595959' }}>Status</InputLabel>
            <Select
              sx={{ backgroundColor: 'whitesmoke' }}
              value={editInputs.status}
              label="Status"
              onChange={(e) => setEditInputs({ ...editInputs, status: e.target.value })}
            >
              <MenuItem value="PENDENTE">Pendente</MenuItem>
              <MenuItem value="PROGRESSO">Progresso</MenuItem>
              <MenuItem value="CONCLUÍDO">Concluído</MenuItem>
            </Select>
            <FormHelperText>Escolha o novo status</FormHelperText>
          </FormControl>
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
            label="Endereço"
            onChange={ (e) => setEditInputs({ ...editInputs, address: e.target.value })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nº"
            onChange={ (e) => setEditInputs({ ...editInputs, address_number: Number(e.target.value) })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Complemento"
            onChange={ (e) => setEditInputs({ ...editInputs, complement: e.target.value })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="CEP"
            onChange={ (e) => setEditInputs({ ...editInputs, cep: e.target.value })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          {
            users.result.length > 0
              ? <Box
                  sx={{
                    backgroundColor: '#f5f5f5',
                    padding: theme.spacing(2),
                    borderRadius: '5px'
                  }}
                  mb={theme.spacing(5)}
                >
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel sx={{ color: '#f5f5f5' }} >Usuário Responsável</InputLabel>
                    <Select
                      sx={{ backgroundColor: 'whitesmoke' }}
                      value={userId}
                      label="Usuário Responsável"
                      onChange={(e) => setUserId(e.target.value)}
                    >
                      {
                        users.result
                          ? users.result.map((user) => {
                            return <MenuItem
                              key={user.id}
                              value={user.id}
                            >
                              { user.name }
                            </MenuItem>
                          })
                          : <Loading />
                      }
                    </Select>
                    <FormHelperText>Escolha um usuário responsável pelo ticket</FormHelperText>
                  </FormControl>
                </Box>
              : <Loading />
          }
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
            onClick={() => handleUpdate()}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </>
  )
}
