import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectThemeMode } from '../store/slices/themeSlice.js';
import { selectAccessibility } from '../store/slices/accessibilitySlice.js';
import { selectTransactions, selectTransactionPreferences, selectBudgetLimits, selectRecurringItems } from '../store/slices/transactionSlice.js';
import { saveToFirebase } from '../store/firebaseSync.js';

export const useFirebaseSync = (isAuthenticated, hasCompletedWelcome, dataLoaded) => {
  const themeMode = useSelector(selectThemeMode);
  const accessibility = useSelector(selectAccessibility);
  const transactions = useSelector(selectTransactions);
  const transactionPreferences = useSelector(selectTransactionPreferences);
  const budgetLimits = useSelector(selectBudgetLimits);
  const recurringItems = useSelector(selectRecurringItems);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (isAuthenticated && dataLoaded.current) {
      Promise.all([
        saveToFirebase('theme', themeMode),
        saveToFirebase('accessibility', accessibility),
        saveToFirebase('hasCompletedWelcome', hasCompletedWelcome),
        saveToFirebase('transactions', {
          items: transactions,
          preferences: transactionPreferences,
          budgetLimits: budgetLimits,
          recurringItems: recurringItems
        })
      ]).catch(error => {
        console.error('Failed to sync data to Firebase:', error);
      });
    }
  }, [themeMode, accessibility, transactions, transactionPreferences, budgetLimits, recurringItems, isAuthenticated, hasCompletedWelcome, dataLoaded]);
};
