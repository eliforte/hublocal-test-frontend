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
import { useResponsibles } from '../../store/responsibles'
import { getAllPlaces } from '../../store/places'
import { IResponsible } from '../../store/responsibles/interfaces'

export const Responsibles: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const responsibles = useSelector(useResponsibles)
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  React.useEffect(() => {
    dispatch(getAllPlaces())
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
          Responsáveis
        </Typography>
        <CreateButton path="responsibles" text="responsável"/>
      </Box>
      <Box
        mt={theme.spacing(10)}
        mr={theme.spacing(4)}
        ml={smDown ? theme.spacing(4) : theme.spacing(40)}
      >
        {
          !responsibles.result
            ? <EmptyContent item="responsável" />
            : responsibles.result.map((responsible: IResponsible) => {
              return <Typography key={responsible.id}>{ responsible.full_name }</Typography>
            })
        }
      </Box>
    </Box>
  )
}
