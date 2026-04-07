import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../../components/organisms/AppHeader/AppHeader.jsx';
import NavBar from '../../components/organisms/NavBar/NavBar.jsx';
import Dashboard from '../../views/Dashboard/Dashboard.jsx';
import Transactions from '../../views/Transactions/Transactions.jsx';
import Reports from '../../views/Reports/Reports.jsx';
import Settings from '../../views/Settings/Settings.jsx';
import Login from '../../views/Login/Login.jsx';
import Setup from '../../views/Setup/Setup.jsx';
import { selectIsAuthenticated, logout, login } from '../../store/slices/authSlice.js';
import { selectThemeMode, setTheme } from '../../store/slices/themeSlice.js';
import { selectAccessibility, setAllAccessibility } from '../../store/slices/accessibilitySlice.js';
import { 
  selectTransactions, 
  selectInitialBudget, 
  selectIsInitialSetup,
  selectTransactionPreferences,
  setAllData 
} from '../../store/slices/transactionSlice.js';
import { auth } from '../../config/firebase.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { fetchAllUserData, saveToFirebase } from '../../store/firebaseSync.js';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInitialSetup = useSelector(selectIsInitialSetup);
  const themeMode = useSelector(selectThemeMode);
  const accessibility = useSelector(selectAccessibility);
  const transactions = useSelector(selectTransactions);
  const initialBudget = useSelector(selectInitialBudget);
  const transactionPreferences = useSelector(selectTransactionPreferences);
  const dispatch = useDispatch();
  
  const [isLoading, setIsLoading] = useState(true);
  const isInitialMount = useRef(true);
  const dataLoaded = useRef(false);

  // Handle Auth State Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'User'
        };
        dispatch(login(userData));
        
        // Fetch and sync data
        const data = await fetchAllUserData();
        if (data) {
          if (data.theme) dispatch(setTheme(data.theme));
          if (data.accessibility) dispatch(setAllAccessibility(data.accessibility));
          if (data.transactions) {
            dispatch(setAllData(data.transactions));
          }
        }
        dataLoaded.current = true;
      } else {
        dispatch(logout());
        dataLoaded.current = false;
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Sync state to Firebase on changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (isAuthenticated && dataLoaded.current) {
      saveToFirebase('theme', themeMode);
      saveToFirebase('accessibility', accessibility);
      saveToFirebase('transactions', {
        items: transactions,
        initialBudget: initialBudget,
        preferences: transactionPreferences
      });
    }
  }, [themeMode, accessibility, transactions, initialBudget, transactionPreferences, isAuthenticated]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light-theme', 'dark-theme');
    if (themeMode === 'light') {
      root.classList.add('light-theme');
    } else if (themeMode === 'dark') {
      root.classList.add('dark-theme');
    }
  }, [themeMode]);

  useEffect(() => {
    const root = document.documentElement;
    const { highContrast, reducedMotion, fontSize } = accessibility;
    
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    root.classList.remove('font-small', 'font-medium', 'font-large');
    root.classList.add(`font-${fontSize}`);
  }, [accessibility]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const showNav = isAuthenticated && !isInitialSetup;

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loader"></div>
        <p>Loading your budget...</p>
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
            element={!isAuthenticated ? <Login /> : (isInitialSetup ? <Navigate to="/setup" /> : <Navigate to="/" />)} 
          />
          <Route 
            path="/setup" 
            element={isAuthenticated ? (isInitialSetup ? <Setup /> : <Navigate to="/" />) : <Navigate to="/login" />} 
          />
          <Route 
            path="/" 
            element={isAuthenticated ? (isInitialSetup ? <Navigate to="/setup" /> : <Dashboard />) : <Navigate to="/login" />} 
          />
          <Route 
            path="/transactions" 
            element={isAuthenticated ? (isInitialSetup ? <Navigate to="/setup" /> : <Transactions />) : <Navigate to="/login" />} 
          />
          <Route 
            path="/reports" 
            element={isAuthenticated ? (isInitialSetup ? <Navigate to="/setup" /> : <Reports />) : <Navigate to="/login" />} 
          />
          <Route 
            path="/settings" 
            element={isAuthenticated ? (isInitialSetup ? <Navigate to="/setup" /> : <Settings />) : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
