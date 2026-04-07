import { createSlice } from '@reduxjs/toolkit';

const savedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
  isAuthenticated: !!savedUser,
  user: savedUser,
  hasCompletedWelcome: true // Default to true until checked from Firebase
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.hasCompletedWelcome = true;
      localStorage.removeItem('user');
    },
    setWelcomeStatus: (state, action) => {
      state.hasCompletedWelcome = action.payload;
    },
    completeWelcome: (state) => {
      state.hasCompletedWelcome = true;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    updatePassword: (state, action) => {
      // In a real app with Firebase, this would be handled via Firebase Auth directly
      console.log('Password updated successfully');
    }
  },
});

export const { login, logout, setWelcomeStatus, completeWelcome, updateProfile, updatePassword } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectHasCompletedWelcome = (state) => state.auth.hasCompletedWelcome;

export default authSlice.reducer;
