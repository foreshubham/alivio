"use client";

import React, { useEffect, useState } from "react";
import { useAdminApplications } from "@/contexts/adminContext";

type Status = "PENDING" | "APPROVED" | "REJECTED";

export default function ApprovalPage() {
  const { getApplicationById } = useAdminApplications();
  const [status, setStatus] = useState<Status | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  /* ---------------------------------
     Load Application ID
  ----------------------------------*/
  useEffect(() => {
    const id = localStorage.getItem("reg_app_id");
    setApplicationId(id);
  }, []);

  /* ---------------------------------
     Fetch Application Status
  ----------------------------------*/
  useEffect(() => {
    if (!applicationId) return;

    const app = getApplicationById(applicationId);
    if (app) setStatus(app.status);
  }, [applicationId, getApplicationById]);

  /* ---------------------------------
     UI STATES
  ----------------------------------*/
  if (!applicationId) {
    return (
      <Center>
        <p className="text-sm text-gray-500">
          Application ID not found.
        </p>
      </Center>
    );
  }

  if (!status) {
    return (
      <Center>
        <p className="text-sm text-gray-500">
          Fetching application status…
        </p>
      </Center>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-12 text-center">
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
        Application Status
      </p>

      <h1 className="text-lg font-medium text-gray-800 mb-6">
        {applicationId}
      </h1>

      {status === "PENDING" && (
        <StatusCard
          color="yellow"
          title="Under Review"
          message="Your application is currently being reviewed by our team. Please allow 24–48 hours."
        />
      )}

      {status === "APPROVED" && (
        <>
          <StatusCard
            color="green"
            title="Approved"
            message="Your application has been approved. You may proceed with onboarding."
          />

          <a
            href="/partners/onboarding/buy-toolkit"
            className="mt-6 inline-block px-6 py-2 bg-green-600 text-white rounded-md text-sm"
          >
            Continue
          </a>
        </>
      )}

      {status === "REJECTED" && (
        <StatusCard
          color="red"
          title="Rejected"
          message="Unfortunately, your application was rejected. Please contact support for more details."
        />
      )}
    </div>
  );
}

/* =============================
   Reusable Components
============================= */

const Center = ({ children }: { children: React.ReactNode }) => (
  <div className="h-[60vh] flex items-center justify-center">
    {children}
  </div>
);

const StatusCard = ({
  color,
  title,
  message,
}: {
  color: "green" | "yellow" | "red";
  title: string;
  message: string;
}) => {
  const colorMap = {
    green: "bg-green-50 text-green-700 border-green-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    red: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div
      className={`border rounded-lg p-6 ${colorMap[color]}`}
    >
      <p className="text-lg font-semibold mb-2">
        {title}
      </p>
      <p className="text-sm">{message}</p>
    </div>
  );
};
