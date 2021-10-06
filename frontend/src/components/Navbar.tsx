import { AppBar, Toolbar, Box } from '@mui/material'
import Link, { LinkProps } from '@mui/material/Link'
import Logo from './Logo'

const TextLink = (props: LinkProps) => {
  return <Link {...props} style={{margin: '16px'}} underline='hover' color='inherit'/>
}

export default function Navbar() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Logo color='white' />
        <Box mx='auto'>
          <TextLink href='/'>
            Home
          </TextLink>
          <TextLink href='/browse'>
            Browse Jobs
          </TextLink>
          <TextLink href='/login'>
            Log In
          </TextLink>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
