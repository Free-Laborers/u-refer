import { useEffect, useState } from 'react';
import { Typography } from '@mui/material'
import { Redirect } from 'react-router';
// import axios from 'axios'

export default function Home() {
  const [redirect, setRedirect] = useState<boolean>(false); // we could also do useState<boolean>(auth)...??? check how it looks
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    position: "",
    isManager: "",
  });

  useEffect(() => {
    async function getData() {
      const auth = localStorage.getItem('authorization');

      if (auth) {
        const myHeaders = new Headers();
        myHeaders.append('authorization', auth);

        const response = await fetch("http://127.0.0.1:5000/employee/profile", {
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
        Is manager: {userData.isManager}
      </Typography>
    </>
  )
}
