import { describe, it, expect } from 'vitest';
import reducer, { 
  addTransaction, 
  removeTransaction, 
  updateTransactionCategory, 
  updateTransactionDate, 
  clearTransactions,
  setAllData,
  setPreferences,
  selectTotals,
  selectBalance
} from './transactionSlice.js';

describe('transactionSlice', () => {
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

  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addTransaction', () => {
    const item = { id: 1, amount: 100, type: 'income' };
    const actual = reducer(initialState, addTransaction(item));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0]).toEqual(item);
  });

  it('should handle removeTransaction', () => {
    const state = { ...initialState, items: [{ id: 1 }, { id: 2 }] };
    const actual = reducer(state, removeTransaction(1));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].id).toBe(2);
  });

  it('should handle updateTransactionCategory', () => {
    const state = { ...initialState, items: [{ id: 1, category: 'Food' }] };
    const actual = reducer(state, updateTransactionCategory({ id: 1, category: 'Transport' }));
    expect(actual.items[0].category).toBe('Transport');
  });

  it('should handle updateTransactionDate', () => {
    const state = { ...initialState, items: [{ id: 1, date: '2023-01-01' }] };
    const actual = reducer(state, updateTransactionDate({ id: 1, date: '2023-01-02' }));
    expect(actual.items[0].date).toBe('2023-01-02');
  });

  it('should handle clearTransactions', () => {
    const state = { ...initialState, items: [{ id: 1 }] };
    const actual = reducer(state, clearTransactions());
    expect(actual.items).toHaveLength(0);
  });

  it('should handle setAllData', () => {
    const data = { 
      items: [{ id: 1 }], 
      preferences: { currency: 'EUR', defaultType: 'income', defaultCategory: 'Salary' } 
    };
    const actual = reducer(initialState, setAllData(data));
    expect(actual.items).toHaveLength(1);
    expect(actual.preferences.currency).toBe('EUR');
  });

  it('should handle setPreferences', () => {
    const actual = reducer(initialState, setPreferences({ currency: 'PLN' }));
    expect(actual.preferences.currency).toBe('PLN');
  });

  describe('selectors', () => {
    const state = {
      transactions: {
        items: [
          { type: 'income', amount: 1000 },
          { type: 'expense', amount: 300 },
          { type: 'expense', amount: 200 }
        ],
        recurringItems: {
          salary: 0,
          rent: 0,
          subscriptions: []
        }
      }
    };

    it('selectTotals should calculate income and expenses', () => {
      const totals = selectTotals(state);
      expect(totals).toEqual({ income: 1000, expenses: 500 });
    });

    it('selectBalance should calculate balance', () => {
      const balance = selectBalance(state);
      expect(balance).toBe(500);
    });
  });
});
