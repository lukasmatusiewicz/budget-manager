import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { vi } from 'vitest';
import QuickStatsTable from './QuickStatsTable.jsx';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../../../utils/formatters.js', () => ({
  formatCurrency: (amount) => `$${amount}`,
}));

describe('QuickStatsTable', () => {
  const mockTransactions = [
    { id: '1', type: 'expense', amount: 50, date: new Date().toISOString().split('T')[0], category: 'Food' },
    { id: '2', type: 'income', amount: 200, date: new Date().toISOString().split('T')[0], category: 'Salary' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    useSelector.mockImplementation((selector) => {
      if (selector.name === 'selectTransactionPreferences') return { currency: 'USD' };
      if (selector.name === 'selectTransactions') return mockTransactions;
      return { currency: 'USD' };
    });
  });

  it('renders correctly', () => {
    render(<QuickStatsTable />);
    expect(screen.getByText('reports.quick_stats')).toBeInTheDocument();
    expect(screen.getByText('reports.metric')).toBeInTheDocument();
  });

  it('displays correct summary values for the last 30 days', () => {
    render(<QuickStatsTable />);
    // Since mock transactions are for today, they should be included in "last 30 days"
    // Count metric
    expect(screen.getByText('reports.metrics.count')).toBeInTheDocument();
    
    // Sum for 30 days
    expect(screen.getByText('reports.metrics.sum_30')).toBeInTheDocument();
    expect(screen.getAllByText('$200').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('$50').length).toBeGreaterThanOrEqual(1);
  });
});
