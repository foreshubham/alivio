"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiFileText,
  FiUsers,
  FiCreditCard,
  FiSettings,
} from "react-icons/fi";

const menu = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: FiGrid,
  },
  {
    label: "Applications",
    href: "/admin/applications",
    icon: FiFileText,
  },
  {
    label: "Partners",
    href: "/admin/partners",
    icon: FiUsers,
  },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: FiCreditCard,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: FiSettings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white/80 backdrop-blur border-r border-gray-200/60 flex flex-col">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200/60">
        <span className="text-lg font-semibold text-gray-900">
          Alivio Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menu.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                ${
                  active
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-700 hover:bg-gray-100/70"
                }`}
            >
              <Icon
                size={18}
                className={active ? "text-blue-600" : "text-gray-500"}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200/60 text-xs text-gray-500">
        © {new Date().getFullYear()} Alivio
      </div>
    </aside>
  );
}
