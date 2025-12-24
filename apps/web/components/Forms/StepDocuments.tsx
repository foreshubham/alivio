"use client";

import React, { useState } from "react";
import { useRegistration } from "@/contexts/RegistrationContext";
import { api } from "@/services/api";

const documentFields = [
  { name: "aadhaar", label: "Aadhaar Card" },
  { name: "pan", label: "PAN Card" },
  { name: "eduCert", label: "Educational Certificate" },
  { name: "drivingLicense", label: "Driving License" },
  { name: "rcBook", label: "RC Book" },
  { name: "policeVerification", label: "Police Verification" },
  { name: "photo", label: "Passport Size Photo" },
  { name: "cancelledCheque", label: "Cancelled Cheque" },
] as const;

type DocumentKey = typeof documentFields[number]["name"];

export default function StepDocuments() {
  const { formData, updateForm } = useRegistration();
  const [loading, setLoading] = useState(false);

  /* =========================
     FILE CHANGE
  ========================= */
  const handleFileChange = (name: DocumentKey, file: File | null) => {
    if (!file) return;

    updateForm({
      documents: {
        ...formData.documents,
        [name]: file, // ✅ STORE FILE (NOT URL)
      },
    });
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async () => {
    if (
      !formData.documents ||
      documentFields.some((field) => !formData.documents?.[field.name])
    ) {
      alert("Please upload all required documents");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication required. Please verify OTP again.");
      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();

      documentFields.forEach((field) => {
        const file = formData.documents?.[field.name];
        if (file) {
          payload.append(field.name, file);
        }
      });

      await api.post("/partners/documents", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Documents uploaded successfully");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to upload documents");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="space-y-6">
      {documentFields.map((field) => (
        <div key={field.name} className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            {field.label}
          </label>

          <input
            type="file"
            onChange={(e) =>
              handleFileChange(field.name, e.target.files?.[0] ?? null)
            }
          />

          {formData.documents?.[field.name] && (
            <p className="text-xs text-green-600">✔ File selected</p>
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Submit Documents"}
      </button>
    </div>
  );
}
