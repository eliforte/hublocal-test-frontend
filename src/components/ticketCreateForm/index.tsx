import * as React from 'react'
import {
  useTheme,
  Button,
  Box,
  Typography,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material'
import { Save } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks'
import { createTicket } from '../../store/tickets'
import { getAllUsers, useUsers } from '../../store/users'
import { Loading } from '../loading'
import { getAllPlaces, usePlaces } from '../../store/places'

export const TicketCreateForm: React.FC = () => {
  const [placeInfos, setPlaceInfos] = React.useState({
    id: '',
    name: '',
    address: '',
    address_number: 0,
    complement: '',
    cep: ''
  })
  const [ticketInfos, setTicketInfos] = React.useState({
    status: '',
    upgradable_by_user: ''
  })
  const dispatch = useAppDispatch()
  const users = useSelector(useUsers)
  const places = useSelector(usePlaces)
  const theme = useTheme()

  React.useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllPlaces())
  }, [])

  const handleCreate = () => {
    dispatch(createTicket({
      place: placeInfos,
      ticket: ticketInfos
    }))
  }

  if (users.loading) return <Loading />

  return (
    <>
      <Typography
        color="#f5f5f5"
        component="h1"
        variant="h6"
        mb={theme.spacing(4)}
      >
        Dados do ticket:
      </Typography>
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
                <InputLabel sx={{ color: '#595959' }} >Usuário</InputLabel>
                <Select
                  sx={{ backgroundColor: 'whitesmoke' }}
                  value={ticketInfos.upgradable_by_user}
                  label="Usuário"
                  onChange={(e) => setTicketInfos({ ...ticketInfos, upgradable_by_user: e.target.value })}
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
                <FormHelperText>Escolha um(a) responsável pelo ticket</FormHelperText>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel sx={{ color: '#595959' }}>Status</InputLabel>
                <Select
                  sx={{ backgroundColor: 'whitesmoke' }}
                  value={ticketInfos.status}
                  label="Status"
                  onChange={(e) => setTicketInfos({ ...ticketInfos, status: e.target.value })}
                >
                  <MenuItem value="PENDENTE">Pendente</MenuItem>
                  <MenuItem value="PROGRESSO">Progresso</MenuItem>
                  <MenuItem value="CONCLUÍDO">Concluído</MenuItem>
                </Select>
                <FormHelperText>Escolha o status do ticket</FormHelperText>
              </FormControl>
            </Box>
          : <Loading />
      }
      <Typography
        color="#f5f5f5"
        component="h1"
        variant="h6"
        mb={theme.spacing(4)}
      >
        Dados do estabelecimento:
      </Typography>
      <Box mb={theme.spacing(10)}>
        {
          places.result
            ? <Box
                sx={{
                  backgroundColor: '#f5f5f5',
                  padding: theme.spacing(2),
                  borderRadius: '5px'
                }}
                mb={theme.spacing(5)}
              >
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel sx={{ color: '#f5f5f5' }} >Estabelecimento</InputLabel>
                  <Select
                    sx={{ backgroundColor: 'whitesmoke' }}
                    value={placeInfos.id}
                    label="Estabelecimento"
                    onChange={(e) => setPlaceInfos({ ...placeInfos, id: e.target.value })}
                  >
                    {
                      places.result
                        ? places.result.map((place) => {
                          return <MenuItem
                            key={place.id}
                            value={place.id}
                          >
                            { place.name }
                          </MenuItem>
                        })
                        : <Loading />
                    }
                  </Select>
                  <FormHelperText>Escolha um estabelecimento para registrar a pessoa responsável</FormHelperText>
                </FormControl>
              </Box>
            : <Loading />
        }
        <Stack
          display={placeInfos.id ? 'flex' : 'none'}
          spacing={theme.spacing(2)}
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
            placeholder="Nome"
            onChange={ (e) => setPlaceInfos({ ...placeInfos, name: e.target.value })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Endereço"
            placeholder="Endereço"
            onChange={ (e) => setPlaceInfos({ ...placeInfos, address: e.target.value })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <TextField
            label="Nº"
            placeholder="Nº"
            required
            fullWidth
            onChange={ (e) => setPlaceInfos({ ...placeInfos, address_number: Number(e.target.value) })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Complemento"
            placeholder="Complemento"
            onChange={ (e) => setPlaceInfos({ ...placeInfos, complement: e.target.value })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <TextField
            label="CEP"
            placeholder="somente números"
            required
            fullWidth
            inputProps={{
              maxLength: 8
            }}
            onChange={ (e) => setPlaceInfos({
              ...placeInfos,
              cep: e.target.value
            })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
        </Stack>
        <Box
          display={placeInfos.id ? 'flex' : 'none'}
          mt={theme.spacing(4)}
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
            Registrar ticket
          </Button>
        </Box>
      </Box>
    </>
  )
}
