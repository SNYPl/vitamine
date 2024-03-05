import { createSlice } from "@reduxjs/toolkit";

export const modalsSlice = createSlice({
  name: "modals",
  initialState: {
    loginModal: true,
  },
  reducers: {
    setLoginModal: (state, action) => {
      state.loginModal = action.payload;
    },
  },
});

export const { setLoginModal } = modalsSlice.actions;

export default modalsSlice.reducer;
