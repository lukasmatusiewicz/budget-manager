import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppHeader from './AppHeader.jsx';

describe('AppHeader', () => {
  it('renders the title correctly', () => {
    render(
      <MemoryRouter>
        <AppHeader title="Dashboard" />
      </MemoryRouter>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders with logo icon', () => {
    const { container } = render(
      <MemoryRouter>
        <AppHeader title="Dashboard" />
      </MemoryRouter>
    );
    const useElement = container.querySelector('use');
    expect(useElement).toHaveAttribute('href', '/icons.svg#wallet-icon');
  });
});
