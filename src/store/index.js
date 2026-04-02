import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './slices/transactionSlice.js';
import authReducer from './slices/authSlice.js';

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    auth: authReducer,
  },
});
