import { useState, useEffect } from 'react';

export const useAppLogic = () => {
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

  return {
    isAuthenticated,
    handleLogin,
    handleLogout
  };
};
