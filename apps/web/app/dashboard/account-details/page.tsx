"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import {
  UserCircle,
  ShieldCheck,
  Briefcase,
  Landmark,
  Files,
  Pencil,
} from "lucide-react";

type Partner = any;

/* =============================
   Reusable Components
============================= */

const Row = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex justify-between py-2 text-sm">
    <span className="text-slate-500">{label}</span>
    <span className="font-medium text-slate-800">
      {value || "—"}
    </span>
  </div>
);

const DocRow = ({ label, url }: { label: string; url?: string }) => (
  <div className="flex justify-between py-2 text-sm">
    <span className="text-slate-500">{label}</span>
    {url ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline font-medium"
      >
        View
      </a>
    ) : (
      <span className="text-slate-400">Not uploaded</span>
    )}
  </div>
);

const Card = ({
  title,
  icon: Icon,
  onEdit,
  children,
}: {
  title: string;
  icon: any;
  onEdit?: () => void;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-xl border border-slate-200/70 p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-slate-500" />
        <h3 className="text-sm font-semibold text-slate-700">
          {title}
        </h3>
      </div>

      {onEdit && (
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 transition"
        >
          <Pencil size={14} />
          Edit
        </button>
      )}
    </div>

    <div className="divide-y divide-slate-100">
      {children}
    </div>
  </div>
);

/* =============================
   Page
============================= */

export default function PartnerDetailsPage() {
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const res = await api.get("/partners/me");
        setPartner(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartner();
  }, []);

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-slate-500">
        Loading partner record…
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-red-500">
        Failed to load partner record
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-zinc-100 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ================= TOP SUMMARY ================= */}
        <div className="bg-white rounded-xl border border-slate-200/70 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <UserCircle size={40} className="text-slate-600" />
              <div>
                <h1 className="text-xl font-semibold text-slate-900">
                  {partner.fullName}
                </h1>
                <p className="text-sm text-slate-500">
                  Partner Account
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                {partner.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-sm">
            <Meta label="PRO ID" value={partner.proId} />
            <Meta label="Employee ID" value={partner.employeeId} />
            <Meta label="Application ID" value={partner.applicationId} />
          </div>
        </div>

        {/* ================= CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="Personal Information"
            icon={UserCircle}
            onEdit={() => console.log("Edit personal")}
          >
            <Row label="Phone" value={partner.phone} />
            <Row label="Email" value={partner.email} />
            <Row label="Date of Birth" value={partner.dob} />
            <Row label="Address" value={partner.address} />
            <Row label="District" value={partner.district} />
            <Row label="PIN Code" value={partner.pinCode} />
          </Card>

          <Card
            title="Professional Details"
            icon={Briefcase}
            onEdit={() => console.log("Edit professional")}
          >
            <Row label="Technician Type" value={partner.technicianType} />
            <Row label="Qualification" value={partner.qualification} />
            <Row
              label="Experience"
              value={
                partner.experienceYears
                  ? `${partner.experienceYears} years`
                  : undefined
              }
            />
          </Card>

          <Card
            title="Bank Information"
            icon={Landmark}
            onEdit={() => console.log("Edit bank")}
          >
            <Row label="Bank Name" value={partner.bankName} />
            <Row label="IFSC Code" value={partner.ifsc} />
            <Row
              label="Account Number"
              value={
                partner.accountNumber
                  ? `XXXX${partner.accountNumber.slice(-4)}`
                  : undefined
              }
            />
          </Card>

          <Card
            title="Documents"
            icon={Files}
            onEdit={() => console.log("Edit documents")}
          >
            <DocRow label="Aadhaar" url={partner.documents?.aadhaar} />
            <DocRow label="PAN" url={partner.documents?.pan} />
            <DocRow label="Photo" url={partner.documents?.photo} />
            <DocRow label="Education Certificate" url={partner.documents?.eduCert} />
            <DocRow label="Driving License" url={partner.documents?.drivingLicense} />
            <DocRow label="RC Book" url={partner.documents?.rcBook} />
            <DocRow label="Police Verification" url={partner.documents?.policeVerification} />
            <DocRow label="Cancelled Cheque" url={partner.documents?.cancelledCheque} />
          </Card>
        </div>
      </div>
    </div>
  );
}

/* =============================
   Small Helpers
============================= */

const Meta = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-xs text-slate-500">{label}</p>
    <p className="text-sm font-medium text-slate-800">
      {value || "—"}
    </p>
  </div>
);
