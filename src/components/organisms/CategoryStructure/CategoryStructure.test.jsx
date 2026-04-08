import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { vi } from 'vitest';
import CategoryStructure from './CategoryStructure.jsx';

// Recharts doesn't render well in JSDOM, so we mock it
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  PieChart: ({ children }) => <div>{children}</div>,
  Pie: ({ children }) => <div>{children}</div>,
  Cell: () => <div />,
  Tooltip: () => <div />,
  Legend: () => <div />,
}));

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

describe('CategoryStructure', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders title and empty state message when no data', () => {
    useSelector.mockReturnValueOnce([]).mockReturnValueOnce({ currency: 'USD' }).mockReturnValueOnce('light');
    render(<CategoryStructure title="Expenses" type="expense" />);
    expect(screen.getByText('Expenses')).toBeInTheDocument();
    expect(screen.getByText('common.no_data')).toBeInTheDocument();
  });

  it('renders title when data is present', () => {
    const transactions = [
      { id: 1, type: 'expense', category: 'Food', amount: 50 },
    ];
    useSelector.mockReturnValueOnce(transactions).mockReturnValueOnce({ currency: 'USD' }).mockReturnValueOnce('light');
    render(<CategoryStructure title="Expenses" type="expense" />);
    expect(screen.getByText('Expenses')).toBeInTheDocument();
    expect(screen.queryByText('common.no_data')).not.toBeInTheDocument();
  });
});
