import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToBasket(state, action) {
      return (state = [...state, action.payload]);
    },
    removeFromBasket(state, action) {
      const { payload } = action;
      const newState = state.filter(prod => prod.id !== payload);
      return (state = [...newState]);
    },
    increaseItem(state, action) {
      const { payload } = action;
      console.log(payload)
      const newState = state.map(prod => {
        if (prod.id === payload)
          return {
            ...prod,
            quantity: prod.quantity + 1,
          };
        return prod;
      });
      return (state = [...newState]);
    },
    decreaseItem(state, action) {
      const { payload } = action;
      const newState = state.map(prod => {
        if (prod.id === payload)
          return {
            ...prod,
            quantity: prod.quantity - 1,
          };
        return prod;
      });
      return (state = [...newState]);
    },
  },
});

export const { addToBasket, removeFromBasket, increaseItem, decreaseItem } =
  cartSlice.actions;
export default cartSlice.reducer;

/*
state = 
 - id (id for item ith the product)
 - productdId (original product id) 
 - quantity
 -
*/
