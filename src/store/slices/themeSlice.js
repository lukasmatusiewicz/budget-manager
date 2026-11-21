import { createSlice } from '@reduxjs/toolkit';
import { logout } from './authSlice.js';

const initialState = {
  mode: 'dark',
  accentColor: '#aa3bff',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      if (typeof action.payload === 'string') {
        state.mode = action.payload;
      } else if (action.payload && typeof action.payload === 'object') {
        if (action.payload.mode === 'light' || action.payload.mode === 'dark') {
          state.mode = action.payload.mode;
        }
        if (typeof action.payload.accentColor === 'string' && action.payload.accentColor) {
          state.accentColor = action.payload.accentColor;
        }
      }
    },
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setAccentColor: (state, action) => {
      state.accentColor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const { setTheme, toggleTheme, setAccentColor } = themeSlice.actions;

export const selectThemeMode = (state) => state.theme.mode;
export const selectAccentColor = (state) => state.theme.accentColor;

export default themeSlice.reducer;
