// import { Typography } from '@mui/material'
// import useAuth from '../../hooks/useAuth';

import { Redirect } from "react-router";

export default function Home() {
  return <Redirect to="/jobs" />

  // const { user } = useAuth();

  // return (
  //   <>
  //     <Typography variant='h1'>Welcome home!</Typography>
  //     <Typography data-testid='paragraph'>
  //       Data of logged in user: <br/>
  //       Email: {user?.email} <br/>
  //       First name: {user?.firstName} <br/>
  //       Last name: {user?.lastName} <br/>
  //       Position: {user?.position} <br/>
  //       Is manager: {String(user?.isManager)}
  //     </Typography>
  //   </>
  // )
}
