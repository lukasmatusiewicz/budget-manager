import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('transactions')) || [],
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.items.unshift(action.payload);
      localStorage.setItem('transactions', JSON.stringify(state.items));
    },
    removeTransaction: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('transactions', JSON.stringify(state.items));
    },
  },
});

export const { addTransaction, removeTransaction } = transactionSlice.actions;

export const selectTransactions = (state) => state.transactions.items;

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

export default transactionSlice.reducer;
