"use client";

import React from "react";

/* =============================
   FORM DATA TYPE (RENAMED)
============================= */

type DocumentFormData = {
  aadhaar: File | null;
  pan: File | null;
  eduCert: File | null;
  drivingLicense: File | null;
  rcBook: File | null;
  policeVerification: File | null;
  photo: File | null;
  cancelCheque: File | null;
};

/* =============================
   FIELD CONFIG
============================= */

const documentFields: {
  name: keyof DocumentFormData;
  label: string;
}[] = [
  { name: "aadhaar", label: "Aadhaar Card" },
  { name: "pan", label: "PAN Card" },
  { name: "eduCert", label: "Educational Certificate" },
  { name: "drivingLicense", label: "Driving License" },
  { name: "rcBook", label: "RC Book" },
  { name: "policeVerification", label: "Police Verification" },
  { name: "photo", label: "Passport Size Photo" },
  { name: "cancelCheque", label: "Cancelled Cheque" },
];

/* =============================
   COMPONENT
============================= */

export default function StepDocuments() {
  const [formData, setFormData] = React.useState<DocumentFormData>({
    aadhaar: null,
    pan: null,
    eduCert: null,
    drivingLicense: null,
    rcBook: null,
    policeVerification: null,
    photo: null,
    cancelCheque: null,
  });

  const handleFileChange = (
    name: keyof DocumentFormData,
    file: File | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  return (
    <div className="space-y-6">
      {documentFields.map((field) => (
        <div key={field.name} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>

          <input
            type="file"
            onChange={(e) =>
              handleFileChange(field.name, e.target.files?.[0] ?? null)
            }
            className="block w-full text-sm text-gray-600"
          />

          {formData[field.name] && (
            <p className="text-xs text-green-600">
              File selected: {formData[field.name]?.name}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
