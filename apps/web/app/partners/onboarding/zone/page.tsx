"use client";

import React, { useState } from "react";
import { useOnboarding } from "@/contexts/onboardingContext";

export default function ZoneAssign() {
  const { approved, setZone, setZoneCode, setBatch } = useOnboarding();

  const [selectedZone, setSelectedZoneLocal] = useState("");
  const [code, setCodeLocal] = useState("");
  const [batch, setBatchLocal] = useState("");

  if (!approved) {
    return <p className="text-center py-10">You are not approved yet.</p>;
  }

  const handleSubmit = () => {
    setZone(selectedZone);
    setZoneCode(code);
    setBatch(batch);
  };

  return (
    <div className="max-w-lg mx-auto py-10">
      <h1 className="text-xl font-semibold mb-6">Zone Assignment</h1>

      <div className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Zone"
          value={selectedZone}
          onChange={(e) => setSelectedZoneLocal(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Zone Code"
          value={code}
          onChange={(e) => setCodeLocal(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Batch"
          value={batch}
          onChange={(e) => setBatchLocal(e.target.value)}
        />

        <button
          className="px-6 py-2 bg-blue-600 text-white rounded"
          onClick={handleSubmit}
        >
          Save & Continue
        </button>

        <a
          href="/partners/onboarding/buy-toolkit"
          className="text-blue-600 underline mt-4"
        >
          Proceed to Toolkit Purchases →
        </a>
      </div>
    </div>
  );
}
