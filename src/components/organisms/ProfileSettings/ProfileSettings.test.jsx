import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { vi } from 'vitest';
import ProfileSettings from './ProfileSettings.jsx';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

// Mock the action creators specifically to track them if needed
vi.mock('../../../store/slices/authSlice.js', () => ({
  selectUser: vi.fn(),
  updateProfile: vi.fn(() => ({ type: 'UPDATE_PROFILE' })),
  updatePassword: vi.fn(() => ({ type: 'UPDATE_PASSWORD' })),
}));

describe('ProfileSettings', () => {
  const dispatchMock = vi.fn();
  const mockUser = {
    displayName: 'Test User',
    email: 'test@example.com'
  };

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockReturnValue(mockUser);
    vi.clearAllMocks();
    // Mock window.alert
    global.alert = vi.fn();
  });

  it('renders profile and security sections', () => {
    render(<ProfileSettings />);
    expect(screen.getByText('settings.profile')).toBeInTheDocument();
    expect(screen.getByText('settings.security')).toBeInTheDocument();
  });

  it('handles profile update', () => {
    render(<ProfileSettings />);
    fireEvent.click(screen.getByText('settings.update_profile'));
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('handles password update with validation', () => {
    render(<ProfileSettings />);
    
    // Fill passwords
    const inputs = screen.getAllByPlaceholderText('••••••••');
    // inputs: [0]: current, [1]: new, [2]: confirm
    fireEvent.change(inputs[0], { target: { value: 'currentpass' } });
    fireEvent.change(inputs[1], { target: { value: 'newpass' } });
    fireEvent.change(inputs[2], { target: { value: 'newpass' } });
    
    fireEvent.click(screen.getByText('settings.update_password'));
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('shows error if passwords do not match', () => {
    render(<ProfileSettings />);
    
    const inputs = screen.getAllByPlaceholderText('••••••••');
    fireEvent.change(inputs[0], { target: { value: 'currentpass' } });
    fireEvent.change(inputs[1], { target: { value: 'newpass' } });
    fireEvent.change(inputs[2], { target: { value: 'wrongpass' } });
    
    fireEvent.click(screen.getByText('settings.update_password'));
    expect(global.alert).toHaveBeenCalledWith('Passwords do not match!');
  });
});
