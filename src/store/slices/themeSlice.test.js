import { describe, it, expect } from 'vitest';
import reducer, { setTheme, toggleTheme, setAccentColor } from './themeSlice.js';
import { logout } from './authSlice.js';

describe('themeSlice', () => {
  const initialState = {
    mode: 'dark',
    accentColor: '#aa3bff',
  };

  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setTheme with string payload', () => {
    const actual = reducer(initialState, setTheme('light'));
    expect(actual.mode).toBe('light');
    expect(actual.accentColor).toBe('#aa3bff');
  });

  it('should handle setTheme with object payload preserving accentColor', () => {
    const actual = reducer(initialState, setTheme({ mode: 'light', accentColor: '#10b981' }));
    expect(actual).toEqual({ mode: 'light', accentColor: '#10b981' });
  });

  it('should handle toggleTheme', () => {
    const actual = reducer(initialState, toggleTheme());
    expect(actual.mode).toBe('light');
    expect(reducer(actual, toggleTheme()).mode).toBe('dark');
  });

  it('should handle setAccentColor', () => {
    const actual = reducer(initialState, setAccentColor('#3b82f6'));
    expect(actual.accentColor).toBe('#3b82f6');
  });

  it('should reset to initialState on logout', () => {
    const customState = { mode: 'light', accentColor: '#10b981' };
    expect(reducer(customState, logout())).toEqual(initialState);
  });
});
