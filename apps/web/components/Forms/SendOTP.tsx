"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRegistration } from "@/contexts/RegistrationContext";
import { toast } from "sonner";
import { api } from "@/services/api";

export default function StepOTP() {
  const {
    formData,
    updateForm,
    otpSent,
    otpVerified,
    sendOtp,
    verifyOtp,
  } = useRegistration();

  const [localOtp, setLocalOtp] = useState(formData.otp || "");
  const [loading, setLoading] = useState(false);
  const otpInputRef = useRef<HTMLInputElement | null>(null);

  /* -----------------------------
     Auto focus OTP input
  ------------------------------*/
  useEffect(() => {
    if (otpSent && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [otpSent]);

  /* -----------------------------
     Send OTP
  ------------------------------*/
  const handleSend = async () => {
    setLoading(true);
    try {
      await sendOtp();
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

// Verify OTP

const handleVerify = async () =>{
  if (localOtp.length !== 6) {
    toast.error("Please enter a valid 6-digit OTP");
    return;
  }

  setLoading(true);

  try {
    // Make the API call to verify the OTP
    const response = await api.post("/auth/verify-otp", {
      phone: formData.phone,
      otp: localOtp,
    });

    if (response.data.success) {
      // OTP verified successfully
      toast.success("OTP veified successfully");
      updateForm({ otp: localOtp });
      localStorage.setItem("token", response.data.token);
    } else {
      // OTP verification failed
      toast.error("Invalid OTP. Please try again.");
    }
  } catch (error) {
    toast.error("Error verifying OTP. Please try again.");

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

      {/* Send OTP */}
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
              className="border rounded-lg w-full p-3 text-lg tracking-widest text-center focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300"
            />
          </div>

          {/* Verify */}
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
