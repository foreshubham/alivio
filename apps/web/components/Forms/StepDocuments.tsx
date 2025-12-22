"use client";

import React from "react";
import { useRegistration } from "@/contexts/RegistrationContext";

const documentFields = [
  { name: "aadhaar", label: "Aadhaar Card" },
  { name: "pan", label: "PAN Card" },
  { name: "eduCert", label: "Educational Certificate" },
  { name: "drivingLicense", label: "Driving License" },
  { name: "rcBook", label: "RC Book" },
  { name: "policeVerification", label: "Police Verification" },
  { name: "photo", label: "Passport Size Photo" },
  { name: "cancelCheque", label: "Cancelled Cheque" },
] as const;

export default function StepDocuments() {
  const { formData, updateForm } = useRegistration();

  const handleFileChange = (
    name: typeof documentFields[number]["name"],
    file: File | null
  ) => {
    if (!file) return;

    const url = URL.createObjectURL(file);

    updateForm({
      documents: {
        ...formData.documents,
        [name]: url, // ✅ CORRECT LOCATION
      },
    });
  };

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
            <p className="text-xs text-green-600">File uploaded</p>
          )}
        </div>
      ))}
    </div>
  );
}
