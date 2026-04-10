import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  preferences: {
    defaultType: 'expense',
    defaultCategory: 'Food',
    currency: 'USD'
  },
  budgetLimits: {}
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setAllData: (state, action) => {
      if (action.payload) {
        if (action.payload.items) state.items = action.payload.items;
        if (action.payload.preferences) state.preferences = action.payload.preferences;
        if (action.payload.budgetLimits) state.budgetLimits = action.payload.budgetLimits;
      }
    },
    setPreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    setBudgetLimit: (state, action) => {
      const { category, limit } = action.payload;
      state.budgetLimits[category] = limit;
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
  setPreferences,
  setBudgetLimit,
  addTransaction, 
  removeTransaction, 
  updateTransactionCategory, 
  updateTransactionDate,
  clearTransactions 
} = transactionSlice.actions;

export const selectTransactions = (state) => state.transactions.items;
export const selectTransactionPreferences = (state) => state.transactions.preferences;
export const selectBudgetLimits = (state) => state.transactions.budgetLimits;

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
  [selectTotals],
  (totals) => totals.income - totals.expenses
);

export const selectMonthlyCategorySpending = createSelector(
  [selectTransactions],
  (items) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return items
      .filter(item => {
        const itemDate = new Date(item.date);
        return item.type === 'expense' && 
               itemDate.getMonth() === currentMonth && 
               itemDate.getFullYear() === currentYear;
      })
      .reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.amount;
        return acc;
      }, {});
  }
);

export default transactionSlice.reducer;
