"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { logout } from "@/slices/auth-slice";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };
  return (
    <header className="bg-white shadow-sm border-b border-primary-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary-dark">Products</h1>
          <p className="text-sm text-secondary">{email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-danger/10 text-danger hover:bg-danger/20 rounded-lg transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}
