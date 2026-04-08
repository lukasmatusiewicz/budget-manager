import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import SummaryGrid from './SummaryGrid.jsx';

describe('SummaryGrid', () => {
  it('renders all summary cards with amounts', () => {
    render(<SummaryGrid balance="$1000" income="$2000" expenses="$1000" />);
    expect(screen.getByText('dashboard.total_balance')).toBeInTheDocument();
    
    const thousandElements = screen.getAllByText('$1000');
    expect(thousandElements.length).toBe(2);
    expect(screen.getByText('$2000')).toBeInTheDocument();
  });
});
