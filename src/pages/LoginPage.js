import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent page reload
    setErrorMessage('');     // Reset error message

    try {
      const response = await axios.post(
        'https://edtech-backend-3.onrender.com/api/auth/local', // Login endpoint
        {
          identifier: email,  // Strapi expects "identifier" instead of email
          password: password,
        }
      );

      const { jwt } = response.data;

      if (onLogin) {
        onLogin(jwt);  // Pass token to parent
      }

      alert('Login successful!');
      navigate('/courses');  // Redirect to courses page

    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        {errorMessage && (
          <Typography color="error" gutterBottom>
            {errorMessage}
          </Typography>
        )}

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Don't have an account?{' '}
            <Button href="/register" color="primary">
              Register
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
