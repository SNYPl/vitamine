import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/paginationSlice";
import priceFilterReducer from "./slices/priceSlice";
import productButtons from "./slices/productButtonsSlice";
import cartReducer from "./slices/cartSlice";
import modalReducer from "./slices/modals";

const store = configureStore({
  reducer: {
    products: productsReducer,
    priceFilter: priceFilterReducer,
    productButtons: productButtons,
    cartReducer: cartReducer,
    modalReducer: modalReducer,
  },
});

export default store;
