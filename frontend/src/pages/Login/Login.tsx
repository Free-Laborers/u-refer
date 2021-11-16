// Copied from
// https://github.com/mui-org/material-ui/blob/next/docs/src/pages/getting-started/templates/sign-in/SignIn.tsx

import { FormEvent } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useHistory } from "react-router";
import useAuth from "../../hooks/useAuth";

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
      main: "#1E5857",
    },
    secondary: {
      main: "#E5E5E5",
    },
  },
});

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email: any) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const Login = (props) => {
  const [errMessage, setErrMessage] = useState<string>("");

  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    if (!(data.get("email") && data.get("password"))) {
      return setErrMessage("Please fill out the email and password fields");
    }

    const loginData = {
      email: data.get("email") as string,
      password: data.get("password") as string,
      rememberMe: Boolean(data.get("rememberMe")),
    };

    if (!validateEmail(loginData.email)) {
      return setErrMessage("Please enter a valid email");
    }

    login(loginData)
      .then((_) => history.push('/jobs'))
      .catch((err) => setErrMessage(err.message));
  };

  return (
    <ThemeProvider theme={theme}>
      <style>{"body { background-color: #E5E5E5; }"}</style>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={"./uRefer.png"} alt="UKG_logo" width="300" height="100" />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                localStorage.setItem("authorization", "");
                alert("successfully logged out!");
              }}
            >
              Sign Out
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Typography variant="caption" color="red">
          {errMessage}
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
