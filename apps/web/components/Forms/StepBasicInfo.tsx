"use client";

import React, { useState } from "react";
import { useRegistration } from "@/contexts/RegistrationContext";
import { api } from "@/services/api";

const districts = [
  "Bankura",
  "N24 PGS",
  "Howraha",
  "Hugli",
  "Purba Bardhaman",
  "Paschim Bardhaman",
  "Purba Medinipur",
  "Jhargram",
  "Birbhum",
  "Kolkata",
  "Malda",
  "Murhidabad",
  "Uttar Dinajpur",
  "Dakhin Dinajpur",
  "Siliguri",
  "Alipurduar",
  "Coochbihar",
  "Jalpaiqui",
  "Nadia",
  "Purila",
];

export default function StepBasicInfo() {
  const { formData, updateForm, errors, nextStep } = useRegistration();
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    updateForm({ [name]: value } as any);
  };

  // ✅ NEW: SUBMIT HANDLER
  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    try {
      //  Register partner
      await api.post("/partners/register", {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        district: formData.district,
        pinCode: formData.pin,
        dob: formData.dob,
      });

      // 2 Send OTP
      await api.post("/auth/send-otp", {
        phone: formData.phone,
      });

      // 3 Move to OTP step
      nextStep();
    } catch (err: any) {
      alert(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Basic Information
      </h2>

      {/* --- YOUR UI (UNCHANGED) --- */}

      {/* Name */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">
          Full Name *
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={`border rounded-lg w-full p-3 focus:outline-none focus:ring-2 ${
            errors.name
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@example.com"
          className={`border rounded-lg w-full p-3 focus:outline-none focus:ring-2 ${
            errors.email
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">Phone *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          maxLength={10}
          onChange={handleChange}
          placeholder="10-digit mobile number"
          className={`border rounded-lg w-full p-3 focus:outline-none focus:ring-2 ${
            errors.phone
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
        />
      </div>

      {/* Address */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">
          Address *
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          placeholder="House number, street, colony..."
          className={`border rounded-lg w-full p-3 resize-none focus:outline-none focus:ring-2 ${
            errors.address
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
        />
      </div>

      {/* District + PIN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          className="border rounded-lg w-full p-3"
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <input
          name="pin"
          value={formData.pin}
          maxLength={6}
          onChange={handleChange}
          placeholder="6-digit PIN"
          className="border rounded-lg w-full p-3"
        />
      </div>

      {/* DOB */}
      <input
        type="date"
        name="dob"
        value={formData.dob}
        max={new Date().toISOString().split("T")[0]}
        onChange={handleChange}
        className="border rounded-lg w-full p-3"
      />

      {/* ✅ CONTINUE BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? "Sending OTP..." : "Continue"}
      </button>
    </div>
  );
}
