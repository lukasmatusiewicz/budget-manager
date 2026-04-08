import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { vi } from 'vitest';
import TransactionForm from './TransactionForm.jsx';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

describe('TransactionForm', () => {
  const dispatchMock = vi.fn();
  const mockPreferences = {
    defaultType: 'expense',
    defaultCategory: 'Food'
  };

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockReturnValue(mockPreferences);
    vi.clearAllMocks();
  });

  it('renders form fields', () => {
    render(<TransactionForm />);
    expect(screen.getByLabelText('common.description')).toBeInTheDocument();
    expect(screen.getByLabelText('common.amount')).toBeInTheDocument();
  });

  it('handles submission', () => {
    render(<TransactionForm />);
    
    fireEvent.change(screen.getByLabelText('common.description'), { target: { value: 'Lunch' } });
    fireEvent.change(screen.getByLabelText('common.amount'), { target: { value: '15.50' } });
    
    fireEvent.click(screen.getByText('transactions.add_button'));
    
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('resets form after submission', () => {
    render(<TransactionForm />);
    
    const descInput = screen.getByLabelText('common.description');
    fireEvent.change(descInput, { target: { value: 'Lunch' } });
    fireEvent.change(screen.getByLabelText('common.amount'), { target: { value: '15.50' } });
    
    fireEvent.click(screen.getByText('transactions.add_button'));
    
    expect(descInput.value).toBe('');
  });
});
