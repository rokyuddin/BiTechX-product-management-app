import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  email: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  email: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setToken: (
      state,
      action: PayloadAction<{ token: string; email: string }>
    ) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.error = null;
      state.isAuthenticated = true;

      // Save to cookies
      if (typeof window !== "undefined") {
        document.cookie = `auth_token=${
          action.payload.token
        }; path=/; max-age=${30 * 24 * 60 * 60}; secure=${
          process.env.NODE_ENV === "production"
        }; samesite=strict`;
        document.cookie = `auth_email=${
          action.payload.email
        }; path=/; max-age=${30 * 24 * 60 * 60}; secure=${
          process.env.NODE_ENV === "production"
        }; samesite=strict`;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.error = null;
      state.isAuthenticated = false;
      state.isLoading = false;

      // Clear cookies
      if (typeof window !== "undefined") {
        document.cookie = "auth_token=; path=/; max-age=0";
        document.cookie = "auth_email=; path=/; max-age=0";
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    initializeAuth: (state) => {
      // Check if token exists in cookies on app start
      if (typeof window !== "undefined") {
        const cookies = document.cookie.split(";").reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split("=");
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>);

        const token = cookies.auth_token;
        const email = cookies.auth_email;

        if (token && email) {
          state.token = token;
          state.email = email;
          state.isAuthenticated = true;
        }
      }
    },
  },
});

export const {
  setLoading,
  setToken,
  setError,
  logout,
  clearError,
  initializeAuth,
} = authSlice.actions;
export default authSlice.reducer;
