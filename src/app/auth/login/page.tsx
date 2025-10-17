"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/services";
import { useAppSelector } from "@/lib/hook";

export default function LoginPage() {
  const [email, setEmail] = useState("rokyuddin.dev@gmail.com");
  const [error, setLocalError] = useState("");
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/products");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!email.trim()) {
      setLocalError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLocalError("Please enter a valid email");
      return;
    }

    try {
      await login({ email }).unwrap();
      router.push("/products");
    } catch (err: any) {
      setLocalError(err.data || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-dark mb-2">
            Product Manager
          </h1>
          <p className="text-secondary">Sign in to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-dark mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setLocalError("");
              }}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg">
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-secondary hover:bg-secondary/90 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
