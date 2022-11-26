import * as React from 'react'
import dayjs from 'dayjs'
import {
  Box,
  Typography,
  Stack,
  useTheme
} from '@mui/material'
import { DetailsButton } from '../detailsButton'
import { ICompany } from '../../store/companies/interfaces'

interface Props {
  data: ICompany
}

export const CompanyItemList: React.FC<Props> = ({ data }) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        backgroundColor: 'whitesmoke',
        border: '1px solid #242424',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(5),
        borderRadius: '5px'
      }}
    >
      <Box>
        <DetailsButton path="users" id={data.id} />
      </Box>
      <Stack
        direction="row"
        spacing={theme.spacing(5)}
      >
        <Box>
          <Typography variant="h6">Nome:</Typography>
          <Typography variant="body2">{ data.name }</Typography>
        </Box>
        <Box>
          <Typography variant="h6">CNPJ:</Typography>
          <Typography variant="body2">{ data.cnpj }</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Criada em:</Typography>
          <Typography variant="body2">{ dayjs(data.created_at).format('DD/MM/YYYY') }</Typography>
        </Box>
      </Stack>
    </Box>
  )
}
