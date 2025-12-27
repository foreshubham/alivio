"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

export type AdminRole = "SUPER_ADMIN" | "OPS_ADMIN" | "VIEWER";

interface AdminAuthContextType {
  role: AdminRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, role: AdminRole) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

export const AdminAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const [role, setRole] = useState<AdminRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 🔄 Restore auth on refresh
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const storedRole = localStorage.getItem(
      "admin_role"
    ) as AdminRole | null;

    if (token && storedRole) {
      setRole(storedRole);
      setIsAuthenticated(true);
    }

    // ✅ auth check complete
    setIsLoading(false);
  }, []);

  const login = (token: string, role: AdminRole) => {
    localStorage.setItem("admin_token", token);
    localStorage.setItem("admin_role", role);

    setRole(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_role");

    setRole(null);
    setIsAuthenticated(false);

    router.push("/admin/login");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        role,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error(
      "useAdminAuth must be used inside AdminAuthProvider"
    );
  }
  return context;
};
