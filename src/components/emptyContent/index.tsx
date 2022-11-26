import * as React from 'react'
import { Box, useTheme, Typography } from '@mui/material'
import { Block } from '@mui/icons-material'

interface Props {
  message: string
}

export const EmptyContent: React.FC<Props> = ({ message }) => {
  const theme = useTheme()

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{
        backgroundColor: 'whitesmoke',
        maxHeigth: theme.spacing(30),
        maxWidth: '100%',
        padding: theme.spacing(2),
        borderRadius: '5px'
      }}
    >
      <Block
        sx={{
          heigth: theme.spacing(20),
          marginBottom: theme.spacing(4),
          marginTop: theme.spacing(2)
        }}
      />
      <Typography
        variant="h5"
        gutterBottom
        alignSelf="center"
      >
        { message }
      </Typography>
    </Box>
  )
}
