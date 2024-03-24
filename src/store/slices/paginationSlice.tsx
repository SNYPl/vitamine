import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  productListLength: 0,
  shopPageValue: 1,
  showProductNumber: 12,
  sortingValue: "default",
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
    setShowProductNumber: (state, action) => {
      state.showProductNumber = action.payload;
    },
    setSortingValue: (state, action) => {
      state.sortingValue = action.payload;
    },
  },
});

export const {
  setProductList,
  setShopPage,
  setShowProductNumber,
  setSortingValue,
} = productsSlice.actions;
export default productsSlice.reducer;
