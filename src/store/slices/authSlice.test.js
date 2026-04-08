import { describe, it, expect, beforeEach, vi } from 'vitest';
import reducer, { 
  login, 
  logout, 
  setWelcomeStatus, 
  completeWelcome, 
  updateProfile 
} from './authSlice.js';

describe('authSlice', () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    hasCompletedWelcome: true
  };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle login', () => {
    const user = { uid: '123', email: 'test@test.com' };
    const actual = reducer(initialState, login(user));
    expect(actual.isAuthenticated).toBe(true);
    expect(actual.user).toEqual(user);
    expect(JSON.parse(localStorage.getItem('user'))).toEqual(user);
  });

  it('should handle logout', () => {
    const loggedInState = { isAuthenticated: true, user: { uid: '123' }, hasCompletedWelcome: true };
    const actual = reducer(loggedInState, logout());
    expect(actual.isAuthenticated).toBe(false);
    expect(actual.user).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('should handle setWelcomeStatus', () => {
    const actual = reducer(initialState, setWelcomeStatus(false));
    expect(actual.hasCompletedWelcome).toBe(false);
  });

  it('should handle completeWelcome', () => {
    const actual = reducer({ ...initialState, hasCompletedWelcome: false }, completeWelcome());
    expect(actual.hasCompletedWelcome).toBe(true);
  });

  it('should handle updateProfile', () => {
    const user = { uid: '123', displayName: 'Old' };
    const actual = reducer({ ...initialState, user }, updateProfile({ displayName: 'New' }));
    expect(actual.user.displayName).toBe('New');
    expect(JSON.parse(localStorage.getItem('user')).displayName).toBe('New');
  });
});
