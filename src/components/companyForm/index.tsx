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
  getByIdCompany,
  editCompany,
  deleteCompany,
  useCompanies
} from '../../store/companies'
import { Loading } from '../loading'

export const CompanyForm: React.FC = () => {
  const { id } = useParams()
  const [editInputs, setEditInputs] = React.useState({
    name: '',
    cnpj: '',
    description: '',
    id
  })
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const company = useSelector(useCompanies)
  const navigate = useNavigate()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const handleDelete = () => {
    dispatch(deleteCompany(id))
  }

  const handleUpdate = () => {
    dispatch(editCompany(editInputs))
  }

  React.useEffect(() => {
    dispatch(getByIdCompany(id))
    if (localStorage.getItem('user') == null) {
      navigate('/')
    }
  }, [])

  if (company.loading) return <Loading />

  return (
    <>
      <Typography
        color="#f5f5f5"
        component="h1"
        variant="h6"
        mb={theme.spacing(4)}
      >
        Informações da empresa:
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
          company.result[0]
            ? <Stack
                direction="row"
                spacing={ smDown ? theme.spacing(0) : theme.spacing(5)}
                flexWrap="wrap"
                alignItems="center"
              >
                <Box padding={ smDown ? theme.spacing(2) : theme.spacing(1) }>
                  <Typography variant="h6">Nome:</Typography>
                  <Typography variant="body2">{ company.result[0].name }</Typography>
                </Box>
                <Box padding={ smDown ? theme.spacing(2) : theme.spacing(1) }>
                  <Typography variant="h6">CNPJ:</Typography>
                  <Typography variant="body2">{ company.result[0].cnpj }</Typography>
                </Box>
                <Box padding={ smDown ? theme.spacing(2) : theme.spacing(1) }>
                  <Typography variant="h6">Descrição:</Typography>
                  <Typography variant="body2">{ company.result[0].description }</Typography>
                </Box>
                <Box
                  padding={ smDown ? theme.spacing(2) : theme.spacing(1) }
                >
                  <Typography variant="h6">Registrada em:</Typography>
                  <Typography variant="body2">{ dayjs(company.result[0].created_at).format('DD/MM/YYYY') }</Typography>
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
          Editar informações da empresa:
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
            label="CPNJ"
            inputProps={{
              maxLength: 14
            }}
            onChange={ (e) => setEditInputs({ ...editInputs, cnpj: e.target.value })}
            sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Descrição"
            onChange={ (e) => setEditInputs({ ...editInputs, description: e.target.value })}
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
