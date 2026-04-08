import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import TypeSelector from './TypeSelector.jsx';

// Mock useTranslation
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('TypeSelector', () => {
  const defaultProps = {
    value: 'expense',
    onChange: vi.fn(),
  };

  it('renders both options', () => {
    render(<TypeSelector {...defaultProps} />);
    expect(screen.getByText('common.expense')).toBeInTheDocument();
    expect(screen.getByText('common.income')).toBeInTheDocument();
  });

  it('sets the correct radio button as checked based on value', () => {
    render(<TypeSelector {...defaultProps} />);
    const expenseRadio = screen.getByLabelText('common.expense');
    const incomeRadio = screen.getByLabelText('common.income');
    
    expect(expenseRadio).toBeChecked();
    expect(incomeRadio).not.toBeChecked();
  });

  it('calls onChange when a different option is selected', () => {
    render(<TypeSelector {...defaultProps} />);
    const incomeRadio = screen.getByLabelText('common.income');
    fireEvent.click(incomeRadio);
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('applies the selected class to the active option', () => {
    render(<TypeSelector {...defaultProps} />);
    const expenseLabel = screen.getByText('common.expense');
    expect(expenseLabel).toHaveClass('selected');
    
    const incomeLabel = screen.getByText('common.income');
    expect(incomeLabel).not.toHaveClass('selected');
  });
});
