import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  priceFilter: [0, 500],
};

const priceSlice = createSlice({
  name: "priceFilter",
  initialState,
  reducers: {
    setPriceFilter: (state, action) => {
      state.priceFilter = action.payload;
    },
  },
});

export const { setPriceFilter } = priceSlice.actions;
export default priceSlice.reducer;
