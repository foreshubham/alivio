"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiChevronDown,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import theme from "@/theme/theme";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function PartnerNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [otherOpen, setOtherOpen] = useState(false);
  const [desktopServiceOpen, setDesktopServiceOpen] = useState(false);
  const [desktopOtherOpen, setDesktopOtherOpen] = useState(false);
  const [userHover, setUserHover] = useState(false);

  return (
    <header className="shadow-sm w-full bg-white">
      {/* MOBILE NAVBAR */}
      <div className="md:hidden flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <button
          onClick={() => setDrawerOpen(true)}
          className="text-3xl"
          aria-label="Open menu"
        >
          <FiMenu />
        </button>

       <Link href="/"> <img src="/logo.jpg" alt="Logo" className="w-28" /></Link>

        <div className="relative cursor-pointer" aria-label="Cart">
          <FiShoppingCart size={24} />
          <span
            className="absolute -top-1 -right-2 text-white text-xs px-1.5 rounded-full"
            style={{ backgroundColor: theme.mainBgColor }}
          >
            1
          </span>
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
          <div className="flex gap-2 items-center">
            <FaInstagram />
            <FaLinkedin />
            <FaFacebook />
          </div>
        </div>
      </div>

      {/* DESKTOP NAVBAR */}
      <div className="hidden md:flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <img src="/logo.jpg" alt="Logo" className="w-28" />

        {/* Menu Links */}
        <div className="flex items-center space-x-6 font-medium text-black">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>

          {/* Desktop Our Service Dropdown */}
          {/* <div
            className="relative"
            onMouseEnter={() => setDesktopServiceOpen(true)}
            onMouseLeave={() => setDesktopServiceOpen(false)}
          >
            <button className="flex items-center gap-1">
              Our Services <FiChevronDown />
            </button>
            <AnimatePresence>
              {desktopServiceOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 top-full mt-2 bg-white shadow-md rounded-md overflow-hidden z-50"
                >
                  <Link
                    href="/service/cleaning"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Cleaning
                  </Link>
                  <Link
                    href="/service/plumbing"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Plumbing
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div> */}

          {/* Desktop Other Services Dropdown */}
          {/* <div
            className="relative"
            onMouseEnter={() => setDesktopOtherOpen(true)}
            onMouseLeave={() => setDesktopOtherOpen(false)}
          >
            <button className="flex items-center gap-1">
              Other Services <FiChevronDown />
            </button>
            <AnimatePresence>
              {desktopOtherOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 top-full mt-2 bg-white shadow-md rounded-md overflow-hidden z-50"
                >
                  <Link
                    href="/other/electrician"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Electrician
                  </Link>
                  <Link
                    href="/other/painting"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Painting
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div> */}

          <Link href="/partners">Partners</Link>
          <Link href="/contact-us">Contact Us</Link>
      
        </div>

        {/* Icons: Search, User, Cart */}
        <div className="flex items-center space-x-4 relative">
          <FiSearch size={20} className="cursor-pointer" />

          {/* User Icon with hover menu */}
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

          <div className="relative cursor-pointer">
            <FiShoppingCart size={24} />
            <span
              className="absolute -top-1 -right-2 text-white text-xs px-1.5 rounded-full"
              style={{ backgroundColor: theme.mainBgColor }}
            >
              1
            </span>
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
              aria-hidden="true"
            />

            <motion.nav
              className="fixed left-0 top-0 h-full w-80 bg-white z-30 p-6 overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              aria-label="Mobile menu"
            >
              {/* Mobile menu content remains the same */}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
