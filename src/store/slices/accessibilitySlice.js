import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  highContrast: false,
  reducedMotion: false,
  fontSize: 'medium',
};

const accessibilitySlice = createSlice({
  name: 'accessibility',
  initialState,
  reducers: {
    setAllAccessibility: (state, action) => {
      if (action.payload) {
        if (action.payload.highContrast !== undefined) state.highContrast = action.payload.highContrast;
        if (action.payload.reducedMotion !== undefined) state.reducedMotion = action.payload.reducedMotion;
        if (action.payload.fontSize) state.fontSize = action.payload.fontSize;
      }
    },
    toggleHighContrast: (state) => {
      state.highContrast = !state.highContrast;
    },
    toggleReducedMotion: (state) => {
      state.reducedMotion = !state.reducedMotion;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
  },
});

export const { setAllAccessibility, toggleHighContrast, toggleReducedMotion, setFontSize } = accessibilitySlice.actions;

export const selectAccessibility = (state) => state.accessibility;

export default accessibilitySlice.reducer;
