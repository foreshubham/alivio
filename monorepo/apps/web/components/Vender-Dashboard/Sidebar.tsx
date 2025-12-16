"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiUser,
  FiDownload,
  FiMapPin,
  FiLogOut,
  FiClipboard,
} from "react-icons/fi";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", icon: <FiHome size={20} />, path: "/dashboard" },
    { label: "Orders", icon: <FiClipboard size={20} />, path: "/orders" },
    { label: "Downloads", icon: <FiDownload size={20} />, path: "/downloads" },
    { label: "Addresses", icon: <FiMapPin size={20} />, path: "/addresses" },
    { label: "Account details", icon: <FiUser size={20} />, path: "/account" },
  ];

  return (
    <div className="h-screen w-64 border-r border-gray-200 bg-white p-6 flex flex-col">
      <nav className="flex flex-col space-y-6">

        {menuItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              className="flex items-center gap-3 text-[15px] text-gray-700 hover:text-black transition"
            >
              <span className="text-gray-700">{item.icon}</span>
              <span className={`${isActive ? "font-semibold text-black" : ""}`}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Logout placed at bottom */}
        <button
          onClick={() => router.push("/logout")}
          className="flex items-center gap-3 text-[15px] text-gray-700 hover:text-black transition mt-auto"
        >
          <FiLogOut size={20} />
          <span>Log out</span>
        </button>

      </nav>
    </div>
  );
};

export default Sidebar;
