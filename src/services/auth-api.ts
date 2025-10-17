import { baseApi } from "@/lib/base-api";
import { AuthResponse, LoginRequest } from "@/types";
import { setToken } from "@/slices/auth-slice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken({ token: data.token, email: arg.email }));
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation } = authApi;
