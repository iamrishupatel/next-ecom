import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {
    addOneProduct(state, action) {
      const { payload } = action;
      return (state = [...state, payload]);
    },
    addMultipleProducts(state, action) {
      const { payload } = action;
      return (state = [...state, ...payload]);
    },
    addIntialProducts(state, action) {
      const { payload } = action;
      return (state = [...payload]);
    },
  },
});

export const { addOneProduct, addMultipleProducts, addIntialProducts } = productSlice.actions;
export default productSlice.reducer;
