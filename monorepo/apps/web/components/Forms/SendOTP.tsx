"use client";

import React, { useState } from "react";
import { useRegistration } from "@/contexts/RegistrationContext";

export default function StepOTP() {
  const {
    formData,
    updateForm,
    errors,
    otpSent,
    otpVerified,
    sendOtp,
    verifyOtp,
  } = useRegistration();

  const [localOtp, setLocalOtp] = useState(formData.otp || "");

  const handleSend = async () => {
    await sendOtp();
  };

  const handleVerify = async () => {
    const ok = await verifyOtp(localOtp);
    if (ok) {
      updateForm({ otp: localOtp });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Verify Phone Number
      </h2>

      {/* Phone Info */}
      <p className="text-gray-700">
        OTP will be sent to:{" "}
        <strong className="text-gray-900">{formData.phone}</strong>
      </p>

      {/* Send OTP Button */}
      {!otpSent ? (
        <button
          onClick={handleSend}
          className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Send OTP
        </button>
      ) : (
        <>
          {/* OTP Input */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Enter 6-Digit OTP
            </label>

            <input
              type="text"
              inputMode="numeric"
              value={localOtp}
              onChange={(e) =>
                setLocalOtp(
                  e.target.value.replace(/\D/g, "").slice(0, 6)
                )
              }
              placeholder="123456"
              className={`border rounded-lg w-full p-3 text-lg tracking-widest text-center focus:outline-none focus:ring-2 ${
                errors.otp || errors.otpVerified
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              }`}
            />

            {/* Error Messages */}
            {errors.otp && (
              <p className="text-red-600 text-sm mt-1">{errors.otp}</p>
            )}
            {errors.otpVerified && (
              <p className="text-red-600 text-sm mt-1">
                {errors.otpVerified}
              </p>
            )}
          </div>

          {/* Verify Button or Success Message */}
          {!otpVerified ? (
            <button
              onClick={handleVerify}
              className="px-5 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Verify OTP
            </button>
          ) : (
            <p className="text-green-600 font-medium text-lg">
              ✔ OTP Verified Successfully
            </p>
          )}
        </>
      )}
    </div>
  );
}
