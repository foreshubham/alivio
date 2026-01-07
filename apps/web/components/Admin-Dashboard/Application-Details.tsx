"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { adminApi } from "@/services/adminApi";

export default function ApplicationDetails({
  applicationId,
  onBack,
  onStatusChange,
}: {
  applicationId: string;
  onBack: () => void;
  onStatusChange: () => void;
}) {
  const [partner, setPartner] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // UI States
  const [showConfirmApprove, setShowConfirmApprove] = useState(false);
  const [showZoneModal, setShowZoneModal] = useState(false);

  // Zone assignment
  const [zone, setZone] = useState("");
  const [zoneCode, setZoneCode] = useState("");
  const [batch, setBatch] = useState("");

  /* ============================
     FETCH PARTNER
  ============================ */
  const fetchPartner = async () => {
    const res = await adminApi.get(`/admin/partners/${applicationId}`);
    setPartner(res.data?.data);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await fetchPartner();
      } catch {
        toast.error("Failed to load application");
      } finally {
        setLoading(false);
      }
    })();
  }, [applicationId]);

  /* ============================
     ACTIONS
  ============================ */

  // Step 1: Approve → Confirmation
  const handleApproveClick = () => {
    setShowConfirmApprove(true);
  };

  // Step 2: Confirm → Zone Modal
  const handleConfirmApprove = () => {
    setShowConfirmApprove(false);
    setShowZoneModal(true);
  };

  // Step 3: Assign Zone & Approve
  const handleAssignZoneAndApprove = async () => {
    if (!zone || !zoneCode || !batch) {
      toast.error("Zone, Zone Code and Batch are required");
      return;
    }

    try {
      setActionLoading(true);

      await adminApi.patch(
        `/admin/partners/${applicationId}/approve`,
        { zone, zoneCode, batch }
      );

      toast.success("Application approved successfully");

      setShowZoneModal(false);
      await fetchPartner();
      onStatusChange();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Approval failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setActionLoading(true);

      await adminApi.patch(
        `/admin/partners/${applicationId}/reject`,
        { reason: "Rejected by admin" }
      );

      toast.success("Application rejected");

      await fetchPartner();
      onStatusChange();
    } catch {
      toast.error("Rejection failed");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <p className="text-sm text-gray-500">Loading…</p>;
  if (!partner) return <p>Application not found</p>;

  const isApproved = partner.status === "ACTIVE";
  const isRejected = partner.status === "REJECTED";

  /* ============================
     UI
  ============================ */
  return (
    <div className="flex flex-col gap-6">
      <button onClick={onBack} className="text-sm text-blue-600">
        ← Back to Applications
      </button>

      {/* STATUS BADGES */}
      <div className="flex gap-2">
        <StatusBadge status={partner.status} />

        {partner.payment?.paid === false && (
          <Badge label="Payment Pending" color="yellow" />
        )}

        {partner.training?.required && !partner.training.completed && (
          <Badge label="Training Required" color="blue" />
        )}
      </div>

      {/* DETAILS */}
      <Card title="Applicant Details">
        <Info label="Name" value={partner.fullName} />
        <Info label="Phone" value={partner.phone} />
        <Info label="Email" value={partner.email} />
        <Info label="District" value={partner.district} />
        <Info label="Technician Type" value={partner.technicianType} />
        <Info label="Experience" value={`${partner.experienceYears} years`} />
      </Card>

      <Card title="Bank Details">
        <Info label="Bank Name" value={partner.bankName} />
        <Info label="Account Number" value={partner.accountNumber} />
        <Info label="IFSC" value={partner.ifsc} />
      </Card>

      <Card title="Documents">
        {Object.entries(partner.documents || {}).map(([key, path]: any) => (
          <DocumentItem key={key} label={key} filePath={path} />
        ))}
      </Card>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4">
        <button
          onClick={handleApproveClick}
          disabled={isApproved || isRejected || actionLoading}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition
            ${
              isApproved
                ? "bg-green-100 text-green-700 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
        >
          {isApproved ? "Approved ✓" : "Approve"}
        </button>

        <button
          onClick={handleReject}
          disabled={isApproved || isRejected || actionLoading}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition
            ${
              isRejected
                ? "bg-red-100 text-red-700 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
        >
          {isRejected ? "Rejected ✕" : "Reject"}
        </button>
      </div>

      {/* CONFIRM APPROVE */}
      {showConfirmApprove && (
        <ConfirmModal
          title="Approve Application?"
          description="This will approve the application and move it to onboarding."
          onCancel={() => setShowConfirmApprove(false)}
          onConfirm={handleConfirmApprove}
        />
      )}

      {/* ZONE ASSIGN MODAL */}
      {showZoneModal && (
        <Modal onClose={() => setShowZoneModal(false)}>
          <h3 className="text-lg font-semibold mb-4">
            Assign Zone Details
          </h3>

          <div className="space-y-3">
            <Input label="Zone" value={zone} onChange={setZone} />
            <Input label="Zone Code" value={zoneCode} onChange={setZoneCode} />
            <Input label="Batch" value={batch} onChange={setBatch} />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setShowZoneModal(false)}
              className="px-4 py-2 text-sm border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleAssignZoneAndApprove}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Assign & Approve
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* =============================
   REUSABLE UI
============================= */

const Card = ({ title, children }: any) => (
  <div className="bg-white rounded-xl border border-gray-200/70 shadow-sm p-6">
    <p className="text-xs uppercase tracking-wide text-gray-400 mb-4">
      {title}
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const Info = ({ label, value }: any) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm text-gray-800 mt-1">{value || "-"}</p>
  </div>
);

const Input = ({ label, value, onChange }: any) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/30"
    />
  </div>
);

const DocumentItem = ({ label, filePath }: any) => (
  <div className="flex justify-between items-center">
    <span className="capitalize text-sm text-gray-700">{label}</span>
    <a
      href={`http://localhost:4000/${filePath}`}
      target="_blank"
      className="text-xs text-blue-600 hover:underline"
    >
      View
    </a>
  </div>
);

const Badge = ({ label, color }: any) => {
  const map: any = {
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
  };

  return (
    <span className={`px-3 py-1 text-xs rounded-full border ${map[color]}`}>
      {label}
    </span>
  );
};

const StatusBadge = ({ status }: any) => {
  const map: any = {
    ACTIVE: "bg-green-50 text-green-700 border-green-200",
    REJECTED: "bg-red-50 text-red-700 border-red-200",
    BLOCKED: "bg-red-50 text-red-700 border-red-200",
    PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
  };

  return (
    <span className={`px-3 py-1 text-xs rounded-full border ${map[status]}`}>
      {status}
    </span>
  );
};

const Modal = ({ children, onClose }: any) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
      {children}
    </div>
  </div>
);

const ConfirmModal = ({ title, description, onCancel, onConfirm }: any) => (
  <Modal onClose={onCancel}>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600 mb-6">{description}</p>

    <div className="flex justify-end gap-3">
      <button
        onClick={onCancel}
        className="px-4 py-2 text-sm border rounded-lg"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg"
      >
        Confirm
      </button>
    </div>
  </Modal>
);
