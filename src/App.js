import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RegisterPage from './pages/RegisterPage'; // Updated path
import LoginPage from './pages/LoginPage';
import CoursesPage from './pages/CoursesPage';

function App() {
  // Step 1: Initialize the state with null
  const [userToken, setUserToken] = useState(null);

  // Step 2: Load token from localStorage on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserToken(token); // Set the token from storage if it exists
    }
  }, []);

  // Step 3: Function to handle login and token storage
  const handleLogin = (token) => {
    localStorage.setItem('token', token); // Save token to localStorage
    setUserToken(token);                  // Update state so the app rerenders
  };

  // Step 4: Function to handle logout and token removal (optional but good practice)
  const handleLogout = () => {
    localStorage.removeItem('token');     // Remove token from storage
    setUserToken(null);                   // Clear state
  };

  return (
    <Router>
      <Routes>
        {/* Root Route: If no token, redirect to /login */}
        <Route
          path="/"
          element={
            !userToken ? <Navigate to="/register" /> : <Navigate to="/courses" />
          }
        />

        {/* Login Page Route */}
        <Route
          path="/login"
          element={
            !userToken ? (
              <LoginPage onLogin={handleLogin} />
            ) : (
              <Navigate to="/courses" />
            )
          }
        />

        {/* Register Page Route */}
        <Route
          path="/register"
          element={
            !userToken ? (
              <RegisterPage onLogin={handleLogin} />
            ) : (
              <Navigate to="/courses" />
            )
          }
        />

        {/* Courses Page Route */}
        <Route
          path="/courses"
          element={
            userToken ? (
              <CoursesPage userToken={userToken} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
