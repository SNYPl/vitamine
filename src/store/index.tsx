import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/paginationSlice";
import priceFilterReducer from "./slices/priceSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    priceFilter: priceFilterReducer,
  },
});

export default store;
