"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import theme from "@/theme/theme";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useCart } from "@/contexts/cartContext";

export default function PartnerNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userHover, setUserHover] = useState(false);
  const { cart } = useCart();
  const router = useRouter();

  return (
    <header className="shadow-sm w-full bg-white">
      {/* MOBILE NAVBAR */}
      <div
        style={{ backgroundColor: theme.mainBgColor }}
        className="md:hidden flex justify-between items-center px-6 py-4 max-w-7xl mx-auto text-white"
      >
        <button
          onClick={() => setDrawerOpen(true)}
          className="text-3xl"
          aria-label="Open menu"
        >
          <FiMenu />
        </button>

        <Link href="/">
          <img src="/logo.jpg" alt="Logo" className="w-28" />
        </Link>

        <div
          className="relative cursor-pointer"
          aria-label="Cart"
          onClick={() => router.push("/partners/cart")}
        >
          <FiShoppingCart size={24} />
          {cart.length > 0 && (
            <span
              className="absolute -top-1 -right-2 text-white text-xs px-1.5 rounded-full"
              style={{ backgroundColor: "#000" }}
            >
              {cart.length}
            </span>
          )}
        </div>
      </div>

      {/* DESKTOP UPPER HEADER */}
      <div
        style={{ backgroundColor: theme.mainBgColor }}
        className="hidden md:flex justify-center items-center h-8 w-full text-white"
      >
        <div className="flex text-sm justify-between items-center gap-10 max-w-7xl w-full px-6">
          <p>+91 9051551925</p>
          <p>Partner Services at your doorstep</p>
          <div className="flex gap-3 items-center">
            <FaInstagram />
            <FaLinkedin />
            <FaFacebook />
          </div>
        </div>
      </div>

      {/* DESKTOP NAVBAR */}
      <div className="hidden md:flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <Link href="/">
          <img src="/logo.jpg" alt="Logo" className="w-28" />
        </Link>

        {/* Menu Links */}
        <div className="flex items-center space-x-6 font-medium text-black">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/partners">Become a Partner</Link>
          <Link href="/contact-us">Contact Us</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4 relative">
          <FiSearch size={20} className="cursor-pointer" />

          {/* User Icon */}
          <div
            className="relative"
            onMouseEnter={() => setUserHover(true)}
            onMouseLeave={() => setUserHover(false)}
          >
            <FiUser size={24} className="cursor-pointer" />
            <AnimatePresence>
              {userHover && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md overflow-hidden z-50"
                >
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Register
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart Icon */}
          <div
            className="relative cursor-pointer"
            onClick={() => router.push("/cart")}
          >
            <FiShoppingCart size={24} />
            {cart.length > 0 && (
              <span
                className="absolute -top-1 -right-2 text-white text-xs px-1.5 rounded-full"
                style={{ backgroundColor: theme.mainBgColor }}
              >
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER MENU */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />

            <motion.nav
              className="fixed left-0 top-0 h-full w-80 bg-white z-30 p-6 overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="flex justify-between items-center mb-6">
                <img src="/logo.jpg" alt="Logo" className="w-24" />
                <button
                  className="text-[#000000]"
                  onClick={() => setDrawerOpen(false)}
                >
                  <FiX size={24} />
                </button>
              </div>

              <nav className="flex flex-col space-y-4 font-medium text-[#000000]">
                <Link href="/" onClick={() => setDrawerOpen(false)}>
                  Home
                </Link>
                <Link href="/about" onClick={() => setDrawerOpen(false)}>
                  About Us
                </Link>
                <Link href="/partners" onClick={() => setDrawerOpen(false)}>
                  Become a Partner
                </Link>
                <Link href="/contact-us" onClick={() => setDrawerOpen(false)}>
                  Contact Us
                </Link>
                <Link href="/login" onClick={() => setDrawerOpen(false)}>
                  Login
                </Link>
                <Link href="/register" onClick={() => setDrawerOpen(false)}>
                  Register
                </Link>
              </nav>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
