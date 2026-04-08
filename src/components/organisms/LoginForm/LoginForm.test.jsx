import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { vi } from 'vitest';
import LoginForm from './LoginForm.jsx';
import { signInWithEmailAndPassword } from 'firebase/auth';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
}));

vi.mock('../../../config/firebase.js', () => ({
  auth: {},
}));

describe('LoginForm', () => {
  const dispatchMock = vi.fn();
  const navigateMock = vi.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
    useNavigate.mockReturnValue(navigateMock);
    vi.clearAllMocks();
  });

  it('renders login fields', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('auth.email')).toBeInTheDocument();
    expect(screen.getByLabelText('auth.password')).toBeInTheDocument();
  });

  it('handles mode toggle', () => {
    render(<LoginForm />);
    const toggleBtn = screen.getByText('auth.register_here');
    fireEvent.click(toggleBtn);
    expect(screen.getByLabelText('auth.username')).toBeInTheDocument();
    expect(screen.getByText('auth.login_here')).toBeInTheDocument();
  });

  it('calls login on submit', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({
      user: { uid: '123', email: 'test@example.com', displayName: 'Test User' }
    });

    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText('auth.email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('auth.password'), { target: { value: 'password' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'auth.login' }));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalled();
      expect(navigateMock).toHaveBeenCalledWith('/');
    });
  });
});
