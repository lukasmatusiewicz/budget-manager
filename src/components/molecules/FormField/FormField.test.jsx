import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import FormField from './FormField.jsx';

describe('FormField', () => {
  const defaultProps = {
    label: 'Test Label',
    name: 'test-input',
    value: '',
    onChange: vi.fn(),
  };

  it('renders label and input correctly', () => {
    render(<FormField {...defaultProps} />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    render(<FormField {...defaultProps} />);
    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('displays placeholder correctly', () => {
    render(<FormField {...defaultProps} placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('sets required attribute correctly', () => {
    render(<FormField {...defaultProps} required={true} />);
    expect(screen.getByLabelText('Test Label')).toBeRequired();
  });

  it('sets input type correctly', () => {
    render(<FormField {...defaultProps} type="number" />);
    expect(screen.getByLabelText('Test Label')).toHaveAttribute('type', 'number');
  });
});
