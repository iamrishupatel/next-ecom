import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import prodReducer from "../features/productsSlice";
import cartReducer from "../features/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: prodReducer,
    cart: cartReducer,
  },
});
