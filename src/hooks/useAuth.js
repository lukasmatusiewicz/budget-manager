import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase.js';
import { login, logout, setWelcomeStatus, selectIsAuthenticated, selectHasCompletedWelcome } from '../store/slices/authSlice.js';
import { setTheme } from '../store/slices/themeSlice.js';
import { setAllAccessibility } from '../store/slices/accessibilitySlice.js';
import { setAllData } from '../store/slices/transactionSlice.js';
import { fetchAllUserData } from '../store/firebaseSync.js';

export const useAuth = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const dataLoaded = useRef(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const hasCompletedWelcome = useSelector(selectHasCompletedWelcome);

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
          dispatch(setWelcomeStatus(data.hasCompletedWelcome ?? false));
        } else {
          dispatch(setWelcomeStatus(false));
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return { isLoading, isAuthenticated, hasCompletedWelcome, dataLoaded, handleLogout };
};
