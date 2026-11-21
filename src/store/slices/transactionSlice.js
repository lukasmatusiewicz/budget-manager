import { createSlice, createSelector } from '@reduxjs/toolkit';
import { logout } from './authSlice.js';

const initialState = {
  items: [],
  preferences: {
    defaultType: 'expense',
    defaultCategory: 'Food',
    currency: 'USD'
  },
  budgetLimits: {},
  recurringItems: {
    salary: 0,
    rent: 0,
    subscriptions: []
  }
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setAllData: (state, action) => {
      const payload = action.payload;
      if (!payload) return;
      state.items = Array.isArray(payload.items) ? payload.items : [];
      state.preferences = {
        ...initialState.preferences,
        ...(payload.preferences || {}),
      };
      state.budgetLimits = payload.budgetLimits && typeof payload.budgetLimits === 'object'
        ? payload.budgetLimits
        : {};
      state.recurringItems = {
        ...initialState.recurringItems,
        ...(payload.recurringItems || {}),
        subscriptions: Array.isArray(payload.recurringItems?.subscriptions)
          ? payload.recurringItems.subscriptions
          : [],
      };
    },
    setPreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    setBudgetLimit: (state, action) => {
      const { category, limit } = action.payload;
      state.budgetLimits[category] = limit;
    },
    setRecurringItems: (state, action) => {
      state.recurringItems = { ...state.recurringItems, ...action.payload };
    },
    addSubscription: (state, action) => {
      state.recurringItems.subscriptions.push(action.payload);
    },
    removeSubscription: (state, action) => {
      state.recurringItems.subscriptions = state.recurringItems.subscriptions.filter(s => s.id !== action.payload);
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
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const { 
  setAllData,
  setPreferences,
  setBudgetLimit,
  setRecurringItems,
  addSubscription,
  removeSubscription,
  addTransaction, 
  removeTransaction, 
  updateTransactionCategory, 
  updateTransactionDate,
  clearTransactions 
} = transactionSlice.actions;

export const selectTransactions = (state) => state.transactions.items;
export const selectTransactionPreferences = (state) => state.transactions.preferences;
export const selectBudgetLimits = (state) => state.transactions.budgetLimits;
export const selectRecurringItems = (state) => state.transactions.recurringItems;

export const selectTotals = createSelector(
  [selectTransactions, selectRecurringItems],
  (items, recurring) => {
    const totals = items.reduce((acc, current) => {
      if (current.type === 'income') {
        acc.income += current.amount;
      } else {
        acc.expenses += current.amount;
      }
      return acc;
    }, { income: 0, expenses: 0 });

    // Add recurring items
    const safeRecurring = recurring || {};
    totals.income += (safeRecurring.salary || 0);
    totals.expenses += (safeRecurring.rent || 0);
    
    (safeRecurring.subscriptions || []).forEach(sub => {
      if (sub.frequency === 'weekly') {
        totals.expenses += sub.amount * 4; // Approximate monthly cost
      } else {
        totals.expenses += sub.amount;
      }
    });

    return totals;
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

export const selectMonthlyHistory = createSelector(
  [selectTransactions],
  (items) => {
    const history = items.reduce((acc, item) => {
      const monthKey = item.date.substring(0, 7); // YYYY-MM
      if (!acc[monthKey]) {
        acc[monthKey] = { month: monthKey, income: 0, expenses: 0, categories: {} };
      }
      
      if (item.type === 'income') {
        acc[monthKey].income += item.amount;
      } else {
        acc[monthKey].expenses += item.amount;
        acc[monthKey].categories[item.category] = (acc[monthKey].categories[item.category] || 0) + item.amount;
      }
      return acc;
    }, {});

    return Object.values(history).sort((a, b) => a.month.localeCompare(b.month));
  }
);

export const selectTopMerchants = createSelector(
  [selectTransactions],
  (items) => {
    const merchants = items
      .filter(item => item.type === 'expense')
      .reduce((acc, item) => {
        const name = item.description || 'Unknown';
        acc[name] = (acc[name] || 0) + item.amount;
        return acc;
      }, {});

    return Object.entries(merchants)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }
);

export default transactionSlice.reducer;
