import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { vi } from 'vitest';
import TransactionItem from './TransactionItem.jsx';

// Mock Redux
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Mock formatters
vi.mock('../../../utils/formatters.js', () => ({
  formatCurrency: (amount) => `$${amount}`,
}));

// Mock action creators
vi.mock('../../../store/slices/transactionSlice.js', () => ({
  updateTransactionCategory: vi.fn((payload) => ({ type: 'UPDATE_CATEGORY', payload })),
  updateTransactionDate: vi.fn((payload) => ({ type: 'UPDATE_DATE', payload })),
  removeTransaction: vi.fn((id) => ({ type: 'REMOVE_TRANSACTION', payload: id })),
  selectTransactionPreferences: vi.fn(),
}));

describe('TransactionItem', () => {
  const dispatchMock = vi.fn();
  const transaction = {
    id: '1',
    type: 'expense',
    description: 'Groceries',
    amount: 50.0,
    category: 'Food',
    date: '2023-10-01',
  };

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockReturnValue({ currency: 'USD' });
    vi.clearAllMocks();
  });

  it('renders transaction details correctly', () => {
    render(<TransactionItem transaction={transaction} />);
    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText(/-\$50/)).toBeInTheDocument();
    expect(screen.getByDisplayValue('2023-10-01')).toBeInTheDocument();
    expect(screen.getByDisplayValue('categories.Food')).toBeInTheDocument();
  });

  it('calls dispatch when category is changed', () => {
    render(<TransactionItem transaction={transaction} />);
    const select = screen.getByDisplayValue('categories.Food');
    fireEvent.change(select, { target: { value: 'Housing' } });
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('calls dispatch when date is changed', () => {
    render(<TransactionItem transaction={transaction} />);
    const dateInput = screen.getByDisplayValue('2023-10-01');
    fireEvent.change(dateInput, { target: { value: '2023-10-02' } });
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('calls dispatch when remove button is clicked', () => {
    const { container } = render(<TransactionItem transaction={transaction} />);
    const removeBtn = container.querySelector('.remove-btn');
    fireEvent.click(removeBtn);
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('applies the correct type class to the list item', () => {
    const { container } = render(<TransactionItem transaction={transaction} />);
    expect(container.firstChild).toHaveClass('expense');
  });

  it('shows positive amount for income type', () => {
    const incomeTransaction = { ...transaction, type: 'income', category: 'Salary' };
    render(<TransactionItem transaction={incomeTransaction} />);
    expect(screen.getByText(/\+\$50/)).toBeInTheDocument();
  });
});
