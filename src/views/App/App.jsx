import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppHeader from '../../components/organisms/AppHeader/AppHeader';
import NavBar from '../../components/organisms/NavBar/NavBar';
import Dashboard from '../../views/Dashboard/Dashboard.jsx';
import Transactions from '../../views/Transactions/Transactions.jsx';
import Reports from '../../views/Reports/Reports.jsx';
import Settings from '../../views/Settings/Settings.jsx';
import Login from '../../views/Login/Login.jsx';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <div className="app-container">
        <AppHeader title="Budget Manager" />
        {isAuthenticated && <NavBar onLogout={handleLogout} />}
        <Routes>
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/transactions" 
            element={isAuthenticated ? <Transactions /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/reports" 
            element={isAuthenticated ? <Reports /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/settings" 
            element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
