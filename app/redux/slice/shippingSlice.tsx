"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddressState {
  addressId: string | null;
  shippingType: string | null;
}

const initialState: AddressState = {
  addressId: null,
  shippingType: null,
};

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    setAddressId: (state, action: PayloadAction<string>) => {
      state.addressId = action.payload;
    },
    clearAddressId: (state) => {
      state.addressId = null;
    },
    setShippingType: (state, action: PayloadAction<string>) => {
      state.shippingType = action.payload;
    },
    clearShippingType: (state) => {
      state.shippingType = null;
    },
  },
});

export const {
  setAddressId,
  clearAddressId,
  setShippingType,
  clearShippingType,
} = shippingSlice.actions;
export default shippingSlice.reducer;
