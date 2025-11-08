import { initialState } from "@/app/contants/userInitialState";
import { createSlice } from "@reduxjs/toolkit";

export const Authslice = createSlice({
  name: "AuthSlice",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = initialState.user;
    },
    auth: (state) => {
      state.user;
    },
  },
});

export const { login, logout, auth } = Authslice.actions;
export default Authslice.reducer;
