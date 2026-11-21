import { createSlice } from '@reduxjs/toolkit';

const getSavedUser = () => {
  try {
    if (typeof localStorage === 'undefined' || typeof localStorage.getItem !== 'function') {
      return null;
    }
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const persistUser = (user) => {
  try {
    if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  } catch {
    // Ignore storage errors in restricted environments
  }
};

const clearPersistedUser = () => {
  try {
    if (typeof localStorage !== 'undefined' && typeof localStorage.removeItem === 'function') {
      localStorage.removeItem('user');
    }
  } catch {
    // Ignore storage errors in restricted environments
  }
};

const savedUser = getSavedUser();

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
      persistUser(action.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.hasCompletedWelcome = true;
      clearPersistedUser();
    },
    setWelcomeStatus: (state, action) => {
      state.hasCompletedWelcome = action.payload;
    },
    completeWelcome: (state) => {
      state.hasCompletedWelcome = true;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      persistUser(state.user);
    }
  },
});

export const { login, logout, setWelcomeStatus, completeWelcome, updateProfile } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectHasCompletedWelcome = (state) => state.auth.hasCompletedWelcome;

export default authSlice.reducer;
