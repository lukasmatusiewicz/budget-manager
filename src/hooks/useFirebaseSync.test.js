import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useFirebaseSync } from './useFirebaseSync.js';
import { useSelector } from 'react-redux';
import { saveToFirebase } from '../store/firebaseSync.js';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../store/firebaseSync.js', () => ({
  saveToFirebase: vi.fn().mockResolvedValue({}),
}));

describe('useFirebaseSync', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls saveToFirebase when authenticated and dataLoaded', async () => {
    // Initial return values for selectors
    useSelector.mockReturnValue('dark');
    
    const isAuthenticated = true;
    const hasCompletedWelcome = true;
    const dataLoaded = { current: true };

    const { rerender } = renderHook(
      ({ auth, welcome, loaded }) => {
        // We need to ensure themeMode is tracked
        return useFirebaseSync(auth, welcome, loaded);
      },
      {
        initialProps: { auth: isAuthenticated, welcome: hasCompletedWelcome, loaded: dataLoaded }
      }
    );

    // Change a value that triggers the effect
    useSelector.mockReturnValue('light');
    
    rerender({ auth: isAuthenticated, welcome: hasCompletedWelcome, loaded: dataLoaded });

    await waitFor(() => {
      expect(saveToFirebase).toHaveBeenCalledWith('theme', 'light');
    }, { timeout: 2000 });
  });

  it('does not call saveToFirebase if not authenticated', async () => {
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

    // Change value but still not authenticated
    useSelector.mockReturnValue('light');
    rerender({ auth: isAuthenticated, welcome: hasCompletedWelcome, loaded: dataLoaded });

    expect(saveToFirebase).not.toHaveBeenCalled();
  });
});
