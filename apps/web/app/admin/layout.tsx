"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { AdminAuthProvider } from "@/contexts/adminAuthContext";
import AdminProtected from "@/components/Admin-Dashboard/AdminAuthGuard/AdminGuard";
import AdminSidebar from "@/components/Admin-Dashboard/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 🔓 Public admin route
  const isLoginPage = pathname === "/admin/login";

  return (
    <AdminAuthProvider>
      {isLoginPage ? (
        // ✅ LOGIN PAGE (NO GUARD, NO SIDEBAR)
        <>{children}</>
      ) : (
        // 🔒 ALL OTHER ADMIN ROUTES
        <AdminProtected>
          <div className="w-full flex justify-center">
            <div className="flex w-full max-w-7xl py-10 min-h-screen bg-white">
              {/* Sidebar */}
              <AdminSidebar />

              {/* Main content */}
              <div className="flex-1 p-6 bg-gray-100">
                {children}
              </div>
            </div>
          </div>
        </AdminProtected>
      )}
    </AdminAuthProvider>
  );
}
