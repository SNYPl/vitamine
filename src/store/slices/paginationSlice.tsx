import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  productListLength: 0,
  shopPageValue: 1,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
      state.productListLength = action.payload.length;
    },
    setShopPage: (state, action) => {
      state.shopPageValue = action.payload;
    },
  },
});

export const { setProductList, setShopPage } = productsSlice.actions;
export default productsSlice.reducer;
