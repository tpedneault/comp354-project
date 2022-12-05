import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Md5} from 'ts-md5';
import {useGlobalContext} from "../App";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Book Project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
let email = "";
let password = "";
function SignIn() {
    const navigate = useNavigate();
    const {userID, setUserID} = useGlobalContext();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const hashedPassword=data.get('password')?.toString()!;
      email = data.get('email')?.toString()!;
      password = Md5.hashStr(hashedPassword).toString();
      refetch();
      // eslint-disable-next-line react-hooks/rules-of-hooks
  };
  const fetchData: () => any = async() =>{
    const URL =`http://localhost:3001/api/signin/${email}/${password}`;
    const response = await axios.get(URL);
    return response;
  }
  const {data,refetch} = useQuery( ["signin"], fetchData,{enabled: false});
  //Makeshift way to keep user id in local storage and pull when on refresh
  useEffect(() => {
    if(localStorage.getItem("userID") !== null && localStorage.getItem("userID") !== undefined && localStorage.getItem("userID") !== "" && localStorage.getItem("userID") !== "0" ){
      setUserID(Number(localStorage.getItem("userID")));
      navigate("/");

    }
  });
  useEffect(() => {
    if(data !== undefined){
      if(data.data.length !== 0){
        setUserID(data.data[0].id);
        localStorage.setItem('userID',data.data[0].id);
        navigate("/");
      }
      else{
        alert("Wrong email or password");
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
        <img src="logo.png" alt="logo" className="lg-8" />
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
            />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            Sign In
            </Button>
            <Grid container>
            <Grid item xs>
                <Link href="#" variant="body2">
                Forgot password?
                </Link>
            </Grid>
            <Grid item>
                <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
                </Link>
            </Grid>
            </Grid>
        </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
    </ThemeProvider>
  );
}
export default SignIn;