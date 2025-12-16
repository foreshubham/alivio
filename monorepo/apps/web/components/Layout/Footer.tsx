"use client";

import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { motion, Variants, easeOut } from "framer-motion";
import theme from "@/theme/theme";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: easeOut,
    },
  }),
};

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      style={{ backgroundColor: theme.footerColor }}
      className="text-white pt-20 pb-10"
    >
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Company */}
        <motion.div custom={1} variants={fadeIn}>
          <h3 className="text-lg mb-3 relative after:absolute after:left-0 after:-bottom-1 after:w-10 after:h-0.5 after:bg-yellow-500">
            Company
          </h3>

          <ul className="mt-5 space-y-2 text-sm text-gray-300">
            {["About Us", "Terms & Conditions", "Privacy Policy"].map((item) => (
              <motion.li
                key={item}
                whileHover={{ color: "#fff" }}
                className="cursor-pointer"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* For Customers */}
        <motion.div custom={2} variants={fadeIn}>
          <h3 className="text-lg mb-3 relative after:absolute after:left-0 after:-bottom-1 after:w-10 after:h-0.5 after:bg-yellow-500">
            For Customers
          </h3>

          <ul className="mt-5 space-y-2 text-sm text-gray-300">
            {["About Us", "Gallery", "Contact Us"].map((item) => (
              <motion.li
                key={item}
                whileHover={{ color: "#fff" }}
                className="cursor-pointer"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* For Professional */}
        <motion.div custom={3} variants={fadeIn}>
          <h3 className="text-lg mb-3 relative after:absolute after:left-0 after:-bottom-1 after:w-10 after:h-0.5 after:bg-yellow-500">
            For Professional
          </h3>

          <ul className="mt-5 space-y-2 text-sm text-gray-300">
            <motion.li whileHover={{ color: "#fff" }} className="cursor-pointer">
              CEO VOICE
            </motion.li>
          </ul>
        </motion.div>

        {/* Social Links */}
        <motion.div custom={4} variants={fadeIn}>
          <h3 className="text-lg mb-3 relative after:absolute after:left-0 after:-bottom-1 after:w-10 after:h-0.5 after:bg-yellow-500">
            Social Links
          </h3>

          <div className="mt-5 flex items-center gap-4">
            {[
              { label: "Facebook", icon: <FaFacebookF size={20} /> },
              { label: "Instagram", icon: <FaInstagram size={20} /> },
              { label: "LinkedIn", icon: <FaLinkedinIn size={20} /> },
            ].map(({ label, icon }) => (
              <motion.button
                key={label}
                aria-label={label}
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-full cursor-pointer transition"
                type="button"
              >
                {icon}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* COPYRIGHT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="border-t border-gray-700 mt-16 pt-6 text-center text-gray-400 text-sm"
      >
        Copyright © 2025 Alivio Technology
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
