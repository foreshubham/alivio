"use client";

import { useState } from "react";
import { adminApi } from "@/services/adminApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { AxiosError } from "axios";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  role: "SUPER_ADMIN" | "OPS_ADMIN" | "VIEWER";
}

const AdminLogin = () => {
  const router = useRouter();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const { data } = await adminApi.post<LoginResponse>(
        "/admin/auth/login",
        form
      );

      if (!data?.token) {
        throw new Error("Invalid login response");
      }

      // ✅ IMPORTANT: must match adminApi interceptor
      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_role", data.role);

      toast.success("Login successful");

      // ✅ Redirect to admin dashboard
      router.push("/admin");
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;

      toast.error(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black text-white py-2 font-medium
                       hover:bg-gray-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
