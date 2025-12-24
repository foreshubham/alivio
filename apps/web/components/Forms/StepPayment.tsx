"use client";

import React, { useState } from "react";
import { useRegistration } from "@/contexts/RegistrationContext";
import { toast } from "sonner";

export default function StepPayment() {
  const { completePayment } = useRegistration();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      /**
       * 🚧 PAYMENT GATEWAY TEMPORARILY DISABLED
       * ---------------------------------------
       * This is a bypass for development / MVP testing.
       * Payment integration will be added later.
       */

      // await api.post("/partners/payment/create", { amount: 200 });
      // Cashfree / Razorpay checkout here

      // ✅ Simulate small delay (optional)
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success("Payment completed (gateway bypassed)");

      // ✅ Continue onboarding flow
      await completePayment();
    } catch (err) {
      toast.error("An error occurred during payment.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Application Payment
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Complete your registration by paying the one-time fee
        </p>
      </div>

      {/* Payment Card */}
      <div className="bg-white border border-gray-200/70 rounded-2xl p-6 shadow-sm space-y-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          To finalize your application, a one-time registration fee is required.
          This payment helps us verify and process your onboarding.
        </p>

        <div className="flex items-center justify-between rounded-xl border border-gray-200/60 bg-gray-50 px-5 py-4">
          <div>
            <p className="text-sm font-medium text-gray-800">
              Registration Fee
            </p>
            <p className="text-xs text-gray-500">
              One-time • Non-refundable
            </p>
          </div>

          <p className="text-2xl font-semibold text-gray-900">₹200</p>
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Payment gateway temporarily disabled</p>
          <p>• This is a development/testing flow</p>
          <p>• No real payment is processed</p>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className={`w-full py-3.5 rounded-xl font-medium transition-all ${
          loading
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 text-white shadow-sm"
        }`}
      >
        {loading ? "Processing..." : "Continue (Payment Bypassed)"}
      </button>

      {/* Footer */}
      <p className="text-xs text-gray-400 text-center">
        This is a temporary flow. Payment will be enabled later.
      </p>
    </div>
  );
}
