import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  highContrast: JSON.parse(localStorage.getItem('accessibility-high-contrast')) || false,
  reducedMotion: JSON.parse(localStorage.getItem('accessibility-reduced-motion')) || false,
  fontSize: localStorage.getItem('accessibility-font-size') || 'medium',
};

const accessibilitySlice = createSlice({
  name: 'accessibility',
  initialState,
  reducers: {
    toggleHighContrast: (state) => {
      state.highContrast = !state.highContrast;
      localStorage.setItem('accessibility-high-contrast', JSON.stringify(state.highContrast));
    },
    toggleReducedMotion: (state) => {
      state.reducedMotion = !state.reducedMotion;
      localStorage.setItem('accessibility-reduced-motion', JSON.stringify(state.reducedMotion));
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
      localStorage.setItem('accessibility-font-size', action.payload);
    },
  },
});

export const { toggleHighContrast, toggleReducedMotion, setFontSize } = accessibilitySlice.actions;

export const selectAccessibility = (state) => state.accessibility;

export default accessibilitySlice.reducer;
