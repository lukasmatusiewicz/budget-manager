import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import AppHeader from '../../components/organisms/AppHeader/AppHeader.jsx';
import NavBar from '../../components/organisms/NavBar/NavBar.jsx';
import AppFooter from '../../components/organisms/AppFooter/AppFooter.jsx';
import Dashboard from '../../views/Dashboard/Dashboard.jsx';
import Transactions from '../../views/Transactions/Transactions.jsx';
import Reports from '../../views/Reports/Reports.jsx';
import Settings from '../../views/Settings/Settings.jsx';
import Login from '../../views/Login/Login.jsx';
import Welcome from '../../views/Welcome/Welcome.jsx';
import Legal from '../../views/Legal/Legal.jsx';
import AnimatedView from '../../components/atoms/AnimatedView/AnimatedView.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { useFirebaseSync } from '../../hooks/useFirebaseSync.js';
import { useUIAffects } from '../../hooks/useUIAffects.js';
import { selectAccessibility } from '../../store/slices/accessibilitySlice.js';
import './App.css';

function App() {
  const { t } = useTranslation();
  const location = useLocation();
  const { reducedMotion } = useSelector(selectAccessibility);
  
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
    <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
      <div className="app-container">
        <AppHeader title="Budget Manager" />
        {showNav && <NavBar onLogout={handleLogout} />}
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/login" 
                element={!isAuthenticated ? <AnimatedView><Login /></AnimatedView> : (hasCompletedWelcome ? <Navigate to="/" /> : <Navigate to="/welcome" />)} 
              />
              <Route 
                path="/welcome" 
                element={isAuthenticated ? (hasCompletedWelcome ? <Navigate to="/" /> : <AnimatedView><Welcome /></AnimatedView>) : <Navigate to="/login" />} 
              />
              <Route 
                path="/" 
                element={isAuthenticated ? (hasCompletedWelcome ? <AnimatedView><Dashboard /></AnimatedView> : <Navigate to="/welcome" />) : <Navigate to="/login" />} 
              />
              <Route 
                path="/transactions" 
                element={isAuthenticated ? (hasCompletedWelcome ? <AnimatedView><Transactions /></AnimatedView> : <Navigate to="/welcome" />) : <Navigate to="/login" />} 
              />
              <Route 
                path="/reports" 
                element={isAuthenticated ? (hasCompletedWelcome ? <AnimatedView><Reports /></AnimatedView> : <Navigate to="/welcome" />) : <Navigate to="/login" />} 
              />
              <Route 
                path="/settings" 
                element={isAuthenticated ? (hasCompletedWelcome ? <AnimatedView><Settings /></AnimatedView> : <Navigate to="/welcome" />) : <Navigate to="/login" />} 
              />
              <Route path="/legal" element={<AnimatedView><Legal /></AnimatedView>} />
            </Routes>
          </AnimatePresence>
        </main>
        <AppFooter />
      </div>
    </MotionConfig>
  );
}

export default App;
