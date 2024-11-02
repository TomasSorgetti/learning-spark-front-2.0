import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  lastname: "",
  email: "",
  deleted: null,
  verified: null,
  roles: [],
  isAuthenticated: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      return { ...state, ...payload, isAuthenticated: true };
    },
    logout: () => initialState,
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
