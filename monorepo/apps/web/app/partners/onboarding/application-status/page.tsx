"use client";

import React from "react";
import { useOnboarding } from "@/contexts/onboardingContext";

export default function ApprovalPage() {
  const { approved, setApproved } = useOnboarding();

  return (
    <div className="max-w-lg mx-auto text-center py-12">
      <h1 className="text-2xl font-semibold mb-4">Application Status</h1>

      {!approved ? (
        <>
          <p className="text-gray-700 mb-4">Your application is under review.</p>
          <p className="text-gray-500">Please wait 24–48 hours for approval.</p>

          {/* DEMO BUTTON */}
          <button
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded"
            onClick={() => setApproved(true)}
          >
            Mark as Approved (Demo)
          </button>
        </>
      ) : (
        <>
          <p className="text-green-600 font-semibold text-lg">✔ Approved</p>
          <p className="mt-2 text-gray-700">Proceed to zone assignment.</p>

          <a
            href="/partners/onboarding/zone"
            className="mt-6 inline-block px-6 py-2 bg-green-600 text-white rounded"
          >
            Continue
          </a>
        </>
      )}
    </div>
  );
}
