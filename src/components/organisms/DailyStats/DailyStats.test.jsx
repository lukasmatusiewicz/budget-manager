import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { vi } from 'vitest';
import DailyStats from './DailyStats.jsx';

// Recharts doesn't render well in JSDOM, so we mock it
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  BarChart: ({ children }) => <div>{children}</div>,
  Bar: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  CartesianGrid: () => <div />,
  Tooltip: () => <div />,
  Cell: () => <div />,
}));

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

describe('DailyStats', () => {
  const mockTransactions = [
    { id: 1, type: 'income', amount: 100, date: new Date().toISOString().split('T')[0] },
    { id: 2, type: 'expense', amount: 40, date: new Date().toISOString().split('T')[0] },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Consistently return the same values for each selector call in a single render
    useSelector.mockImplementation((selector) => {
      // In the component:
      // 1. selectTransactionPreferences (returns {currency})
      // 2. selectTransactions (returns transactions array)
      if (selector.name === 'selectTransactionPreferences') return { currency: 'USD' };
      if (selector.name === 'selectTransactions') return mockTransactions;
      return { currency: 'USD' }; // default
    });
  });

  it('renders correctly with default daily view', () => {
    render(<DailyStats />);
    expect(screen.getByText('reports.daily_stats')).toBeInTheDocument();
    expect(screen.getByText('reports.total_income')).toBeInTheDocument();
    expect(screen.getByText('reports.total_expenses')).toBeInTheDocument();
  });

  it('toggles to monthly view when button is clicked', () => {
    render(<DailyStats />);
    const monthlyBtn = screen.getByText('reports.monthly');
    fireEvent.click(monthlyBtn);
    expect(screen.getByText('reports.monthly_stats')).toBeInTheDocument();
  });

  it('displays correct summary values', () => {
    render(<DailyStats />);
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('$40')).toBeInTheDocument();
    expect(screen.getByText('$60')).toBeInTheDocument(); // Net balance
  });
});
