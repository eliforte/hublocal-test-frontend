import * as React from 'react'
import dayjs from 'dayjs'
import {
  useTheme,
  useMediaQuery,
  Button,
  Box,
  Stack,
  Typography,
  TextField
} from '@mui/material'
import { Delete, Save } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import {
  deletePlace,
  editPlace,
  getByIdPlace,
  usePlaces
} from '../../store/places'
import { Loading } from '../loading'

export const PlaceForm: React.FC = () => {
  const { id } = useParams()
  const [editInputs, setEditInputs] = React.useState({
    name: '',
    address: '',
    address_number: 0,
    complement: '',
    cep: '',
    id
  })
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const place = useSelector(usePlaces)
  const navigate = useNavigate()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const handleDelete = () => {
    dispatch(deletePlace(id))
  }

  const handleUpdate = () => {
    dispatch(editPlace(editInputs))
  }

  React.useEffect(() => {
    dispatch(getByIdPlace(id))
    if (localStorage.getItem('user') == null) {
      navigate('/')
    }
  }, [])

  if (place.loading) return <Loading />

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
          place.result[0]
            ? <Stack
                direction="row"
                spacing={ smDown ? theme.spacing(0) : theme.spacing(5)}
                flexWrap="wrap"
                alignItems="center"
              >
                <Box padding={ smDown ? theme.spacing(2) : theme.spacing(1) }>
                  <Typography variant="h6">Nome:</Typography>
                  <Typography variant="body2">{ place.result[0].name }</Typography>
                </Box>
                <Box padding={ smDown ? theme.spacing(2) : theme.spacing(1) }>
                  <Typography variant="h6">Endereço:</Typography>
                  <Typography variant="body2">{ place.result[0].address }</Typography>
                </Box>
                <Box padding={ smDown ? theme.spacing(2) : theme.spacing(1) }>
                  <Typography variant="h6">Nº:</Typography>
                  <Typography variant="body2">{ place.result[0].address_number }</Typography>
                </Box>
                <Box
                  display={ place.result[0].complement ? 'flex' : 'none' }
                  padding={ smDown ? theme.spacing(2) : theme.spacing(1) }
                  flexDirection="column"
                >
                  <Typography variant="h6">Complemento:</Typography>
                  <Typography variant="body2">{ place.result[0].complement }</Typography>
                </Box>
                <Box padding={ smDown ? theme.spacing(2) : theme.spacing(1) }>
                  <Typography variant="h6">CEP:</Typography>
                  <Typography variant="body2">{ place.result[0].cep }</Typography>
                </Box>
                <Box
                  padding={ smDown ? theme.spacing(2) : theme.spacing(1) }
                >
                  <Typography variant="h6">Registrada em:</Typography>
                  <Typography variant="body2">{ dayjs(place.result[0].created_at).format('DD/MM/YYYY') }</Typography>
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
          Editar informações do estabelecimento:
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
