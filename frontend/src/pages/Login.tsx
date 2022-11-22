import { Button, Container, TextField } from "@mui/material";
import * as React from "react";

function Login() {
  return (
    <>
      <Container maxWidth="sm" className="min-h-screen">
        <div className="grid grid-cols-1 gap-4 place-content-center mt-20">
          <img src="logo.png" alt="logo" className="mb-10" />
          <div className="mb-8 grid grid-cols-1 gap-4 place-content-center">
            <TextField
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
            <Button variant="contained">Log In</Button>
          </div>
          <Button variant="text">Create Account</Button>
          <Button variant="text">Forgot Password</Button>
        </div>
      </Container>
    </>
  );
}
export default Login;
