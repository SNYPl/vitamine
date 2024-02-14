import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartUpdated: true,
    cartItems: [],
  },
  reducers: {
    setCartUpdated: (state, action) => {
      state.cartUpdated = action.payload;
    },
    setCartItemsGlobal: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { setCartUpdated, setCartItemsGlobal } = cartSlice.actions;

export default cartSlice.reducer;
