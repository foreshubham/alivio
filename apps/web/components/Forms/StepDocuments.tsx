"use client";

import React from "react";
import { useRegistration } from "@/contexts/RegistrationContext";
import { toast } from "sonner";

const documentFields: { name: keyof FormData; label: string }[] = [
  { name: "aadhaar", label: "Aadhaar *" },
  { name: "pan", label: "PAN *" },
  { name: "eduCert", label: "Educational Certificate *" },
  { name: "drivingLicense", label: "Driving License *" },
  { name: "rcBook", label: "RC Book *" },
  { name: "policeVerification", label: "Police Verification *" },
  { name: "photo", label: "Photo *" },
  { name: "cancelCheque", label: "Cancel Cheque *" },
];

export default function StepDocuments() {
  const { formData, updateForm, errors } = useRegistration();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormData
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      toast.warning("No file selected");
      return;
    }

    updateForm({ [field]: file } as any);
    toast.success(`${file.name} uploaded`);
  };

  const handleRemove = (field: keyof FormData) => {
    updateForm({ [field]: null } as any);
    toast.info("File removed");
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Upload Required Documents
      </h2>

      {documentFields.map((doc) => {
        const file = formData[doc.name];
        const isFile = file instanceof File;

        return (
          <div key={doc.name} className="flex flex-col">
            <label className="block font-medium mb-1 text-gray-700">
              {doc.label}
            </label>

            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileChange(e, doc.name)}
              className={`border rounded-lg p-3 bg-white cursor-pointer focus:outline-none focus:ring-2 ${
                errors[doc.name]
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              }`}
            />

            {isFile && (
              <div className="flex items-center justify-between mt-2 bg-gray-100 p-2 rounded-lg shadow-sm">
                <span className="truncate text-sm text-gray-700">
                  {(file as File).name}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemove(doc.name)}
                  className="text-red-600 font-bold text-lg px-2"
                  aria-label={`Remove ${doc.label}`}
                >
                  ×
                </button>
              </div>
            )}

            {errors[doc.name] && (
              <p className="text-red-600 text-sm mt-1">{errors[doc.name]}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
