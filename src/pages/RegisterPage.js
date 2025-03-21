import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    // Reset error messages
    setErrorMessage("");

    // Check if passwords match
    if (password !== passwordConfirmation) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "https://edtech-backend-3.onrender.com/api/auth/local/register", // Strapi API endpoint
        {
          username,
          email,
          password,
        }
      );
      // If successful, redirect to login page
      const { jwt } = response.data; // Assuming JWT is returned
      if (onLogin) {
        onLogin(jwt); // Call parent handler if provided
      }
      alert("Registration successful!");
      navigate("/login"); // Redirect to login
    } catch (error) {
      console.error("Registration error", error);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        {errorMessage && (
          <Typography color="error" gutterBottom>
            {errorMessage}
          </Typography>
        )}
        <form onSubmit={handleRegister} style={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            type="password"
            margin="normal"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Already have an account?{" "}
            <Button href="/login" color="primary">
              Login
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
