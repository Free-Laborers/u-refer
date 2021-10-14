import { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material'
import { Redirect } from 'react-router';

interface UserData {
  email: string,
  firstName: string,
  lastName: string,
  position: string,
  isManager: boolean | undefined
}

export default function Home() {
  const [redirect, setRedirect] = useState<boolean>(localStorage.getItem('authorization') === null);  
  const [userData, setUserData] = useState<UserData>({
    email: "",
    firstName: "",
    lastName: "",
    position: "",
    isManager: undefined,
  });

  useEffect(() => {
    async function getData() {
      const auth = localStorage.getItem('authorization');
      if (auth) {
        const myHeaders = new Headers();
        myHeaders.append('authorization', auth);

        const response = await fetch("/employee/profile", {
          method: 'GET',
          headers: myHeaders
        });

        if (response.ok) {
          const json = await response.json();
          return setUserData(json.user);
        }
      }

      return setRedirect(true); // redirect to login
    }

    getData();
  }, []);

  if (redirect) {
    localStorage.removeItem('authorization');
    return <Redirect to="/login" />
  }

  return (
    <>
      <Typography variant='h1'>Welcome home!</Typography>
      <Typography>
        Data of logged in user: <br/>
        Email: {userData.email} <br/>
        First name: {userData.firstName} <br/>
        Last name: {userData.lastName} <br/>
        Position: {userData.position} <br/>
        Is manager: {String(userData.isManager)}
      </Typography>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => {
          localStorage.removeItem('authorization');
          setRedirect(true);
        }}>
          Sign Out
      </Button>
    </>
  )
}
