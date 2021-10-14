import { useState } from 'react'
import { AccountCircle } from '@mui/icons-material'
import { AppBar, Toolbar, IconButton, Box, Menu, MenuItem, Divider } from '@mui/material'
import Link, { LinkProps } from '@mui/material/Link'
import Logo from './Logo'

const TextLink = (props: LinkProps) => {
  return <Link {...props} style={{ margin: '16px' }} underline='hover' color='inherit' />
}

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Jobs</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Referrals</MenuItem>
      <Divider/>
      <MenuItem onClick={handleMenuClose}>Log Out</MenuItem>
    </Menu>
  )

  return (
    <AppBar position='static'>
      <Toolbar>
        <Logo color='white' style={{ marginRight: '100px' }} />

        {/* Main Links */}
        <Box style={{ flex: 1 }}>
          <TextLink href='/'>Home</TextLink>
          <TextLink href='/browse'>Browse Jobs</TextLink>
          <TextLink href='/login'>Log In</TextLink>
        </Box>

        <IconButton style={{ float: 'right' }} size='large' edge='end' onClick={handleProfileMenuOpen} color='inherit'>
          <AccountCircle />
        </IconButton>
        {renderMenu}
      </Toolbar>
    </AppBar>
  )
}