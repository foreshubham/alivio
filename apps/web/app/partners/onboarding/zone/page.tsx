"use client";

import React from "react";
import { useOnboarding } from "@/contexts/onboardingContext";

export default function ZoneAssign() {
  const { approved, zone, zoneCode, batch } = useOnboarding();

  if (!approved) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <p className="text-sm text-gray-500">
          Your application must be approved before zone assignment.
        </p>
      </div>
    );
  }

  if (!zone || !zoneCode || !batch) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Zone not assigned yet.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Please wait for admin to assign your zone.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          Onboarding Step
        </p>
        <h1 className="text-lg font-medium text-gray-800 mt-1">
          Zone Assigned
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Your operational zone has been assigned by admin.
        </p>
      </div>

      {/* Zone Details */}
      <div className="bg-white border border-gray-200/60 rounded-lg p-6 space-y-4">
        <ReadOnlyField label="Zone" value={zone} />
        <ReadOnlyField label="Zone Code" value={zoneCode} />
        <ReadOnlyField label="Batch" value={batch} />
      </div>

      {/* Next Step */}
      <div className="mt-8 text-center">
        <a
          href="/partners/onboarding/buy-toolkit"
          className="inline-block px-6 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition"
        >
          Proceed to Toolkit Purchase →
        </a>
      </div>
    </div>
  );
}

/* =============================
   Read Only Field
============================= */

const ReadOnlyField = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium text-gray-800 mt-1">
      {value}
    </p>
  </div>
);
