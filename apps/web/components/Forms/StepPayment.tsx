import React, { useState } from "react";
import { useRegistration } from "@/contexts/RegistrationContext";

export default function StepPayment() {
  const { completePayment } = useRegistration();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    await completePayment();
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Application Payment
      </h2>

      {/* Payment Info Box */}
      <div className="bg-gray-50 p-5 rounded-lg border shadow-sm">
        <p className="text-gray-700 leading-relaxed">
          To complete your application, please make a one-time registration payment.
          This fee is <span className="font-semibold text-red-600">non-refundable</span>.
        </p>

        <div className="mt-4 flex items-center justify-between bg-white border rounded-lg p-4 shadow-sm">
          <div>
            <p className="text-gray-800 font-semibold text-lg">Registration Fee</p>
            <p className="text-sm text-gray-500">One-time payment</p>
          </div>

          <p className="text-2xl font-bold text-blue-600">₹200</p>
        </div>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white text-center font-medium transition-all ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 shadow-md"
        }`}
      >
        {loading ? "Processing Payment..." : "Pay ₹200"}
      </button>

      {/* Small footer note */}
      <p className="text-xs text-gray-500 text-center">
        By completing the payment, you agree to our processing terms.
      </p>
    </div>
  );
}
