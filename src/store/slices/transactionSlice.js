import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('transactions')) || [],
  initialBudget: parseFloat(localStorage.getItem('initialBudget')) || 0,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setInitialBudget: (state, action) => {
      state.initialBudget = action.payload;
      localStorage.setItem('initialBudget', action.payload);
    },
    addTransaction: (state, action) => {
      state.items.unshift(action.payload);
      localStorage.setItem('transactions', JSON.stringify(state.items));
    },
    removeTransaction: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('transactions', JSON.stringify(state.items));
    },
    updateTransactionCategory: (state, action) => {
      const { id, category } = action.payload;
      const transaction = state.items.find(item => item.id === id);
      if (transaction) {
        transaction.category = category;
        localStorage.setItem('transactions', JSON.stringify(state.items));
      }
    },
  },
});

export const { setInitialBudget, addTransaction, removeTransaction, updateTransactionCategory } = transactionSlice.actions;

export const selectTransactions = (state) => state.transactions.items;
export const selectInitialBudget = (state) => state.transactions.initialBudget;

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
