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
  try {
    const user = await checkAuth();

    dispatch(setUser(user.data));
  } catch (error) {
    console.error("Error verificando autenticación:", error);
  }
};

export const refreshUserAuthentication = () => async (dispatch) => {
  try {
    const user = await refreshAuth();

    dispatch(setUser(user.data));
  } catch (error) {
    console.error("Error refrescando autenticación:", error);
  }
};

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
