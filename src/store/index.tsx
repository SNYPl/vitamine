import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/paginationSlice";
import searchReducer from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    search: searchReducer,
  },
});

export default store;
