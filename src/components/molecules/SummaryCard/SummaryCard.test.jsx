import { render, screen } from '@testing-library/react';
import SummaryCard from './SummaryCard.jsx';

describe('SummaryCard', () => {
  const defaultProps = {
    title: 'Total Income',
    amount: '$5,000.00',
    iconName: 'income-icon',
    type: 'income',
  };

  it('renders title and amount correctly', () => {
    render(<SummaryCard {...defaultProps} />);
    expect(screen.getByText('Total Income')).toBeInTheDocument();
    expect(screen.getByText('$5,000.00')).toBeInTheDocument();
  });

  it('applies the correct type class', () => {
    const { container } = render(<SummaryCard {...defaultProps} />);
    expect(container.firstChild).toHaveClass('income');
  });

  it('renders the correct icon', () => {
    const { container } = render(<SummaryCard {...defaultProps} />);
    const useElement = container.querySelector('use');
    expect(useElement).toHaveAttribute('href', '/icons.svg#income-icon');
  });
});
