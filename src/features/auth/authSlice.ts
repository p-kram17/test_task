import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  email: string;
  password: string;
}

interface AuthState {
  currentUser: User | null;
  registeredUsers: User[];
  error: string | null;
}

const savedUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");
const savedCurrentUser: User | null = JSON.parse(
  localStorage.getItem("currentUser") || "null"
);

const initialState: AuthState = {
  currentUser: savedCurrentUser,
  registeredUsers: savedUsers,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      const exists = state.registeredUsers.some(
        (u) => u.email === action.payload.email
      );
      if (exists) {
        state.error = "User with this email is already registered";
      } else {
        state.registeredUsers.push(action.payload);
        localStorage.setItem("users", JSON.stringify(state.registeredUsers));
        state.error = null;
      }
    },
    login: (state, action: PayloadAction<User>) => {
      const user = state.registeredUsers.find(
        (u) =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );
      if (user) {
        state.currentUser = user;
        state.error = null;
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        state.error = "User not found or wrong credentials";
      }
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
