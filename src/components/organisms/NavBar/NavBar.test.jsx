import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import NavBar from './NavBar.jsx';

describe('NavBar', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <NavBar onLogout={vi.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByText('nav.dashboard')).toBeInTheDocument();
    expect(screen.getByText('nav.transactions')).toBeInTheDocument();
  });

  it('calls onLogout when logout button is clicked', () => {
    const logoutMock = vi.fn();
    render(
      <MemoryRouter>
        <NavBar onLogout={logoutMock} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('common.logout'));
    expect(logoutMock).toHaveBeenCalled();
  });
});
