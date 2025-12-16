"use client";

import React from "react";
import { useRegistration } from "@/contexts/RegistrationContext";

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
  const { formData, updateForm, errors } = useRegistration();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    updateForm({ [name]: value } as any);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Basic Information
      </h2>

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
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name}</p>
        )}
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
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}
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
        {errors.phone && (
          <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
        )}
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
        {errors.address && (
          <p className="text-red-600 text-sm mt-1">{errors.address}</p>
        )}
      </div>

      {/* District + Pincode grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* District */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            District *
          </label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className={`border rounded-lg w-full p-3 focus:outline-none focus:ring-2 ${
              errors.district
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="text-red-600 text-sm mt-1">{errors.district}</p>
          )}
        </div>

        {/* PIN */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            PIN Code *
          </label>
          <input
            name="pin"
            value={formData.pin}
            maxLength={6}
            onChange={handleChange}
            placeholder="6-digit PIN"
            className={`border rounded-lg w-full p-3 focus:outline-none focus:ring-2 ${
              errors.pin
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
          />
          {errors.pin && (
            <p className="text-red-600 text-sm mt-1">{errors.pin}</p>
          )}
        </div>
      </div>

      {/* DOB */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">
          Date of Birth *
        </label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          max={new Date().toISOString().split("T")[0]}
          onChange={handleChange}
          className={`border rounded-lg w-full p-3 focus:outline-none focus:ring-2 ${
            errors.dob
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
        />
        {errors.dob && (
          <p className="text-red-600 text-sm mt-1">{errors.dob}</p>
        )}
      </div>
    </div>
  );
}
