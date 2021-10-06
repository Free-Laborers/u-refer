import { AppBar, Toolbar } from '@mui/material'
import Logo from './Logo'

export default function Navbar() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Logo color='white'/>
      </Toolbar>
    </AppBar>
  )
}
