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
import { getAllPlaces, usePlaces } from '../../store/places'
import { IPlace } from '../../store/places/interfaces'

export const Places: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const places = useSelector(usePlaces)
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
          Estabelecimentos
        </Typography>
        <CreateButton path="places" text="estabelecimento"/>
      </Box>
      <Box
        mt={theme.spacing(10)}
        mr={theme.spacing(4)}
        ml={smDown ? theme.spacing(4) : theme.spacing(40)}
      >
        {
          !places.result
            ? <EmptyContent item="estabelecimento" />
            : places.result.map((place: IPlace) => {
              return <Typography key={place.id}>{ place.name }</Typography>
            })
        }
      </Box>
    </Box>
  )
}
