"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiUser,
  FiDownload,
  FiMapPin,
  FiLogOut,
  FiClipboard,
  FiChevronDown,
} from "react-icons/fi";
import { GiSpellBook } from "react-icons/gi";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isAccountRoute = pathname.startsWith("/dashboard/account");
  const [accountOpen, setAccountOpen] = useState(isAccountRoute);

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="h-screen w-64 border-r border-gray-100 bg-white px-4 py-6 flex flex-col">
      {/* ================= MAIN NAV ================= */}
      <nav className="flex flex-col gap-1">
        <NavItem
          label="Dashboard"
          icon={<FiHome size={18} />}
          active={isActive("/dashboard")}
          onClick={() => router.push("/dashboard")}
        />

        <NavItem
          label="Orders"
          icon={<FiClipboard size={18} />}
          active={isActive("/orders")}
          onClick={() => router.push("/dashboard/orders")}
        />

        <NavItem
          label="Training"
          icon={<GiSpellBook size={18} />}
          active={isActive("/dashboard/training")}
          onClick={() => router.push("/dashboard/training")}
        />

        <NavItem
          label="Downloads"
          icon={<FiDownload size={18} />}
          active={isActive("/downloads")}
          onClick={() => router.push("/dashboard/downloads")}
        />

        {/* <NavItem
          label="Addresses"
          icon={<FiMapPin size={18} />}
          active={isActive("/addresses")}
          onClick={() => router.push("/dashboard/addresses")}
        /> */}

        {/* ---------- Divider ---------- */}
        <div className="my-1" />

        {/* ================= ACCOUNT DROPDOWN ================= */}
        <button
          onClick={() => setAccountOpen(!accountOpen)}
          className={`flex items-center justify-between px-3 py-2 rounded-md text-[14px] transition-colors
            ${
              isAccountRoute
                ? "text-blue-600 bg-blue-50"
                : "text-gray-700 hover:bg-gray-50"
            }`}
        >
          <div className="flex items-center gap-3">
            <FiUser size={18} />
            <span className="font-medium">Account Details</span>
          </div>
          <FiChevronDown
            size={14}
            className={`transition-transform duration-200 ${
              accountOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            accountOpen ? "max-h-60 mt-1" : "max-h-0"
          }`}
        >
          <div className="ml-6 flex flex-col gap-1">
            <SubItem
              label="Profile"
              active={isActive("/dashboard/account-details")}
              onClick={() =>
                router.push("/dashboard/account-details")
              }
            />
            {/* <SubItem
              label="Bank Details"
              active={isActive("/dashboard/account/bank")}
              onClick={() =>
                router.push("/dashboard/account/bank")
              }
            />
            <SubItem
              label="Documents"
              active={isActive("/dashboard/account/documents")}
              onClick={() =>
                router.push("/dashboard/account/documents")
              }
            />
            <SubItem
              label="Addresses"
              active={isActive("/dashboard/account/addresses")}
              onClick={() =>
                router.push("/dashboard/account/addresses")
              }
            /> */}
          </div>
        </div>

        {/* ---------- Divider ---------- */}
        <div className="my-3 border-t border-gray-100" />

        {/* ================= LOGOUT ================= */}
        <NavItem
          label="Log out"
          icon={<FiLogOut size={18} />}
          active={false}
          danger
          onClick={() => router.push("/logout")}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;

/* =============================
   Reusable Components
============================= */

const NavItem = ({
  label,
  icon,
  active,
  onClick,
  danger,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  danger?: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2 rounded-md text-[14px] transition-colors
      ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : active
          ? "bg-blue-50 text-blue-600 font-medium"
          : "text-gray-700 hover:bg-gray-50"
      }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const SubItem = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-2 rounded-md text-[13px] transition-colors
      ${
        active
          ? "text-blue-600 bg-blue-50 font-medium"
          : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
      }`}
  >
    {label}
  </button>
);
