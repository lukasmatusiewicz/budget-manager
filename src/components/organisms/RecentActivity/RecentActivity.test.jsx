import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { vi } from 'vitest';
import RecentActivity from './RecentActivity.jsx';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

describe('RecentActivity', () => {
  beforeEach(() => {
    useSelector.mockReturnValue({ currency: 'USD' });
    vi.clearAllMocks();
  });

  it('renders placeholder when no transactions', () => {
    render(<RecentActivity transactions={[]} />);
    expect(screen.getByText('dashboard.no_transactions')).toBeInTheDocument();
  });

  it('renders a list of transactions', () => {
    const transactions = [
      { id: '1', type: 'expense', description: 'Coffee', amount: 5, date: '2023-10-01' },
      { id: '2', type: 'income', description: 'Paycheck', amount: 1000, date: '2023-10-01' },
    ];
    render(<RecentActivity transactions={transactions} />);
    expect(screen.getByText('Coffee')).toBeInTheDocument();
    expect(screen.getByText('Paycheck')).toBeInTheDocument();
    expect(screen.getByText('-$5')).toBeInTheDocument();
    expect(screen.getByText('+$1000')).toBeInTheDocument();
  });
});
