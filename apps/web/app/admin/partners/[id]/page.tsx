"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { usePartners } from "@/contexts/partnerContext";

export default function PartnerDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { partners, togglePartnerStatus } = usePartners();

  const partner = partners.find((p) => p.id === id);

  if (!partner) {
    return <p className="text-sm text-gray-500">Partner not found</p>;
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="text-sm text-blue-600 w-fit"
      >
        ← Back to Partners
      </button>

      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-400">
          Partner
        </p>
        <h1 className="text-sm font-medium text-gray-800 mt-1">
          {partner.name}
        </h1>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Basic Info">
          <Info label="Name" value={partner.name} />
          <Info label="Phone" value={partner.phone} />
          <Info label="Zone" value={partner.zone} />
          <Info label="Batch" value={partner.batch} />
        </Card>

        <Card title="Account Status">
          <Info label="Payment" value={partner.paymentStatus} />
          <Info label="Status" value={partner.status} />
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => togglePartnerStatus(partner.id)}
          className={`px-4 py-2 text-sm rounded-md ${
            partner.status === "ACTIVE"
              ? "bg-red-600 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          {partner.status === "ACTIVE" ? "Block Partner" : "Unblock Partner"}
        </button>
      </div>
    </div>
  );
}

/* =============================
   UI Helpers
============================= */

const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white border border-gray-200/50 rounded-xl p-6">
    <p className="text-xs uppercase tracking-wide text-gray-400 mb-4">
      {title}
    </p>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
);

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-sm text-gray-800 mt-1">{value}</p>
  </div>
);
