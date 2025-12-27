"use client";

import React, { useState } from "react";
import { useRegistration } from "@/contexts/RegistrationContext";
import { api } from "@/services/api";

export default function StepTerms({ onNext }: { onNext: () => void }) {
  const { formData, updateForm } = useRegistration();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    updateForm({ [name]: type === "checkbox" ? checked : value } as any);
  };

  const handleSubmit = async () => {
    if (!formData.termsAccepted) {
      alert("Please accept the Terms & Conditions");
      return;
    }

    if (!formData.digitalSignature || formData.digitalSignature.length < 3) {
      alert("Please enter your full name as signature");
      return;
    }

    try {
      setLoading(true);

      await api.post("/partners/terms", {
        termsAccepted: true,
        signatureUrl: formData.digitalSignature,
      });

      onNext();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to submit terms");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Terms & Conditions
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Please review and confirm before proceeding to payment
        </p>
      </div>

      {/* Terms Card */}
      <div className="bg-white border rounded-xl shadow-sm p-6 space-y-4">
        <ul className="list-decimal ml-5 space-y-3 text-sm text-gray-700 leading-relaxed">
          <li>
            All information provided must be accurate and verifiable. Any false
            information may result in rejection.
          </li>
          <li>
            Uploaded documents must be valid, clear, and belong to the applicant.
          </li>
          <li>
            Registration and onboarding fees are <b>non-refundable</b>.
          </li>
          <li>
            Upon approval, zone allocation, working batch, and toolkit purchase
            may apply.
          </li>
          <li>
            The partner agrees to follow company service standards, safety rules,
            and operational guidelines.
          </li>
          <li>
            The company may contact the partner via phone, SMS, WhatsApp, or
            email for onboarding updates.
          </li>
        </ul>
      </div>

      {/* Acceptance */}
      <div className="bg-gray-50 border rounded-xl p-4">
        <label className="flex items-start gap-4 cursor-pointer">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={!!formData.termsAccepted}
            onChange={handleChange}
            className="mt-1 w-5 h-5 accent-green-600"
          />
          <span className="text-sm text-gray-800 leading-relaxed">
            I confirm that I have read, understood, and agree to the above
            <b> Terms & Conditions</b> and <b>Privacy Policy</b>.
          </span>
        </label>
      </div>

      {/* Signature */}
      <div className="bg-white border rounded-xl p-6 space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Digital Signature
        </label>
        <p className="text-xs text-gray-500">
          Type your full legal name as consent
        </p>
        <input
          type="text"
          name="digitalSignature"
          value={formData.digitalSignature || ""}
          onChange={handleChange}
          placeholder="e.g. Rahul Kumar"
          className="mt-2 w-full border rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-green-600 text-white font-medium
                     hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Accept & Proceed to Payment"}
        </button>
      </div>
    </div>
  );
}
