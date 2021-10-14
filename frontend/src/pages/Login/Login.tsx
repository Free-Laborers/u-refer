// Copied from
// https://github.com/mui-org/material-ui/blob/next/docs/src/pages/getting-started/templates/sign-in/SignIn.tsx

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Redirect } from 'react-router';

// function Copyright(props: any) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E5857"
    },
    secondary: {
      main: "#E5E5E5"
    }
}});

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email: any) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const Login = () => {
  const [errMessage, setErrMessage] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(localStorage.getItem('authorization') !== null);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!(data.get('email') && data.get('password'))) {
      return setErrMessage("Please fill out the email and password fields");
    }

    const login_data = {
      email: data.get('email'),
      password: data.get('password'),
      rememberMe: Boolean(data.get('rememberMe'))
    }

    if (!validateEmail(login_data.email)) {
      return setErrMessage("Please enter a valid email");
    }

    fetch("/login", {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login_data),
    })
      .then(response => {
        if (!response.ok) {
          return Promise.reject("Email or password is incorrect.");
        }
        return response.json();
      })
      .then(json => {
        localStorage.setItem('authorization', json.token);
        setRedirect(true);
      })
      .catch(err => setErrMessage(err));
  };

  if (redirect) {
    return <Redirect to='/' />
  }

  return (
    <ThemeProvider theme={theme}>
      <img src={"./1200px-UKG_logo.png"} alt="UKG_logo" width="150" height="50"/>
      <style>{'body { background-color: #E5E5E5; }'}</style>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={"./uRefer.png"} alt="UKG_logo" width="300" height="100"/>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              name="rememberMe"
              id="rememberMe"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Typography variant='caption' color='red'>
          {errMessage}
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default Login
