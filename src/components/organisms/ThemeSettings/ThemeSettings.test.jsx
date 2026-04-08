import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { vi } from 'vitest';
import ThemeSettings from './ThemeSettings.jsx';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

describe('ThemeSettings', () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockReturnValue('light');
    vi.clearAllMocks();
  });

  it('renders theme options', () => {
    render(<ThemeSettings />);
    expect(screen.getByText('settings.theme')).toBeInTheDocument();
    expect(screen.getByText('settings.light')).toBeInTheDocument();
    expect(screen.getByText('settings.dark')).toBeInTheDocument();
  });

  it('dispatches setTheme when an option is clicked', () => {
    render(<ThemeSettings />);
    const darkBtn = screen.getByText('settings.dark');
    fireEvent.click(darkBtn);
    expect(dispatchMock).toHaveBeenCalled();
  });
});
