import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import loadingReducer from "./slices/loading/loadingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
  },
});

export default store;
