import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, refreshAuth } from "../../../services/auth.service";

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

export const verifyUserAuthentication = () => async (dispatch) => {
  const response = await checkAuth();
  const res = await response.json();
  if (!res.success) {
    throw new Error(res.errorCode);
  }
  dispatch(setUser(res.data));
};

export const refreshUserAuthentication = () => async (dispatch) => {
  const response = await refreshAuth();
  const res = await response.json();
  if (!res.success) {
    throw new Error(res.errorCode);
  }
  dispatch(setUser(res.data));
};

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
