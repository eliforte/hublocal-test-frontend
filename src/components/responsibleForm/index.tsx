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
  FormControlLabel,
  Switch,
  Chip
} from '@mui/material'
import { Delete, Save } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import {
  useResponsibles,
  editResponsible,
  deleteResponsible,
  getByIdResponsible
} from '../../store/responsibles'
import { Loading } from '../loading'

export const ResponsibleForm: React.FC = () => {
  const responsible = useSelector(useResponsibles)
  const { id } = useParams()
  const [responsableInfos, setResponsableInfos] = React.useState({
    full_name: '',
    address: '',
    address_number: 0,
    phone_number: 0,
    complement: '',
    cep: '',
    is_main_responsable: false,
    id: responsible.result[0].id,
    company_id: responsible.result[0].company_id,
    place_id: responsible.result[0].place_id
  })
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const handleDelete = () => {
    dispatch(deleteResponsible(id))
  }

  const handleUpdate = () => {
    dispatch(editResponsible(responsableInfos))
  }

  console.log(responsible)

  React.useEffect(() => {
    dispatch(getByIdResponsible(id))
    if (localStorage.getItem('user') == null) {
      navigate('/')
    }
  }, [])

  if (responsible.loading) return <Loading />

  return (
    <>
      <Typography
        color="#f5f5f5"
        component="h1"
        variant="h6"
        mb={theme.spacing(4)}
      >
        Informações da pessoa responsável:
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
          responsible.result[0]
            ? <Stack
                direction="row"
                spacing={ smDown ? theme.spacing(0) : theme.spacing(5)}
                flexWrap="wrap"
                alignItems="center"
              >
                <Box padding={ smDown ? theme.spacing(2) : theme.spacing(1) }>
                  <Typography variant="h6">Nomec completo:</Typography>
                  <Typography variant="body2">{ responsible.result[0].full_name }</Typography>
                </Box>
                <Box padding={ smDown ? theme.spacing(2) : theme.spacing(1) }>
                  <Typography variant="h6">Contato:</Typography>
                  <Typography variant="body2">{ responsible.result[0].phone_number }</Typography>
                </Box>
                <Box padding={ smDown ? theme.spacing(2) : theme.spacing(1) }>
                  <Typography variant="h6">Endereço:</Typography>
                  <Typography variant="body2">{ responsible.result[0].address }</Typography>
                </Box>
                <Box padding={ smDown ? theme.spacing(2) : theme.spacing(1) }>
                  <Typography variant="h6">Nº:</Typography>
                  <Typography variant="body2">{ responsible.result[0].address_number }</Typography>
                </Box>
                <Box
                  display={ responsible.result[0].complement ? 'flex' : 'none' }
                  padding={ smDown ? theme.spacing(2) : theme.spacing(1) }
                >
                  <Typography variant="h6">Complemento:</Typography>
                  <Typography variant="body2">{ responsible.result[0].complement }</Typography>
                </Box>
                <Box padding={ smDown ? theme.spacing(2) : theme.spacing(1) }>
                  <Typography variant="h6">CEP:</Typography>
                  <Typography variant="body2">{ responsible.result[0].cep }</Typography>
                </Box>
                <Box
                  display={ responsible.result[0].company ? 'flex' : 'none' }
                  padding={ smDown ? theme.spacing(2) : theme.spacing(1) }
                  flexDirection="column"
                >
                  <Typography variant="h6">Responsável pela empresa:</Typography>
                  <Typography variant="body2">{ responsible.result[0].company?.name }</Typography>
                </Box>
                <Box
                  display={ responsible.result[0].place ? 'flex' : 'none' }
                  padding={ smDown ? theme.spacing(2) : theme.spacing(1) }
                  flexDirection="column"
                >
                  <Typography variant="h6">Responsável pelo estabelecimento:</Typography>
                  <Typography variant="body2">{ responsible.result[0].place?.name }</Typography>
                </Box>
                <Box
                  padding={ smDown ? theme.spacing(2) : theme.spacing(1) }
                >
                  <Typography variant="h6">Registrada em:</Typography>
                  <Typography variant="body2">{ dayjs(responsible.result[0].created_at).format('DD/MM/YYYY') }</Typography>
                </Box>
                <Box
                  alignItems="center"
                  display={ responsible.result[0].is_main_responsable ? 'flex' : 'none'}
                  p={theme.spacing(1)}
                >
                  <Chip label="Responsável principal" color="success" />
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
          mb={theme.spacing(4)}
        >
          Dados da pessoa responsável:
        </Typography>
        <Stack
          spacing={theme.spacing(2)}
          sx={{
            backgroundColor: 'whitesmoke',
            border: '1px solid #242424',
            padding: theme.spacing(2),
            borderRadius: '5px'
          }}
        >
          <TextField
            label="Nome Completo"
            placeholder="Nome Completo"
            multiline
            required
            fullWidth
            onChange={ (e) => setResponsableInfos({
              ...responsableInfos,
              full_name: e.target.value
            })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <TextField
            label="Contato"
            placeholder="somente números"
            multiline
            required
            fullWidth
            inputProps={{
              maxLength: 11
            }}
            onChange={ (e) => setResponsableInfos({
              ...responsableInfos,
              phone_number: Number(e.target.value)
            })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <TextField
            label="Endereço"
            placeholder="Endereço"
            multiline
            required
            fullWidth
            onChange={ (e) => setResponsableInfos({
              ...responsableInfos,
              address: e.target.value
            })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <TextField
            label="Nº"
            placeholder="Nº"
            multiline
            required
            fullWidth
            type="number"
            onChange={ (e) => setResponsableInfos({
              ...responsableInfos,
              address_number: Number(e.target.value)
            })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <TextField
            label="Complemento"
            placeholder="Complemento"
            fullWidth
            onChange={ (e) => setResponsableInfos({
              ...responsableInfos,
              complement: e.target.value
            })}
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
            onChange={ (e) => setResponsableInfos({
              ...responsableInfos,
              cep: e.target.value
            })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <FormControlLabel
            onChange={() => setResponsableInfos({
              ...responsableInfos,
              is_main_responsable: !responsableInfos.is_main_responsable
            })}
            control={<Switch />}
            label="Responsável principal"
          />
        </Stack>
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
