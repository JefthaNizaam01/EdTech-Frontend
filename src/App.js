import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RegisterPage from './pages/RegisterPage'; 
import LoginPage from './pages/LoginPage';
import CoursesPage from './pages/CoursesPage';

function App() {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserToken(token); 
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token); 
    setUserToken(token);                  
  };

  
  const handleLogout = () => {
    localStorage.removeItem('token');     
    setUserToken(null);               
  };

  return (
    <Router>
      <Routes>
        {}
        <Route
          path="/"
          element={
            !userToken ? <Navigate to="/register" /> : <Navigate to="/courses" />
          }
        />

        {}
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

        {}
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

        {}
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
