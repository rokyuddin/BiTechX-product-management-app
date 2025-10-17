"use client";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { initializeAuth } from "@/slices/auth-slice";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    // Initialize auth state from cookies on app start
    store.dispatch(initializeAuth());
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <Provider store={store}>{children}</Provider>;
}
