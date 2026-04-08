import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { vi } from 'vitest';
import DangerZone from './DangerZone.jsx';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

describe('DangerZone', () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<DangerZone />);
    expect(screen.getByText('settings.danger_zone')).toBeInTheDocument();
    expect(screen.getByText('settings.clear_button')).toBeInTheDocument();
  });

  it('opens modal when clear button is clicked', () => {
    render(<DangerZone />);
    const clearBtn = screen.getByText('settings.clear_button');
    fireEvent.click(clearBtn);
    expect(screen.getByText('settings.modal_title')).toBeInTheDocument();
  });

  it('dispatches clearTransactions on confirmation', () => {
    render(<DangerZone />);
    fireEvent.click(screen.getByText('settings.clear_button'));
    fireEvent.click(screen.getByText('settings.modal_confirm'));
    expect(dispatchMock).toHaveBeenCalled();
  });
});
