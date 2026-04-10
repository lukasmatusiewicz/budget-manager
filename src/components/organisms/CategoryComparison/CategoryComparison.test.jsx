import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CategoryComparison from './CategoryComparison.jsx';
import transactionReducer from '../../../store/slices/transactionSlice.js';
import { describe, it, expect, vi } from 'vitest';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Mock Recharts to avoid rendering issues in tests
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  AreaChart: ({ children }) => <div>{children}</div>,
  Area: () => <div data-testid="area-element" />,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
}));

describe('CategoryComparison', () => {
  const mockStore = configureStore({
    reducer: {
      transactions: transactionReducer,
    },
    preloadedState: {
      transactions: {
        items: [
          { id: 1, type: 'expense', amount: 100, category: 'Food', date: '2023-01-01' },
          { id: 2, type: 'expense', amount: 200, category: 'Transport', date: '2023-01-01' },
        ],
        preferences: { currency: 'USD' },
        budgetLimits: {},
        recurringItems: { salary: 0, rent: 0, subscriptions: [] }
      },
    },
  });

  it('renders correctly with title', () => {
    render(
      <Provider store={mockStore}>
        <CategoryComparison />
      </Provider>
    );
    expect(screen.getByText('reports.category_comparison')).toBeInTheDocument();
  });

  it('renders area elements for categories', () => {
    render(
      <Provider store={mockStore}>
        <CategoryComparison />
      </Provider>
    );
    // EXPENSE_CATEGORIES is 7 items long in constants/categories.js
    const areas = screen.getAllByTestId('area-element');
    expect(areas.length).toBeGreaterThan(0);
  });
});
