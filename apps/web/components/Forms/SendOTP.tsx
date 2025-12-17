"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRegistration } from "@/contexts/RegistrationContext";
import { toast } from "sonner";

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
  const [loading, setLoading] = useState(false);
const otpInputRef = useRef<HTMLInputElement | null>(null);


  // Auto-focus OTP input when OTP is sent
  useEffect(() => {
    if (otpSent && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [otpSent]);

  const handleSend = async () => {
    setLoading(true);
    const toastId = toast.loading("Sending OTP...");
    try {
      await sendOtp();
      toast.success("OTP sent successfully", { id: toastId });
    } catch {
      toast.error("Failed to send OTP", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (localOtp.length !== 6) {
      toast.warning("Please enter a 6-digit OTP");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Verifying OTP...");
    try {
      const ok = await verifyOtp(localOtp);
      if (ok) {
        updateForm({ otp: localOtp });
        toast.success("OTP verified successfully", { id: toastId });
      } else {
        toast.error("Invalid OTP", { id: toastId });
      }
    } catch {
      toast.error("OTP verification failed", { id: toastId });
    } finally {
      setLoading(false);
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
          disabled={loading}
          className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-60 transition"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      ) : (
        <>
          {/* OTP Input */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Enter 6-Digit OTP
            </label>

            <input
              ref={otpInputRef}
              type="text"
              inputMode="numeric"
              value={localOtp}
              onChange={(e) =>
                setLocalOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
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

          {/* Verify Button or Success */}
          {!otpVerified ? (
            <button
              onClick={handleVerify}
              disabled={loading}
              className="px-5 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 disabled:opacity-60 transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
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
