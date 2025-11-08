import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AmountState {
    orderAmount: number;
    vipAmount: number;
    transactionAmount: number;
}

const initialState: AmountState = {
    orderAmount: 0,
    vipAmount: 0,
    transactionAmount: 0,
};

const amountSlice = createSlice({
    name: "amounts",
    initialState,
    reducers: {
        addOrderAmount: (state, action: PayloadAction<number>) => {
            state.orderAmount = action.payload;
        },
        removeOrderAmount: (state, action: PayloadAction<number>) => {
            state.orderAmount = Math.max(0, state.orderAmount - action.payload);
        },
        addTransactionAmount: (state, action: PayloadAction<number>) => {
            state.transactionAmount = action.payload;
        },
        removeTransactionAmount: (state, action: PayloadAction<number>) => {
            state.transactionAmount = Math.max(0, state.transactionAmount - action.payload);
        },
        clearAllAmounts: (state) => {
            state.orderAmount = 0;
            state.vipAmount = 0;
            state.transactionAmount = 0;
        },
    },
});

export const {
    addOrderAmount,
    removeOrderAmount,
    addTransactionAmount,
    removeTransactionAmount,
    clearAllAmounts,
} = amountSlice.actions;

export default amountSlice.reducer;