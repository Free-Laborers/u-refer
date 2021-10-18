import { CssBaseline } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@emotion/react'

const light = createTheme({
  palette: {
    primary: {
      main: '#025856',
    },
    background: {
      default: '#fafafa'
    },
    secondary: {
      main: '#2ad5c4',
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={light}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
