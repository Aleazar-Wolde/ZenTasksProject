// frontend/src/pages/Login.jsx
import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

function Login() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField label="Email" fullWidth margin="normal" />
      <TextField label="Password" type="password" fullWidth margin="normal" />
      <Button variant="contained" color="primary">Login</Button>
    </Container>
  );
}

export default Login;
