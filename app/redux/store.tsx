import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import cartReducer from "./slice/cartSlice";
import { Authslice } from "./slice/authSlice";
import amountsReducer from "./slice/amountSlice";
import counterReducer from "./slice/counterSlice";
import shippingReducer from "./slice/shippingSlice";
import customerAuthReducer from "./slice/customerAuthSlice";
import notificationReducer from "./slice/notificationSlice"

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: Authslice.reducer,
  cart: cartReducer,
  customerAuth: customerAuthReducer,
  shipping: shippingReducer,
  notification: notificationReducer,
  amounts: amountsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
