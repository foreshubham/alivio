"use client";

import React from "react";
import Sidebar from "@/components/Vender-Dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex justify-center">
      <div className="flex w-full max-w-7xl py-10 min-h-screen bg-white">
        
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 p-6 bg-gray-100">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="text-sm md:text-xl lg:text-xl">Welcome, User</div>
            </div>
          </header>

          <main>{children}</main>
        </div>

      </div>
    </div>
  );
}
