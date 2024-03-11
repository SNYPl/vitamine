import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartUpdated: true,
    cartItems: [],
    wishList: [],
  },
  reducers: {
    setCartUpdated: (state, action) => {
      state.cartUpdated = action.payload;
    },
    setCartItemsGlobal: (state, action) => {
      state.cartItems = action.payload;
    },
    setWishListItem: (state, action) => {
      state.wishList = action.payload;
    },
  },
});

export const {
  setCartUpdated,
  setCartItemsGlobal,
  setWishListItem,
} = cartSlice.actions;

export default cartSlice.reducer;
