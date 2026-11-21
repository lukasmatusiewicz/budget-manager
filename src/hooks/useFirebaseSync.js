import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectThemeMode, selectAccentColor } from '../store/slices/themeSlice.js';
import { selectAccessibility } from '../store/slices/accessibilitySlice.js';
import { selectTransactions, selectTransactionPreferences, selectBudgetLimits, selectRecurringItems } from '../store/slices/transactionSlice.js';
import { saveUserDataToFirebase } from '../store/firebaseSync.js';

const SYNC_DEBOUNCE_MS = 300;

export const useFirebaseSync = (isAuthenticated, hasCompletedWelcome, dataLoaded) => {
  const themeMode = useSelector(selectThemeMode);
  const accentColor = useSelector(selectAccentColor);
  const accessibility = useSelector(selectAccessibility);
  const transactions = useSelector(selectTransactions);
  const transactionPreferences = useSelector(selectTransactionPreferences);
  const budgetLimits = useSelector(selectBudgetLimits);
  const recurringItems = useSelector(selectRecurringItems);
  const isInitialMount = useRef(true);
  const wasReadyRef = useRef(false);

  useEffect(() => {
    const isReady = Boolean(isAuthenticated && dataLoaded.current);

    if (isInitialMount.current) {
      isInitialMount.current = false;
      wasReadyRef.current = isReady;
      return;
    }

    if (!isReady) {
      wasReadyRef.current = false;
      return;
    }

    // Skip the redundant write immediately triggered by initial RTDB hydration
    if (!wasReadyRef.current) {
      wasReadyRef.current = true;
      return;
    }

    const timerId = setTimeout(() => {
      saveUserDataToFirebase({
        theme: {
          mode: themeMode,
          accentColor
        },
        accessibility,
        hasCompletedWelcome,
        transactions: {
          items: transactions,
          preferences: transactionPreferences,
          budgetLimits,
          recurringItems
        }
      }).catch(error => {
        console.error('Failed to sync data to Firebase:', error);
      });
    }, SYNC_DEBOUNCE_MS);

    return () => clearTimeout(timerId);
  }, [themeMode, accentColor, accessibility, transactions, transactionPreferences, budgetLimits, recurringItems, isAuthenticated, hasCompletedWelcome, dataLoaded]);
};
