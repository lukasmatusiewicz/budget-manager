import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { vi } from 'vitest';
import TransactionPreferences from './TransactionPreferences.jsx';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

describe('TransactionPreferences', () => {
  const dispatchMock = vi.fn();
  const mockPreferences = {
    defaultType: 'expense',
    defaultCategory: 'Food',
    currency: 'USD'
  };

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockReturnValue(mockPreferences);
    vi.clearAllMocks();
  });

  it('renders preferences options', () => {
    render(<TransactionPreferences />);
    expect(screen.getByText('settings.preferences')).toBeInTheDocument();
    expect(screen.getByText('settings.default_category')).toBeInTheDocument();
    expect(screen.getByText('settings.currency')).toBeInTheDocument();
  });

  it('dispatches setPreferences when type changes', () => {
    render(<TransactionPreferences />);
    const incomeRadio = screen.getByLabelText('common.income');
    fireEvent.click(incomeRadio);
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('dispatches setPreferences when category changes', () => {
    render(<TransactionPreferences />);
    const select = screen.getByDisplayValue('categories.Food');
    fireEvent.change(select, { target: { value: 'Transport' } });
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('dispatches setPreferences when currency changes', () => {
    render(<TransactionPreferences />);
    const select = screen.getByDisplayValue('USD ($)');
    fireEvent.change(select, { target: { value: 'EUR' } });
    expect(dispatchMock).toHaveBeenCalled();
  });
});
