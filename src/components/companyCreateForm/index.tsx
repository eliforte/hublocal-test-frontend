import * as React from 'react'
import {
  useTheme,
  Button,
  Box,
  Typography,
  TextField,
  Stack,
  FormControlLabel,
  Switch
} from '@mui/material'
import { Save } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks'
import {
  useCompanies,
  createCompany
} from '../../store/companies'
import { Loading } from '../loading'

export const CompanyCreateForm: React.FC = () => {
  const [companyInfos, setCompanyInfos] = React.useState({
    name: '',
    cnpj: '',
    description: ''
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
  const user = useSelector(useCompanies)
  const theme = useTheme()

  const handleCreate = () => {
    dispatch(createCompany({ company: companyInfos, responsible: responsableInfos }))
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
        Dados da empresa:
      </Typography>
      <Box mb={theme.spacing(10)}>
        <Stack
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
            onChange={ (e) => setCompanyInfos({ ...companyInfos, name: e.target.value })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="CNPJ"
            placeholder="CNPJ"
            inputProps={{
              maxLength: 14
            }}
            onChange={ (e) => setCompanyInfos({ ...companyInfos, cnpj: e.target.value })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <TextField
            label="Descrição"
            placeholder="Descrição"
            multiline
            required
            fullWidth
            inputProps={{
              maxLength: 500
            }}
            onChange={ (e) => setCompanyInfos({ ...companyInfos, description: e.target.value })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
        </Stack>
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
            Registrar empresa
          </Button>
        </Box>
      </Box>
    </>
  )
}
