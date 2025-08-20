import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  LoadingScreenOpen: true,
};

const LoadingScreenSlice = createSlice({
  name: "loadingScreen",
  initialState,
  reducers: {
    closeLoadingScreen: (state) => {
      state.LoadingScreenOpen = false;
    },
  },
});

export const { closeLoadingScreen } = LoadingScreenSlice.actions;

export default LoadingScreenSlice.reducer;
