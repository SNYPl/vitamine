import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: false,
  id: null,
};

const ProductButtons = createSlice({
  name: "productButtons",
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setProductId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setModal, setProductId } = ProductButtons.actions;
export default ProductButtons.reducer;
