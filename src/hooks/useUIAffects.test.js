import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useUIAffects } from './useUIAffects.js';
import { useSelector } from 'react-redux';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

describe('useUIAffects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.documentElement.className = '';
  });

  it('applies theme classes correctly', () => {
    useSelector.mockImplementation((selector) => {
      if (selector.name === 'selectThemeMode') return 'dark';
      if (selector.name === 'selectAccessibility') return { fontSize: 'medium' };
      return null;
    });

    renderHook(() => useUIAffects());

    expect(document.documentElement.classList.contains('dark-theme')).toBe(true);
    expect(document.documentElement.classList.contains('light-theme')).toBe(false);
  });

  it('applies accessibility classes correctly', () => {
    useSelector.mockImplementation((selector) => {
      if (selector.name === 'selectThemeMode') return 'light';
      if (selector.name === 'selectAccessibility') return { 
        highContrast: true, 
        reducedMotion: true, 
        fontSize: 'large' 
      };
      return null;
    });

    renderHook(() => useUIAffects());

    expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
    expect(document.documentElement.classList.contains('reduced-motion')).toBe(true);
    expect(document.documentElement.classList.contains('font-large')).toBe(true);
  });
});
