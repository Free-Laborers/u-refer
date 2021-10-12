import { useEffect, useState } from 'react';
import { Typography } from '@mui/material'
import { Redirect } from 'react-router';
// import axios from 'axios'

export default function Home() {
  const [redirect, setRedirect] = useState<boolean>(false);
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    position: "",
    isManager: "",
  });

  useEffect(() => {
    async function getData() {
      const myHeaders = new Headers();
      const auth = localStorage.getItem('authorization');
      myHeaders.append('authorization', auth ? auth : '');

      const response = await fetch("/employee/profile", {
        method: 'GET',
        headers: myHeaders
      });

      if (response.ok) {
        const json = await response.json();
        return setUserData(json.user);
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
      <Typography variant='h2'>
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
