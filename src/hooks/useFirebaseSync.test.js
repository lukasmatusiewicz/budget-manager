import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useFirebaseSync } from './useFirebaseSync.js';
import { useSelector } from 'react-redux';
import { saveUserDataToFirebase } from '../store/firebaseSync.js';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../store/firebaseSync.js', () => ({
  saveUserDataToFirebase: vi.fn().mockResolvedValue({}),
}));

describe('useFirebaseSync', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('debounces and calls saveUserDataToFirebase when authenticated and dataLoaded', async () => {
    useSelector.mockReturnValue('dark');

    const isAuthenticated = true;
    const hasCompletedWelcome = true;
    const dataLoaded = { current: true };

    const { rerender } = renderHook(
      ({ auth, welcome, loaded }) => useFirebaseSync(auth, welcome, loaded),
      {
        initialProps: { auth: isAuthenticated, welcome: hasCompletedWelcome, loaded: dataLoaded }
      }
    );

    useSelector.mockReturnValue('light');
    rerender({ auth: isAuthenticated, welcome: hasCompletedWelcome, loaded: dataLoaded });

    expect(saveUserDataToFirebase).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(saveUserDataToFirebase).toHaveBeenCalledTimes(1);
    expect(saveUserDataToFirebase).toHaveBeenCalledWith(
      expect.objectContaining({
        theme: { mode: 'light', accentColor: 'light' },
        hasCompletedWelcome: true,
      })
    );
  });

  it('skips the initial post-hydration write and syncs subsequent changes', async () => {
    useSelector.mockReturnValue('dark');
    const dataLoaded = { current: false };

    const { rerender } = renderHook(
      ({ auth, welcome, loaded }) => useFirebaseSync(auth, welcome, loaded),
      {
        initialProps: { auth: false, welcome: false, loaded: dataLoaded }
      }
    );

    // Simulate hydration completing
    dataLoaded.current = true;
    useSelector.mockReturnValue('light');
    rerender({ auth: true, welcome: true, loaded: dataLoaded });

    await act(async () => {
      vi.advanceTimersByTime(300);
    });
    expect(saveUserDataToFirebase).not.toHaveBeenCalled();

    // Subsequent user change should sync
    useSelector.mockReturnValue('dark');
    rerender({ auth: true, welcome: true, loaded: dataLoaded });

    await act(async () => {
      vi.advanceTimersByTime(300);
    });
    expect(saveUserDataToFirebase).toHaveBeenCalledTimes(1);
  });

  it('does not call saveUserDataToFirebase if not authenticated', async () => {
    useSelector.mockReturnValue('dark');

    const isAuthenticated = false;
    const hasCompletedWelcome = true;
    const dataLoaded = { current: true };

    const { rerender } = renderHook(
      ({ auth, welcome, loaded }) => useFirebaseSync(auth, welcome, loaded),
      {
        initialProps: { auth: isAuthenticated, welcome: hasCompletedWelcome, loaded: dataLoaded }
      }
    );

    useSelector.mockReturnValue('light');
    rerender({ auth: isAuthenticated, welcome: hasCompletedWelcome, loaded: dataLoaded });

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(saveUserDataToFirebase).not.toHaveBeenCalled();
  });
});
