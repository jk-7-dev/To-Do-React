import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard'); 
  };

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
      <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
    </Routes>
  );
}

export default App;