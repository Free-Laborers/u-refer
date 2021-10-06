import { CssBaseline } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@emotion/react'

let theme = createTheme({
  palette: {
    primary: {
      main: '#025856',
    },
    secondary: {
      main: '#2ad5c4',
    },
  },
})

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
