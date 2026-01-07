"use client";

import React, { useEffect, useMemo, useState } from "react";
import ApplicationDetails from "@/components/Admin-Dashboard/Application-Details";
import { adminApi } from "@/services/adminApi";

/* ============================
   TYPES
============================ */
type StatusType = "PENDING" | "APPROVED" | "REJECTED" | "BLOCKED";
type FilterType = "ALL" | StatusType;

interface PartnerApplication {
  applicationId: string;
  status: StatusType;
  submittedAt: string;
  formData: {
    name: string;
  };
}

/* ============================
   STATUS NORMALIZER
============================ */
const mapPartnerStatus = (p: any): StatusType => {
  if (p.isBlocked) return "BLOCKED";
  if (p.status === "REJECTED") return "REJECTED";
  if (p.status === "ACTIVE") return "APPROVED";
  return "PENDING";
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("ALL");

  /* ============================
     FETCH APPLICATIONS
  ============================ */
  const fetchApplications = async () => {
    try {
      setLoading(true);

      const res = await adminApi.get("/admin/partners");
      const partners = res.data?.data ?? [];

      const mapped: PartnerApplication[] = partners.map((p: any) => ({
        applicationId: p._id,
        status: mapPartnerStatus(p),
        submittedAt: p.createdAt,
        formData: {
          name: p.fullName || "Unnamed Partner",
        },
      }));

      setApplications(mapped);
    } catch (error) {
      console.error("Failed to fetch partner applications", error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  /* ============================
     FILTER
  ============================ */
  const filteredApplications = useMemo(() => {
    if (filter === "ALL") return applications;
    return applications.filter((a) => a.status === filter);
  }, [applications, filter]);

  /* ============================
     DETAILS VIEW
  ============================ */
  if (selectedId) {
    return (
      <ApplicationDetails
        applicationId={selectedId}
        onBack={() => setSelectedId(null)}
        onStatusChange={() => {
          setSelectedId(null);
          fetchApplications();
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="p-10 text-sm text-gray-500">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-400">
            Admin
          </p>
          <h2 className="text-xl font-semibold text-gray-800">
            Partner Applications
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {(["ALL", "PENDING", "APPROVED", "REJECTED", "BLOCKED"] as FilterType[]).map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 text-xs rounded-full border transition-all
                  ${
                    filter === f
                      ? "bg-blue-50 text-blue-700 border-blue-200 shadow-sm"
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
      <div className="bg-white border border-gray-200/70 rounded-xl overflow-hidden shadow-sm">
        {filteredApplications.length === 0 && (
          <p className="p-8 text-sm text-gray-500 text-center">
            No applications found.
          </p>
        )}

        {filteredApplications.map((app) => (
          <button
            key={app.applicationId}
            onClick={() => setSelectedId(app.applicationId)}
            className="w-full text-left px-6 py-4 border-b last:border-b-0
                       hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-gray-800">
                  {app.formData.name}
                </p>
                <p className="text-xs text-gray-500">
                  {app.applicationId.slice(-6)} •{" "}
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

/* ============================
   STATUS BADGE
============================ */
const StatusBadge = ({ status }: { status: StatusType }) => {
  const map: Record<StatusType, string> = {
    PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
    APPROVED: "bg-green-50 text-green-700 border-green-200",
    REJECTED: "bg-red-50 text-red-700 border-red-200",
    BLOCKED: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full border font-medium ${map[status]}`}
    >
      {status}
    </span>
  );
};
