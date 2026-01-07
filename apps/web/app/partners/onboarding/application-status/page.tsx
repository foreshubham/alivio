"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

/* ============================
   TYPES
============================ */
type Status =
  | "DRAFT"
  | "ROLE_SUBMITTED"
  | "BANK_SUBMITTED"
  | "DOCS_SUBMITTED"
  | "PAYMENT_PENDING"
  | "SUBMITTED"
  | "TRAINING_REQUIRED"
  | "ACTIVE"
  | "REJECTED"
  | "BLOCKED";

interface PartnerData {
  applicationId?: string;
  status: Status;
  training?: {
    required?: boolean;
    paid?: boolean;
    amount?: number;
    completed?: boolean;
  };
  rejectionReason?: string;
}

export default function ApprovalPage() {
  const router = useRouter();
  const [data, setData] = useState<PartnerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("partner_token") ||
      localStorage.getItem("token");

    if (!token) {
      router.replace("/partners/login");
      return;
    }

    const fetchMe = async () => {
      try {
        setLoading(true);
        const res = await api.get("/partners/me");
        setData(res.data?.data || null);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [router]);

  if (loading) {
    return (
      <Center>
        <p className="text-sm text-gray-500 animate-pulse">
          Loading application status…
        </p>
      </Center>
    );
  }

  if (!data) {
    return (
      <Center>
        <p className="text-sm text-gray-500">
          Unable to load application status.
        </p>
      </Center>
    );
  }

  const { status, training, rejectionReason, applicationId } = data;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-center mb-1">
          Application Status
        </p>

        {applicationId && (
          <p className="text-sm text-gray-600 text-center mb-6">
            Application ID:{" "}
            <span className="font-medium text-gray-800">
              {applicationId}
            </span>
          </p>
        )}

        {/* UNDER REVIEW */}
        {[
          "SUBMITTED",
          "ROLE_SUBMITTED",
          "BANK_SUBMITTED",
          "DOCS_SUBMITTED",
        ].includes(status) && (
          <StatusCard
            icon={<Clock />}
            color="yellow"
            title="Under Review"
            message="Your application is under review. This typically takes 24–48 hours."
          />
        )}

        {/* PAYMENT PENDING */}
        {status === "PAYMENT_PENDING" && (
          <>
            <StatusCard
              icon={<Clock />}
              color="purple"
              title="Payment Pending"
              message="Please complete your onboarding payment to continue."
            />
            <ActionButton href="/partners/payment">
              Complete Payment
            </ActionButton>
          </>
        )}

        {/* TRAINING REQUIRED */}
        {status === "TRAINING_REQUIRED" && (
          <>
            <StatusCard
              icon={<Clock />}
              color="blue"
              title="Training Required"
              message={`Mandatory training fee: ₹${training?.amount?.toLocaleString()}`}
            />

            {/* TRAINING DETAILS */}
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-5 sm:p-6">
              <p className="text-sm font-semibold text-gray-900 mb-2">
                Partner Onboarding Training
              </p>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                To maintain service quality and compliance, all partners must
                complete a one-time onboarding training before account activation.
              </p>

              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Platform navigation & order workflow</li>
                <li>• Customer experience & service standards</li>
                <li>• Safety, compliance & operational policies</li>
                <li>• Payments, settlements & support process</li>
              </ul>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-800">Duration:</span>{" "}
                  60–90 mins
                </p>
                <p>
                  <span className="font-medium text-gray-800">Mode:</span>{" "}
                  Online
                </p>
                <p>
                  <span className="font-medium text-gray-800">Access:</span>{" "}
                  Self-paced
                </p>
              </div>
            </div>

            {!training?.paid && (
              <ActionButton href="/partners/training/payment">
                Pay Training Fee
              </ActionButton>
            )}

            {training?.paid && !training?.completed && (
              <p className="mt-6 text-sm text-gray-600 text-center">
                Payment received. Please complete the training modules to activate
                your account.
              </p>
            )}
          </>
        )}

        {/* ACTIVE */}
        {status === "ACTIVE" && (
          <>
            <StatusCard
              icon={<CheckCircle />}
              color="green"
              title="Approved"
              message="Your application has been approved. Welcome to Alivio."
            />
            <ActionButton href="/dashboard">
              Go to Dashboard
            </ActionButton>
          </>
        )}

        {/* REJECTED */}
        {status === "REJECTED" && (
          <StatusCard
            icon={<XCircle />}
            color="red"
            title="Rejected"
            message={
              rejectionReason ||
              "Your application was rejected. Please contact support."
            }
          />
        )}

        {/* BLOCKED */}
        {status === "BLOCKED" && (
          <StatusCard
            icon={<XCircle />}
            color="red"
            title="Account Blocked"
            message="Your account has been blocked due to policy violations."
          />
        )}
      </div>
    </div>
  );
}

/* ============================
   UI COMPONENTS
============================ */

const Center = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    {children}
  </div>
);

const ActionButton = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="mt-8 w-full sm:w-auto inline-flex justify-center px-7 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow"
  >
    {children}
  </a>
);

const StatusCard = ({
  icon,
  color,
  title,
  message,
}: {
  icon: React.ReactNode;
  color: "green" | "yellow" | "red" | "blue" | "purple";
  title: string;
  message: string;
}) => {
  const colorMap = {
    green: "bg-green-50 border-green-200 text-green-700",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
    red: "bg-red-50 border-red-200 text-red-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
  };

  return (
    <div className={`border rounded-xl p-6 ${colorMap[color]}`}>
      <div className="flex justify-center mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm">
          {icon}
        </div>
      </div>
      <p className="text-lg font-semibold mb-2 text-center">{title}</p>
      <p className="text-sm text-center leading-relaxed">{message}</p>
    </div>
  );
};
