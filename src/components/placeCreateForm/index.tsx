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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material'
import { Save } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks'
import { createPlace, usePlaces } from '../../store/places'
import { getAllCompanies, useCompanies } from '../../store/companies'
import { Loading } from '../loading'
import { useParams } from 'react-router-dom'

export const PlaceCreateForm: React.FC = () => {
  const [companyId, setCompanyId] = React.useState('')
  const [placeInfos, setPlaceInfos] = React.useState({
    name: '',
    address: '',
    address_number: 0,
    complement: '',
    cep: ''
  })
  const [responsableInfos, setResponsableInfos] = React.useState({
    full_name: '',
    address: '',
    address_number: 0,
    phone_number: 0,
    complement: '',
    cep: '',
    is_main_responsable: false
  })
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const user = useSelector(usePlaces)
  const companies = useSelector(useCompanies)
  const theme = useTheme()

  React.useEffect(() => {
    dispatch(getAllCompanies())
  }, [])

  const handleCreate = () => {
    dispatch(createPlace({
      id,
      place: placeInfos,
      responsible: responsableInfos,
      company_id: companyId
    }))
  }

  if (user.loading) return <Loading />

  return (
    <>
      {
        companies.result.length > 0
          ? <Box
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
                <FormHelperText>Escolha uma empresa para registrar o estabelecimento</FormHelperText>
              </FormControl>
            </Box>
          : <Loading />
      }
      <Typography
        display={ companyId ? 'flex' : 'none' }
        color="#f5f5f5"
        component="h1"
        variant="h6"
        mb={theme.spacing(4)}
      >
        Dados do estabelecimento:
      </Typography>
      <Box mb={theme.spacing(10)}>
        <Stack
          display={ companyId ? 'flex' : 'none' }
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
        <Typography
          color="#f5f5f5"
          component="h1"
          variant="h6"
          mb={theme.spacing(4)}
          display={ companyId ? 'flex' : 'none' }
        >
          Dados da pessoa responsável:
        </Typography>
        <Stack
          display={ companyId ? 'flex' : 'none' }
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
          justifyContent="flex-end"
          display={ companyId ? 'flex' : 'none' }
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
            Registrar empresa
          </Button>
        </Box>
      </Box>
    </>
  )
}
