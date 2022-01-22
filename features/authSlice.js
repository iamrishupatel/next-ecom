import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    signin(state, action) {
      const { payload } = action;
      return (state = { ...payload });
    },
    signout: state => {
      return (state = null);
    },
  },
});

export const { signin, signout } = authSlice.actions;
export default authSlice.reducer;
