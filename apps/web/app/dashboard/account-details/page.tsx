"use client";

import React from "react";
import { useRegistration } from "@/contexts/RegistrationContext";

const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex justify-between py-2 border-b text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-900">
      {value || "-"}
    </span>
  </div>
);

const DocumentRow = ({
  label,
  file,
}: {
  label: string;
  file: File | null;
}) => (
  <div className="flex justify-between py-2 border-b text-sm">
    <span className="text-gray-600">{label}</span>

    {file ? (
      <a
        href={URL.createObjectURL(file)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        View
      </a>
    ) : (
      <span className="text-gray-400">Not uploaded</span>
    )}
  </div>
);

export default function AccountDetails() {
  const { formData, applicationId, paymentSuccess } = useRegistration();

  /* 🛡️ HARD GUARD (NO SSR CRASH) */
  if (!paymentSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">
          No completed application found.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold text-center">
        Partner Account Details
      </h1>

      <p className="text-center text-sm text-gray-500 mt-2">
        Application ID: {applicationId}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Personal */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="font-semibold mb-4">Personal Information</h2>
          <InfoRow label="Name" value={formData.name} />
          <InfoRow label="Phone" value={formData.phone} />
          <InfoRow label="Email" value={formData.email} />
          <InfoRow label="DOB" value={formData.dob} />
          <InfoRow label="Address" value={formData.address} />
          <InfoRow label="District" value={formData.district} />
          <InfoRow label="PIN" value={formData.pin} />
        </div>

        {/* Professional */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="font-semibold mb-4">Professional Details</h2>
          <InfoRow label="Technician Type" value={formData.technicianType} />
          <InfoRow
            label="Qualification"
            value={formData.educationQualification}
          />
          <InfoRow
            label="Experience (Years)"
            value={formData.experienceYears}
          />
        </div>

        {/* Bank */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="font-semibold mb-4">Bank Details</h2>
          <InfoRow label="Bank Name" value={formData.bankName} />
          <InfoRow label="IFSC" value={formData.ifsc} />
          <InfoRow
            label="Account Number"
            value={`XXXX${formData.accountNumber.slice(-4)}`}
          />
        </div>

        {/* Documents */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="font-semibold mb-4">Documents</h2>
          <DocumentRow label="Aadhaar" file={formData.aadhaar} />
          <DocumentRow label="PAN" file={formData.pan} />
          <DocumentRow label="Photo" file={formData.photo} />
          <DocumentRow label="Education Certificate" file={formData.eduCert} />
          <DocumentRow label="Driving License" file={formData.drivingLicense} />
          <DocumentRow label="RC Book" file={formData.rcBook} />
          <DocumentRow
            label="Police Verification"
            file={formData.policeVerification}
          />
          <DocumentRow
            label="Cancelled Cheque"
            file={formData.cancelCheque}
          />
        </div>
      </div>
    </div>
  );
}
