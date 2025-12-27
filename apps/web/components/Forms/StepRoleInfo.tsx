"use client";

import React, { useState } from "react";
import { useRegistration } from "@/contexts/RegistrationContext";
import { api } from "@/services/api";
import { toast } from "sonner";

const technicianTypes = ["Electrician", "Plumber", "Carpenter", "Painter"];
const educationQualifications = ["8th", "10th", "12th", "Graduate", "ITI"];

export default function StepRoleInfo({ onNext }: { onNext: () => void }) {
  const { formData, updateForm, errors } = useRegistration();
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateForm({ [name]: value } as any);
  };

  const handleSubmit = async () => {
    // ✅ Validate form
    if (
      !formData.technicianType ||
      !formData.educationQualification ||
      formData.experienceYears === "" ||
      formData.experienceYears === undefined
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    // ✅ Validate auth token
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required. Please verify OTP again.");
      return;
    }

    try {
      setLoading(true);

      await api.post(
        "/partners/role-info",
        {
          technicianType: formData.technicianType,
          educationQualification: formData.educationQualification,
          experienceYears: Number(formData.experienceYears),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Role information saved successfully");
      onNext();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to submit role information"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Technician Role Details
      </h2>

      {/* Technician Type */}
      <div>
        <label className="block font-medium mb-1">Technician Type *</label>
        <select
          name="technicianType"
          value={formData.technicianType || ""}
          onChange={handleChange}
          className="border rounded-lg w-full p-3"
        >
          <option value="">Select Technician Type</option>
          {technicianTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.technicianType && (
          <p className="text-red-600 text-sm">{errors.technicianType}</p>
        )}
      </div>

      {/* Qualification */}
      <div>
        <label className="block font-medium mb-1">
          Educational Qualification *
        </label>
        <select
          name="educationQualification"
          value={formData.educationQualification || ""}
          onChange={handleChange}
          className="border rounded-lg w-full p-3"
        >
          <option value="">Select Qualification</option>
          {educationQualifications.map((edu) => (
            <option key={edu} value={edu}>
              {edu}
            </option>
          ))}
        </select>
        {errors.educationQualification && (
          <p className="text-red-600 text-sm">
            {errors.educationQualification}
          </p>
        )}
      </div>

      {/* Experience */}
      <div>
        <label className="block font-medium mb-1">
          Years of Experience *
        </label>
        <input
          type="number"
          min={0}
          max={50}
          name="experienceYears"
          value={formData.experienceYears || ""}
          onChange={handleChange}
          placeholder="Enter years of experience"
          className="border rounded-lg w-full p-3"
        />
        {errors.experienceYears && (
          <p className="text-red-600 text-sm">{errors.experienceYears}</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </div>
  );
}
