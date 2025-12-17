"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useAdminApplications } from "@/contexts/adminContext";
import { useOnboarding } from "@/contexts/onboardingContext";

export default function ApplicationDetails({
  applicationId,
  onBack,
}: {
  applicationId: string;
  onBack: () => void;
}) {
  const { getApplicationById, updateStatus } = useAdminApplications();
  const { adminAssignZone, zone, zoneCode, batch } = useOnboarding();

  const app = getApplicationById(applicationId);

  const [localZone, setLocalZone] = useState("");
  const [localZoneCode, setLocalZoneCode] = useState("");
  const [localBatch, setLocalBatch] = useState("");

  if (!app) {
    return <p className="text-sm text-gray-500">Application not found</p>;
  }

  const { formData, status, documents } = app;

  const isApproved = status === "APPROVED";
  const isRejected = status === "REJECTED";
  const isZoneAssigned = Boolean(zone && zoneCode && batch);

  /* -----------------------------
     ACTION HANDLERS
  ------------------------------*/

  const handleApprove = () => {
    updateStatus(app.applicationId, "APPROVED");
    toast.success("Application approved");
  };

  const handleReject = () => {
    updateStatus(app.applicationId, "REJECTED");
    toast.error("Application rejected");
  };

  const handleZoneAssign = () => {
    if (!localZone || !localZoneCode || !localBatch) {
      toast.error("Please fill all zone details");
      return;
    }

    adminAssignZone({
      approved: true,
      zone: localZone,
      zoneCode: localZoneCode,
      batch: localBatch,
    });

    toast.success("Zone assigned successfully");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Back */}
      <button onClick={onBack} className="text-sm text-blue-600 w-fit">
        ← Back to Applications
      </button>

      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500">
          Application
        </p>
        <h2 className="text-sm font-medium text-gray-700 mt-1">
          {app.applicationId}
        </h2>
      </div>

      {/* Applicant Info */}
      <Section title="Applicant Details">
        <Info label="Name" value={formData.name} />
        <Info label="Phone" value={formData.phone} />
        <Info label="Email" value={formData.email} />
        <Info label="District" value={formData.district} />
        <Info label="Technician Type" value={formData.technicianType} />
        <Info label="Experience" value={formData.experienceYears} />
      </Section>

      {/* Documents */}
      <Section title="Uploaded Documents">
        <DocumentItem label="Aadhaar" file={documents?.aadhaar} />
        <DocumentItem label="PAN" file={documents?.pan} />
        <DocumentItem label="Photo" file={documents?.photo} />
        <DocumentItem label="Education Certificate" file={documents?.eduCert} />
        <DocumentItem
          label="Driving License"
          file={documents?.drivingLicense}
        />
        <DocumentItem label="RC Book" file={documents?.rcBook} />
        <DocumentItem
          label="Police Verification"
          file={documents?.policeVerification}
        />
        <DocumentItem label="Cancelled Cheque" file={documents?.cancelCheque} />
      </Section>

      {/* Approval Actions */}
      <div className="flex gap-4">
        <button
          disabled={isApproved || isRejected}
          onClick={handleApprove}
          className={`px-4 py-2 text-sm rounded-md ${
            isApproved
              ? "bg-green-100 text-green-700 cursor-not-allowed"
              : isRejected
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {isApproved ? "Approved" : "Approve"}
        </button>

        <button
          disabled={isApproved || isRejected}
          onClick={handleReject}
          className={`px-4 py-2 text-sm rounded-md ${
            isRejected
              ? "bg-red-100 text-red-700 cursor-not-allowed"
              : isApproved
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          {isRejected ? "Rejected" : "Reject"}
        </button>
      </div>

      {/* Zone Assignment */}
      {isApproved && (
        <Section title="Zone Assignment">
          <Input label="Zone" value={localZone} onChange={setLocalZone} />
          <Input
            label="Zone Code"
            value={localZoneCode}
            onChange={setLocalZoneCode}
          />
          <Input label="Batch" value={localBatch} onChange={setLocalBatch} />

          <div className="md:col-span-2">
            <button
              disabled={isZoneAssigned}
              onClick={handleZoneAssign}
              className={`mt-2 px-4 py-2 text-sm rounded-md ${
                isZoneAssigned
                  ? "bg-green-100 text-green-700 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isZoneAssigned ? "Zone Assigned" : "Assign Zone"}
            </button>
          </div>
        </Section>
      )}
    </div>
  );
}

/* =============================
   REUSABLE UI
============================= */

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white border border-gray-200/60 rounded-lg p-6">
    <p className="text-xs uppercase tracking-wide text-gray-500 mb-4">
      {title}
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm text-gray-800 mt-1">{value || "-"}</p>
  </div>
);

const Input = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
    />
  </div>
);

/* =============================
   SAFE DOCUMENT ITEM
============================= */

const DocumentItem = ({ label, file }: { label: string; file: any }) => {
  const isValidFile = typeof window !== "undefined" && file instanceof File;

  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-sm text-gray-700">{label}</span>

      {isValidFile ? (
        <a
          href={URL.createObjectURL(file)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:underline"
          onClick={(e) => {
            const url = (e.currentTarget as HTMLAnchorElement).href;
            setTimeout(() => URL.revokeObjectURL(url), 1000);
          }}
        >
          View
        </a>
      ) : (
        <span className="text-xs text-gray-400">Not uploaded</span>
      )}
    </div>
  );
};
