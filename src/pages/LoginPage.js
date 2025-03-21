import { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import api from '../api/axios'; // Axios instance pointing to your API

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/local', {
        identifier: email,
        password: password,
      });

      console.log('Login successful:', res.data);

      const { jwt } = res.data;

      // Call parent handler from App.js
      onLogin(jwt);

      // You can navigate here if you want (optional)
      // navigate('/courses');
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>

      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        sx={{ mt: 3 }}
      >
        Login
      </Button>
    </Container>
  );
}

export default LoginPage;
