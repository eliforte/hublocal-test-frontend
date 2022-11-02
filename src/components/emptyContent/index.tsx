import * as React from 'react'
import { Box, useTheme, Typography } from '@mui/material'
import { Block } from '@mui/icons-material'

interface Props {
  item: string
}

export const EmptyContent: React.FC<Props> = ({ item }) => {
  const theme = useTheme()

  return (
    <Box sx={{
      maxHeigth: theme.spacing(30),
      maxWidth: theme.spacing(30)
    }}>
      <Block sx={{ heigth: theme.spacing(20) }} />
      <Typography variant="h5" gutterBottom>
        {`Nenhum ${item} encontrado`}
      </Typography>
    </Box>
  )
}
