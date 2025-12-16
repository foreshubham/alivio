import React from "react";
import { useRegistration } from "@/contexts/RegistrationContext";

const banks = ["Bank of Baroda", "HDFC Bank", "SBI", "ICICI Bank", "Axis Bank"];

export default function StepBankDetails() {
  const { formData, updateForm, errors } = useRegistration();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateForm({ [name]: value } as any);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Section Title */}
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Bank Details
      </h2>

      {/* Bank Selector */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">Bank *</label>
        <select
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          className={`border rounded-lg w-full p-3 bg-white focus:outline-none focus:ring-2 ${
            errors.bankName
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
        >
          <option value="">Select Bank</option>
          {banks.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        {errors.bankName && (
          <p className="text-red-600 text-sm mt-1">{errors.bankName}</p>
        )}
      </div>

      {/* IFSC */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">IFSC *</label>
        <input
          name="ifsc"
          placeholder="e.g. SBIN0001234"
          value={formData.ifsc}
          onChange={handleChange}
          className={`border rounded-lg w-full p-3 focus:outline-none focus:ring-2 ${
            errors.ifsc
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
        />
        {errors.ifsc && (
          <p className="text-red-600 text-sm mt-1">{errors.ifsc}</p>
        )}
      </div>

      {/* Account Number */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">
          Account Number *
        </label>
        <input
          name="accountNumber"
          placeholder="Enter your account number"
          value={formData.accountNumber}
          onChange={handleChange}
          className={`border rounded-lg w-full p-3 focus:outline-none focus:ring-2 ${
            errors.accountNumber
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
        />
        {errors.accountNumber && (
          <p className="text-red-600 text-sm mt-1">
            {errors.accountNumber}
          </p>
        )}
      </div>

      {/* Re-enter Account Number */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">
          Re-enter Account Number *
        </label>
        <input
          name="reAccountNumber"
          placeholder="Re-enter account number"
          value={formData.reAccountNumber}
          onChange={handleChange}
          className={`border rounded-lg w-full p-3 focus:outline-none focus:ring-2 ${
            errors.reAccountNumber
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
        />
        {errors.reAccountNumber && (
          <p className="text-red-600 text-sm mt-1">
            {errors.reAccountNumber}
          </p>
        )}
      </div>
    </div>
  );
}
