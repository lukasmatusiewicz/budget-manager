import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppHeader from '../../components/organisms/AppHeader/AppHeader.jsx';
import NavBar from '../../components/organisms/NavBar/NavBar.jsx';
import Dashboard from '../../views/Dashboard/Dashboard.jsx';
import Transactions from '../../views/Transactions/Transactions.jsx';
import Reports from '../../views/Reports/Reports.jsx';
import Settings from '../../views/Settings/Settings.jsx';
import Login from '../../views/Login/Login.jsx';
import Welcome from '../../views/Welcome/Welcome.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { useFirebaseSync } from '../../hooks/useFirebaseSync.js';
import { useUIAffects } from '../../hooks/useUIAffects.js';
import './App.css';

function App() {
  const { t } = useTranslation();
  
  // Custom hooks for business logic
  const { 
    isLoading, 
    isAuthenticated, 
    hasCompletedWelcome, 
    dataLoaded, 
    handleLogout 
  } = useAuth();
  
  useFirebaseSync(isAuthenticated, hasCompletedWelcome, dataLoaded);
  useUIAffects();

  const showNav = isAuthenticated && hasCompletedWelcome;

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loader"></div>
        <p>{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <AppHeader title="Budget Manager" />
        {showNav && <NavBar onLogout={handleLogout} />}
        <Routes>
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login /> : (hasCompletedWelcome ? <Navigate to="/" /> : <Navigate to="/welcome" />)} 
          />
          <Route 
            path="/welcome" 
            element={isAuthenticated ? (hasCompletedWelcome ? <Navigate to="/" /> : <Welcome />) : <Navigate to="/login" />} 
          />
          <Route 
            path="/" 
            element={isAuthenticated ? (hasCompletedWelcome ? <Dashboard /> : <Navigate to="/welcome" />) : <Navigate to="/login" />} 
          />
          <Route 
            path="/transactions" 
            element={isAuthenticated ? (hasCompletedWelcome ? <Transactions /> : <Navigate to="/welcome" />) : <Navigate to="/login" />} 
          />
          <Route 
            path="/reports" 
            element={isAuthenticated ? (hasCompletedWelcome ? <Reports /> : <Navigate to="/welcome" />) : <Navigate to="/login" />} 
          />
          <Route 
            path="/settings" 
            element={isAuthenticated ? (hasCompletedWelcome ? <Settings /> : <Navigate to="/welcome" />) : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
