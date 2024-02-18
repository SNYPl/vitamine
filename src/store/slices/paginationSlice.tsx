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
      state.productListLength = action.payload;
    },
    setShopPage: (state, action) => {
      state.shopPageValue = action.payload;
    },
  },
});

export const { setProductList, setShopPage } = productsSlice.actions;
export default productsSlice.reducer;
