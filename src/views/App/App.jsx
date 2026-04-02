import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../../components/organisms/AppHeader/AppHeader.jsx';
import NavBar from '../../components/organisms/NavBar/NavBar.jsx';
import Dashboard from '../../views/Dashboard/Dashboard.jsx';
import Transactions from '../../views/Transactions/Transactions.jsx';
import Reports from '../../views/Reports/Reports.jsx';
import Settings from '../../views/Settings/Settings.jsx';
import Login from '../../views/Login/Login.jsx';
import { selectIsAuthenticated, logout } from '../../store/slices/authSlice.js';
import './App.css';

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <div className="app-container">
        <AppHeader title="Budget Manager" />
        {isAuthenticated && <NavBar onLogout={handleLogout} />}
        <Routes>
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login /> : <Navigate to="/" />} 
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
