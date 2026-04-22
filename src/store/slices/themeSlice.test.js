import { describe, it, expect } from 'vitest';
import reducer, { setTheme, toggleTheme, setAccentColor } from './themeSlice.js';

describe('themeSlice', () => {
  const initialState = {
    mode: 'dark',
    accentColor: '#aa3bff',
  };

  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setTheme', () => {
    const actual = reducer(initialState, setTheme('light'));
    expect(actual.mode).toBe('light');
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
});
