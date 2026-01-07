"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type Partner = {
  status: string;
  zone?: string;
  zoneCode?: string;
  batch?: string;
  proId?: string;
};

export default function ZoneAssign() {
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const res = await api.get("/partners/me");
        setPartner(res.data.data);
      } catch (err) {
        console.error("Failed to fetch partner", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartner();
  }, []);

  if (loading) {
    return (
      <CenteredMessage text="Loading onboarding details…" />
    );
  }

  if (!partner) {
    return (
      <CenteredMessage text="Unable to load partner data." error />
    );
  }

  const isApproved = [
    "APPROVED",
    "TRAINING_REQUIRED",
    "ACTIVE"
  ].includes(partner.status);

  if (!isApproved) {
    return (
      <CenteredMessage text="Your application is under review. Please wait for approval." />
    );
  }

  if (!partner.zone || !partner.zoneCode || !partner.batch) {
    return (
      <CenteredMessage text="Zone not assigned yet. Please wait for admin assignment." />
    );
  }

  const canProceedToProId = partner.status === "ACTIVE";

  return (
    <div className="max-w-3xl mx-auto py-14 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-wider text-gray-500">
          Onboarding
        </p>
        <h1 className="text-2xl font-semibold text-gray-800 mt-2">
          Zone & Batch Assigned
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Your operational details are now configured.
        </p>
      </div>

      {/* Info Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 space-y-6">
        <InfoRow label="Zone" value={partner.zone} />
        <InfoRow label="Zone Code" value={partner.zoneCode} />
        <InfoRow label="Batch" value={partner.batch} />
      </div>

      {/* Status */}
      <div className="mt-8 flex items-center justify-center gap-2 text-green-600">
        <CheckCircle size={18} />
        <span className="text-sm font-medium">
          Zone assignment completed
        </span>
      </div>

      {/* Next Step */}
      <div className="mt-12 text-center">
        {canProceedToProId ? (
          <button
            onClick={() => router.push("/partners/onboarding/pro-id")}
            className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition"
          >
            Get Your PRO ID →
          </button>
        ) : (
          <p className="text-sm text-gray-500">
            Complete training & toolkit purchase to receive your PRO ID.
          </p>
        )}
      </div>
    </div>
  );
}

/* =============================
   Small Components
============================= */

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex justify-between items-center border-b pb-4 last:border-none">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-sm font-semibold text-gray-800">{value}</span>
  </div>
);

const CenteredMessage = ({
  text,
  error,
}: {
  text: string;
  error?: boolean;
}) => (
  <div className="h-[60vh] flex items-center justify-center">
    <p className={`text-sm ${error ? "text-red-500" : "text-gray-500"}`}>
      {text}
    </p>
  </div>
);
