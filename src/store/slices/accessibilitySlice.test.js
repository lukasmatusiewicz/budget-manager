import { describe, it, expect } from 'vitest';
import reducer, { 
  toggleHighContrast, 
  toggleReducedMotion, 
  setFontSize, 
  setAllAccessibility 
} from './accessibilitySlice.js';

describe('accessibilitySlice', () => {
  const initialState = {
    highContrast: false,
    reducedMotion: false,
    fontSize: 'medium',
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle toggleHighContrast', () => {
    const actual = reducer(initialState, toggleHighContrast());
    expect(actual.highContrast).toBe(true);
    expect(reducer(actual, toggleHighContrast()).highContrast).toBe(false);
  });

  it('should handle toggleReducedMotion', () => {
    const actual = reducer(initialState, toggleReducedMotion());
    expect(actual.reducedMotion).toBe(true);
    expect(reducer(actual, toggleReducedMotion()).reducedMotion).toBe(false);
  });

  it('should handle setFontSize', () => {
    const actual = reducer(initialState, setFontSize('large'));
    expect(actual.fontSize).toBe('large');
  });

  it('should handle setAllAccessibility', () => {
    const newData = {
      highContrast: true,
      reducedMotion: true,
      fontSize: 'small'
    };
    const actual = reducer(initialState, setAllAccessibility(newData));
    expect(actual).toEqual(newData);
  });
});
