import { Typography } from '@mui/material'
import useAuth from '../../hooks/useAuth';

export default function Home() {
  const auth = useAuth();

  if (!auth.user) {
    return null;
  }

  return (
    <>
      <Typography variant='h1'>Welcome home!</Typography>
      <Typography>
        Data of logged in user: <br/>
        Email: {auth.user.email} <br/>
        First name: {auth.user.firstName} <br/>
        Last name: {auth.user.lastName} <br/>
        Position: {auth.user.position} <br/>
        Is manager: {auth.user.isManager}
      </Typography>
    </>
  )
}
