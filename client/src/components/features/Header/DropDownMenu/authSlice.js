import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    login: (state, action) => action.payload,
    logout: () => null,
  }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer;

export const selectAuthData = state => state.auth;