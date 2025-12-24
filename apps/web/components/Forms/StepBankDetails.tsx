"use client";

import React, { useState } from "react";
import { useRegistration } from "@/contexts/RegistrationContext";
import { api } from "@/services/api";
import { toast } from "sonner";

const banks = ["Bank of Baroda", "HDFC Bank", "SBI", "ICICI Bank", "Axis Bank"];

export default function StepBankDetails({ onNext }: { onNext: () => void }) {
  const { formData, updateForm, errors } = useRegistration();
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateForm({ [name]: value } as any);
  };

  const handleSubmit = async () => {
    // ✅ Frontend validation
    if (
      !formData.bankName ||
      !formData.ifsc ||
      !formData.accountNumber ||
      !formData.reAccountNumber
    ) {
      toast.error("Please fill all required bank details");
      return;
    }

    if (formData.accountNumber !== formData.reAccountNumber) {
      toast.error("Account numbers do not match");
      return;
    }

    // ✅ Auth check
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required. Please verify OTP again.");
      return;
    }

    try {
      setLoading(true);

      await api.post(
        "/partners/bank",
        {
          bankName: formData.bankName,
          ifsc: formData.ifsc,
          accountNumber: formData.accountNumber,
          reAccountNumber: formData.reAccountNumber, // ✅ IMPORTANT
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Bank details submitted successfully");
      onNext();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to submit bank details"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Bank Details
      </h2>

      {/* Bank */}
      <div>
        <label className="block font-medium mb-1">Bank *</label>
        <select
          name="bankName"
          value={formData.bankName || ""}
          onChange={handleChange}
          className="border rounded-lg w-full p-3"
        >
          <option value="">Select Bank</option>
          {banks.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        {errors.bankName && (
          <p className="text-red-600 text-sm">{errors.bankName}</p>
        )}
      </div>

      {/* IFSC */}
      <div>
        <label className="block font-medium mb-1">IFSC *</label>
        <input
          name="ifsc"
          placeholder="e.g. SBIN0001234"
          value={formData.ifsc || ""}
          onChange={handleChange}
          className="border rounded-lg w-full p-3"
        />
        {errors.ifsc && (
          <p className="text-red-600 text-sm">{errors.ifsc}</p>
        )}
      </div>

      {/* Account Number */}
      <div>
        <label className="block font-medium mb-1">Account Number *</label>
        <input
          name="accountNumber"
          value={formData.accountNumber || ""}
          onChange={handleChange}
          className="border rounded-lg w-full p-3"
        />
        {errors.accountNumber && (
          <p className="text-red-600 text-sm">{errors.accountNumber}</p>
        )}
      </div>

      {/* Re-enter Account Number */}
      <div>
        <label className="block font-medium mb-1">
          Re-enter Account Number *
        </label>
        <input
          name="reAccountNumber"
          value={formData.reAccountNumber || ""}
          onChange={handleChange}
          className="border rounded-lg w-full p-3"
        />
        {errors.reAccountNumber && (
          <p className="text-red-600 text-sm">
            {errors.reAccountNumber}
          </p>
        )}
      </div>

      <button
      type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </div>
  );
}
