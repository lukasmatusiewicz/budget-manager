import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  initialBudget: 0,
  isInitialSetup: true,
  preferences: {
    defaultType: 'expense',
    defaultCategory: 'Food'
  }
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setAllData: (state, action) => {
      if (action.payload) {
        if (action.payload.items) state.items = action.payload.items;
        if (action.payload.initialBudget !== undefined) {
          state.initialBudget = action.payload.initialBudget;
          state.isInitialSetup = false;
        }
        if (action.payload.preferences) state.preferences = action.payload.preferences;
      }
    },
    setInitialBudget: (state, action) => {
      state.initialBudget = action.payload;
      state.isInitialSetup = false;
    },
    setPreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    addTransaction: (state, action) => {
      state.items.unshift(action.payload);
    },
    removeTransaction: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateTransactionCategory: (state, action) => {
      const { id, category } = action.payload;
      const transaction = state.items.find(item => item.id === id);
      if (transaction) {
        transaction.category = category;
      }
    },
    updateTransactionDate: (state, action) => {
      const { id, date } = action.payload;
      const transaction = state.items.find(item => item.id === id);
      if (transaction) {
        transaction.date = date;
      }
    },
    clearTransactions: (state) => {
      state.items = [];
    },
  },
});

export const { 
  setAllData,
  setInitialBudget, 
  setPreferences,
  addTransaction, 
  removeTransaction, 
  updateTransactionCategory, 
  updateTransactionDate,
  clearTransactions 
} = transactionSlice.actions;

export const selectTransactions = (state) => state.transactions.items;
export const selectInitialBudget = (state) => state.transactions.initialBudget;
export const selectIsInitialSetup = (state) => state.transactions.isInitialSetup;
export const selectTransactionPreferences = (state) => state.transactions.preferences;

export const selectTotals = createSelector(
  [selectTransactions],
  (items) => {
    return items.reduce((acc, current) => {
      if (current.type === 'income') {
        acc.income += current.amount;
      } else {
        acc.expenses += current.amount;
      }
      return acc;
    }, { income: 0, expenses: 0 });
  }
);

export const selectBalance = createSelector(
  [selectTotals, selectInitialBudget],
  (totals, initialBudget) => initialBudget + totals.income - totals.expenses
);

export default transactionSlice.reducer;
