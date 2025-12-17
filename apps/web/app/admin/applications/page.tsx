"use client";

import React, { useMemo, useState } from "react";
import { useAdminApplications } from "@/contexts/adminContext";
import ApplicationDetails from "@/components/Admin-Dashboard/Application-Details";

type FilterType = "ALL" | "PENDING" | "APPROVED" | "REJECTED";

export default function ApplicationsPage() {
  const { applications } = useAdminApplications();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("ALL");

  const filteredApplications = useMemo(() => {
    if (filter === "ALL") return applications;
    return applications.filter((a) => a.status === filter);
  }, [applications, filter]);

  if (selectedId) {
    return (
      <ApplicationDetails
        applicationId={selectedId}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Applications
          </p>
          <h2 className="text-sm font-medium text-gray-700 mt-1">
            Submitted Partner Applications
          </h2>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {(["ALL", "PENDING", "APPROVED", "REJECTED"] as FilterType[]).map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 rounded-full border transition ${
                  filter === f
                    ? "bg-blue-50 text-blue-600 border-blue-200"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {f}
              </button>
            )
          )}
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white border border-gray-200/60 rounded-lg overflow-hidden">
        {filteredApplications.length === 0 && (
          <p className="p-6 text-sm text-gray-500">
            No applications found for this filter.
          </p>
        )}

        {filteredApplications.map((app) => (
          <button
            key={app.applicationId}
            onClick={() => setSelectedId(app.applicationId)}
            className="w-full text-left p-4 border-b last:border-b-0 hover:bg-gray-50 transition"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-gray-800">
                  {app.formData.name}
                </p>
                <p className="text-xs text-gray-500">
                  {app.applicationId} •{" "}
                  {new Date(app.submittedAt).toLocaleDateString()}
                </p>
              </div>

              <StatusBadge status={app.status} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* -----------------------------
   Status Badge
------------------------------*/
const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    PENDING: "bg-yellow-50 text-yellow-700",
    APPROVED: "bg-green-50 text-green-700",
    REJECTED: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`text-xs px-3 py-1 rounded-full ${
        map[status] ?? "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};
