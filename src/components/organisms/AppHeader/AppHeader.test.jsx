import { render, screen } from '@testing-library/react';
import AppHeader from './AppHeader.jsx';

describe('AppHeader', () => {
  it('renders the title correctly', () => {
    render(<AppHeader title="Dashboard" />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders with logo icon', () => {
    const { container } = render(<AppHeader title="Dashboard" />);
    const useElement = container.querySelector('use');
    expect(useElement).toHaveAttribute('href', '/icons.svg#wallet-icon');
  });
});
