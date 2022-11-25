import * as React from 'react'
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DrawerMenu } from '../../components/drawer'
import { Header } from '../../components/header'
import { CreateButton } from '../../components/createButtom'
import { useAppDispatch } from '../../hooks'
import { EmptyContent } from '../../components/emptyContent'
import { getAllCompanies, useCompanies } from '../../store/companies'
import { ICompany } from '../../store/companies/interfaces'

export const Companies: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const companies = useSelector(useCompanies)
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  React.useEffect(() => {
    dispatch(getAllCompanies())
    if (localStorage.getItem('user') == null) {
      navigate('/')
    }
  }, [])

  return (
    <Box width="100%">
      <Box
        display="flex"
        flexDirection="row"
      >
        <DrawerMenu />
        <Header />
      </Box>
      <Box
        display="flex"
        mt={theme.spacing(10)}
        mr={theme.spacing(4)}
        ml={smDown ? theme.spacing(4) : theme.spacing(40)}
        justifyContent="space-between"
      >
        <Typography
          color="#f5f5f5"
          component="h1"
          variant="h4"
        >
          Empresas
        </Typography>
        <CreateButton path="companies" text="empresa"/>
      </Box>
      <Box
        mt={theme.spacing(10)}
        mr={theme.spacing(4)}
        ml={smDown ? theme.spacing(4) : theme.spacing(40)}
      >
        {
          !companies.result
            ? <EmptyContent item="empresa" />
            : companies.result.map((companies: ICompany) => {
              return <Typography key={companies.id}>{ companies.name }</Typography>
            })
        }
      </Box>
    </Box>
  )
}
