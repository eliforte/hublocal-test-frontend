import * as React from 'react'
import {
  useTheme,
  Button,
  Box,
  Typography,
  TextField,
  Stack,
  FormControlLabel,
  Switch,
  InputLabel,
  Select,
  FormControl,
  FormHelperText,
  MenuItem
} from '@mui/material'
import { Save } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import {
  useResponsibles,
  createResponsible
} from '../../store/responsibles'
import { Loading } from '../loading'
import { useCompanies, getAllCompanies } from '../../store/companies'
import { usePlaces, getAllPlaces } from '../../store/places'

export const ResponsibleCreateForm: React.FC = () => {
  const { id } = useParams()
  console.log(id)
  const [companyId, setCompanyId] = React.useState('')
  const [placeId, setPlaceId] = React.useState('')
  const [companyOrPlace, setCompanyOrPlace] = React.useState(false)
  const [responsableInfos, setResponsableInfos] = React.useState({
    full_name: '',
    address: '',
    address_number: 0,
    phone_number: 0,
    complement: '',
    cep: '',
    is_main_responsable: false,
    id
  })
  const dispatch = useAppDispatch()
  const companies = useSelector(useCompanies)
  const places = useSelector(usePlaces)
  const responsible = useSelector(useResponsibles)
  const theme = useTheme()

  React.useEffect(() => {
    dispatch(getAllCompanies())
    dispatch(getAllPlaces())
  }, [])

  const handleCreate = () => {
    dispatch(createResponsible({ ...responsableInfos, company_id: companyId, place_id: placeId }))
  }

  if (responsible.loading) return <Loading />

  return (
    <>
      <Stack
        sx={{
          padding: theme.spacing(2),
          backgroundColor: 'whitesmoke',
          borderRadius: '5px'
        }}
        direction="row"
        spacing={1}
        alignItems="center"
        mb={theme.spacing(4)}
      >
        <Typography>Empresa</Typography>
          <Switch onChange={() => setCompanyOrPlace(!companyOrPlace)}/>
        <Typography>Estabelecimento</Typography>
      </Stack>
      {
        companies.result
          ? <Box
              display={ companyOrPlace ? 'none' : 'flex' }
              sx={{
                backgroundColor: '#f5f5f5',
                padding: theme.spacing(2),
                borderRadius: '5px'
              }}
              mb={theme.spacing(5)}
            >
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel sx={{ color: '#f5f5f5' }} >Empresa</InputLabel>
                <Select
                  sx={{ backgroundColor: 'whitesmoke' }}
                  value={companyId}
                  label="Empresa"
                  onChange={(e) => setCompanyId(e.target.value)}
                >
                  {
                    companies.result
                      ? companies.result.map((company) => {
                        return <MenuItem
                          key={company.id}
                          value={company.id}
                        >
                          { company.name }
                        </MenuItem>
                      })
                      : <Loading />
                  }
                </Select>
                <FormHelperText>Escolha uma empresa para registrar a pessoa responsável</FormHelperText>
              </FormControl>
            </Box>
          : <Loading />
      }
      {
        places.result
          ? <Box
              display={ companyOrPlace ? 'flex' : 'none' }
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
                  value={placeId}
                  label="Estabelecimento"
                  onChange={(e) => setPlaceId(e.target.value)}
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
      <Typography
          color="#f5f5f5"
          component="h1"
          variant="h6"
          display={ companyId || placeId ? 'flex' : 'none' }
          mb={theme.spacing(4)}
        >
          Dados da pessoa responsável:
        </Typography>
        <Stack
          display={ companyId || placeId ? 'flex' : 'none' }
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
          display={ companyId || placeId ? 'flex' : 'none' }
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
            Registrar responsável
          </Button>
        </Box>
    </>
  )
}
