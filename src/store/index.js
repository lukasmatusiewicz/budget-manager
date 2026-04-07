import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './slices/transactionSlice.js';
import authReducer from './slices/authSlice.js';
import themeReducer from './slices/themeSlice.js';
import accessibilityReducer from './slices/accessibilitySlice.js';

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    auth: authReducer,
    theme: themeReducer,
    accessibility: accessibilityReducer,
  },
});
