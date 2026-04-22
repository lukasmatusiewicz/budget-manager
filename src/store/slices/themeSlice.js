import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'dark',
  accentColor: '#aa3bff',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setAccentColor: (state, action) => {
      state.accentColor = action.payload;
    },
  },
});

export const { setTheme, toggleTheme, setAccentColor } = themeSlice.actions;

export const selectThemeMode = (state) => state.theme.mode;
export const selectAccentColor = (state) => state.theme.accentColor;

export default themeSlice.reducer;
