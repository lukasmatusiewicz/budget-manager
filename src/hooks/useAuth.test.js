import { renderHook, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useAuth } from './useAuth.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUserData } from '../store/firebaseSync.js';

// Mocks
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  onAuthStateChanged: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../config/firebase.js', () => ({
  auth: {},
}));

vi.mock('../store/firebaseSync.js', () => ({
  fetchAllUserData: vi.fn(),
}));

describe('useAuth', () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockImplementation((selector) => {
      if (selector.name === 'selectIsAuthenticated') return false;
      if (selector.name === 'selectHasCompletedWelcome') return false;
      return false;
    });
  });

  it('handles user login correctly', async () => {
    const mockUser = { uid: '123', email: 'test@test.com', displayName: 'Tester' };
    const mockData = { theme: 'dark', accessibility: {}, transactions: [], hasCompletedWelcome: true };
    
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(mockUser);
      return vi.fn(); // unsubscribe
    });

    fetchAllUserData.mockResolvedValue(mockData);

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalled();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.dataLoaded.current).toBe(true);
    });
  });

  it('handles user logout correctly', async () => {
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null);
      return vi.fn();
    });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalled();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.dataLoaded.current).toBe(false);
    });
  });

  it('calls signOut on handleLogout', async () => {
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      await result.current.handleLogout();
    });

    expect(signOut).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
