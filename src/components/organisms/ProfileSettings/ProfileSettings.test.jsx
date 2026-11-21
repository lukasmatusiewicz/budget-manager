import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { vi } from 'vitest';
import {
  updateProfile as firebaseUpdateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword as firebaseUpdatePassword
} from 'firebase/auth';
import ProfileSettings from './ProfileSettings.jsx';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  updateProfile: vi.fn(),
  EmailAuthProvider: {
    credential: vi.fn(),
  },
  reauthenticateWithCredential: vi.fn(),
  updatePassword: vi.fn(),
}));

vi.mock('../../../config/firebase.js', () => ({
  auth: {
    currentUser: {
      uid: 'user123',
      email: 'test@example.com',
      displayName: 'Test User'
    }
  }
}));

vi.mock('../../../store/slices/authSlice.js', () => ({
  selectUser: vi.fn(),
  updateProfile: vi.fn((payload) => ({ type: 'auth/updateProfile', payload })),
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
    firebaseUpdateProfile.mockResolvedValue();
    EmailAuthProvider.credential.mockReturnValue('mock-credential');
    reauthenticateWithCredential.mockResolvedValue();
    firebaseUpdatePassword.mockResolvedValue();
  });

  it('renders profile and security sections with read-only email', () => {
    render(<ProfileSettings />);
    expect(screen.getByText('settings.profile')).toBeInTheDocument();
    expect(screen.getByText('settings.security')).toBeInTheDocument();
    expect(screen.getByLabelText('auth.email')).toBeDisabled();
  });

  it('handles profile update via Firebase Auth and dispatches Redux action', async () => {
    render(<ProfileSettings />);
    fireEvent.change(screen.getByLabelText('auth.username'), {
      target: { value: 'Updated Name' }
    });
    fireEvent.click(screen.getByText('settings.update_profile'));

    await waitFor(() => {
      expect(firebaseUpdateProfile).toHaveBeenCalledWith(
        expect.objectContaining({ uid: 'user123' }),
        { displayName: 'Updated Name' }
      );
      expect(dispatchMock).toHaveBeenCalledWith({
        type: 'auth/updateProfile',
        payload: { displayName: 'Updated Name' }
      });
      expect(screen.getByRole('status')).toHaveTextContent('settings.update_profile_success');
    });
  });

  it('shows inline error if Firebase profile update fails', async () => {
    firebaseUpdateProfile.mockRejectedValue(new Error('Network error'));
    render(<ProfileSettings />);
    fireEvent.click(screen.getByText('settings.update_profile'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('settings.update_profile_error');
    });
  });

  it('rejects whitespace-only username without calling Firebase or dispatch', () => {
    render(<ProfileSettings />);
    fireEvent.change(screen.getByLabelText('auth.username'), {
      target: { value: '   ' }
    });
    fireEvent.click(screen.getByText('settings.update_profile'));

    expect(screen.getByRole('alert')).toHaveTextContent('settings.username_required');
    expect(firebaseUpdateProfile).not.toHaveBeenCalled();
    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('reauthenticates and updates password via Firebase Auth', async () => {
    render(<ProfileSettings />);

    const inputs = screen.getAllByPlaceholderText('••••••••');
    fireEvent.change(inputs[0], { target: { value: 'currentpass' } });
    fireEvent.change(inputs[1], { target: { value: 'newpass123' } });
    fireEvent.change(inputs[2], { target: { value: 'newpass123' } });

    fireEvent.click(screen.getByText('settings.update_password'));

    await waitFor(() => {
      expect(EmailAuthProvider.credential).toHaveBeenCalledWith('test@example.com', 'currentpass');
      expect(reauthenticateWithCredential).toHaveBeenCalledWith(
        expect.objectContaining({ uid: 'user123' }),
        'mock-credential'
      );
      expect(firebaseUpdatePassword).toHaveBeenCalledWith(
        expect.objectContaining({ uid: 'user123' }),
        'newpass123'
      );
      expect(screen.getByRole('status')).toHaveTextContent('settings.update_password_success');
    });
  });

  it('shows inline error if passwords do not match', () => {
    render(<ProfileSettings />);

    const inputs = screen.getAllByPlaceholderText('••••••••');
    fireEvent.change(inputs[0], { target: { value: 'currentpass' } });
    fireEvent.change(inputs[1], { target: { value: 'newpass' } });
    fireEvent.change(inputs[2], { target: { value: 'wrongpass' } });

    fireEvent.click(screen.getByText('settings.update_password'));
    expect(screen.getByRole('alert')).toHaveTextContent('settings.passwords_mismatch');
    expect(reauthenticateWithCredential).not.toHaveBeenCalled();
  });

  it('shows specific inline error when current password is wrong', async () => {
    reauthenticateWithCredential.mockRejectedValue({ code: 'auth/wrong-password' });
    render(<ProfileSettings />);

    const inputs = screen.getAllByPlaceholderText('••••••••');
    fireEvent.change(inputs[0], { target: { value: 'wrongcurrent' } });
    fireEvent.change(inputs[1], { target: { value: 'newpass123' } });
    fireEvent.change(inputs[2], { target: { value: 'newpass123' } });

    fireEvent.click(screen.getByText('settings.update_password'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('settings.invalid_current_password');
    });
  });
});
