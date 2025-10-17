import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";

const API_BASE_URL = "https://api.bitechx.com";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      headers.set("Content-Type", "application/json;charset=UTF-8");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["Auth", "Products", "Categories"],
  keepUnusedDataFor: 300, // 5 minutes
});

// Export hooks for any endpoints that might be added to baseApi
export const { usePrefetch } = baseApi;
