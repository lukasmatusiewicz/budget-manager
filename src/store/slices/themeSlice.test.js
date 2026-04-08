import { describe, it, expect } from 'vitest';
import reducer, { setTheme, toggleTheme } from './themeSlice.js';

describe('themeSlice', () => {
  const initialState = {
    mode: 'dark',
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
});
