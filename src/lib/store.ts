import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/slices/auth-slice";
import { baseApi } from "./base-api";
import { productsReducer } from "@/slices/product-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
