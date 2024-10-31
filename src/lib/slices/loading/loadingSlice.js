import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    setErrorState: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoadingState, setErrorState } = loadingSlice.actions;
export const selectLoading = (state) => state.loading.isLoading;
export const selectLoadingError = (state) => state.loading.error;

export default loadingSlice.reducer;
