import { createSlice } from '@reduxjs/toolkit';

const savedUser = JSON.parse(localStorage.getItem('user')) || {
  username: 'Admin',
  email: 'admin@example.com'
};

const initialState = {
  isAuthenticated: localStorage.getItem('isLoggedIn') === 'true',
  user: savedUser
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem('isLoggedIn', 'true');
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem('isLoggedIn');
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    updatePassword: (state, action) => {
      // In a real app, you'd send this to a server
      // For mock purposes, we just log it and maybe save a flag
      console.log('Password updated successfully');
    }
  },
});

export const { login, logout, updateProfile, updatePassword } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
