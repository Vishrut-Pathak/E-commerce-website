import { createSlice } from "@reduxjs/toolkit";

const USERS_STORAGE_KEY = "ecommerce_registered_users";
const CURRENT_USER_KEY = "ecommerce_current_user";

// Seed default sample user if not already present
function getRegisteredUsers() {
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to read registered users:", err);
  }
  const defaultUsers = [
    { username: "demo", password: "password123", name: "Demo Shopper" }
  ];
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
  } catch (e) {}
  return defaultUsers;
}

function getCurrentUser() {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to read current user:", err);
  }
  return null;
}

const initialUser = getCurrentUser();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialUser,
    isAuthenticated: Boolean(initialUser),
    isAuthModalOpen: false,
    authMode: "login", // 'login' or 'signup'
    error: null,
    successMessage: null
  },
  reducers: {
    openAuthModal: (state, action) => {
      state.isAuthModalOpen = true;
      state.authMode = action.payload || "login";
      state.error = null;
      state.successMessage = null;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
      state.error = null;
      state.successMessage = null;
    },
    setAuthMode: (state, action) => {
      state.authMode = action.payload;
      state.error = null;
      state.successMessage = null;
    },
    login: (state, action) => {
      const { username, password } = action.payload;
      const cleanUsername = username?.trim().toLowerCase();
      const registeredUsers = getRegisteredUsers();

      const matchedUser = registeredUsers.find(
        (u) => u.username.toLowerCase() === cleanUsername && u.password === password
      );

      if (matchedUser) {
        const userInfo = {
          username: matchedUser.username,
          name: matchedUser.name || matchedUser.username
        };
        state.user = userInfo;
        state.isAuthenticated = true;
        state.error = null;
        state.successMessage = `Welcome back, ${userInfo.name}!`;
        state.isAuthModalOpen = false;
        try {
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userInfo));
        } catch (e) {}
      } else {
        state.error = "Invalid username or password. Please try again.";
      }
    },
    signup: (state, action) => {
      const { username, password, name } = action.payload;
      const cleanUsername = username?.trim().toLowerCase();
      if (!cleanUsername || !password) {
        state.error = "Please provide both username and password.";
        return;
      }

      const registeredUsers = getRegisteredUsers();
      const existingUser = registeredUsers.find(
        (u) => u.username.toLowerCase() === cleanUsername
      );

      if (existingUser) {
        state.error = "Username already exists. Please choose a different username or login.";
        return;
      }

      const newUser = {
        username: cleanUsername,
        password: password,
        name: name?.trim() || cleanUsername
      };

      const updatedUsers = [...registeredUsers, newUser];
      try {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      } catch (e) {}

      const userInfo = {
        username: newUser.username,
        name: newUser.name
      };
      state.user = userInfo;
      state.isAuthenticated = true;
      state.error = null;
      state.successMessage = `Account created successfully! Welcome, ${userInfo.name}!`;
      state.isAuthModalOpen = false;

      try {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userInfo));
      } catch (e) {}
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.successMessage = "Logged out successfully.";
      try {
        localStorage.removeItem(CURRENT_USER_KEY);
      } catch (e) {}
    },
    clearAuthError: (state) => {
      state.error = null;
      state.successMessage = null;
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice;
