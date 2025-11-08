import { initialCustomerState } from "@/app/contants/userInitialState";
import { createSlice } from "@reduxjs/toolkit";

export const CustomerAuthslice = createSlice({
  name: "CustomerAuthSlice",
  initialState: initialCustomerState,
  reducers: {
    signIn: (state, action) => {
      state.customer = action.payload;
    },
    signOut: (state) => {
      state.customer = initialCustomerState.customer;
    },
    customerAuth: (state) => {
      state.customer;
    },
  },
});

export const { signIn, signOut, customerAuth } = CustomerAuthslice.actions;
export default CustomerAuthslice.reducer;
