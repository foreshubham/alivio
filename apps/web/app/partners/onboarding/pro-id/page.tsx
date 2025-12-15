"use client";

import React from "react";
import { useOnboarding } from "@/contexts/onboardingContext";

export default function ProIdPage() {
  const { generateProId, proId, allToolkitsPaid } = useOnboarding();

  if (!allToolkitsPaid) {
    return <p className="text-center py-10">Please complete toolkit purchase first.</p>;
  }

  return (
    <div className="max-w-lg mx-auto py-10 text-center">
      <h1 className="text-xl font-semibold mb-4">Generate PRO ID</h1>

      {!proId ? (
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded"
          onClick={generateProId}
        >
          Generate PRO ID
        </button>
      ) : (
        <>
          <p className="text-green-600 text-lg font-semibold">
            ✔ Your PRO ID: {proId}
          </p>

          <a
            href="/partners/dashboard"
            className="mt-6 inline-block px-6 py-2 bg-green-600 text-white rounded"
          >
            Go to Dashboard →
          </a>
        </>
      )}
    </div>
  );
}
