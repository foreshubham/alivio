import React from "react";
import { useRegistration } from "@/contexts/RegistrationContext";
import { CheckCircle } from "lucide-react";

export default function SuccessScreen({
  applicationId,
}: {
  applicationId: string;
}) {
  const { reset } = useRegistration();

  return (
    <div className="min-h-auto bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 text-center">
        {/* ICON */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="text-green-600 w-6 h-6" />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Application Submitted Successfully
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-3 text-sm sm:text-base text-gray-600">
          Thank you for completing your application. Our team will review your
          details and notify you once a decision has been made.
        </p>

        {/* APPLICATION ID */}
        <div className="mt-5 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Application ID
          </p>
          <p className="mt-1 text-sm font-semibold text-gray-900 break-all">
            {applicationId}
          </p>
        </div>

        {/* NEXT STEPS */}
        <p className="mt-5 text-sm text-gray-600">
          Review typically takes <span className="font-medium">24–48 hours</span>.
          You can track your status anytime from your dashboard.
        </p>

        {/* ACTION */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Start New Application
          </button>
        </div>
      </div>
    </div>
  );
}
