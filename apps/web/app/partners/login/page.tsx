"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";

export default function PartnerLoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    try {
      setLoading(true);

      if (mode === "phone") {
        if (phone.length !== 10) {
          alert("Enter valid 10 digit mobile number");
          return;
        }

        await api.post("/auth/login/otp", { phone });
        localStorage.setItem("login_phone", phone);
      } else {
        if (!email.includes("@")) {
          alert("Enter valid email address");
          return;
        }

        await api.post("/auth/login/otp", { email });
        localStorage.setItem("login_email", email);
      }

      router.push("/partner-login/verify");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Partner Login
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Login to manage your partner account
        </p>

        {/* Tabs */}
        <div className="flex mt-6 border rounded-lg overflow-hidden">
          <button
            onClick={() => setMode("phone")}
            className={`flex-1 py-2 text-sm font-medium ${
              mode === "phone"
                ? "bg-black text-white"
                : "bg-white text-gray-600"
            }`}
          >
            Mobile
          </button>
          <button
            onClick={() => setMode("email")}
            className={`flex-1 py-2 text-sm font-medium ${
              mode === "email"
                ? "bg-black text-white"
                : "bg-white text-gray-600"
            }`}
          >
            Email
          </button>
        </div>

        {/* Input */}
        <div className="mt-6 space-y-4">
          {mode === "phone" ? (
            <input
              type="tel"
              placeholder="Enter mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          ) : (
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          )}
        </div>

        {/* Action */}
        <button
          onClick={sendOtp}
          disabled={loading}
          className="mt-6 w-full bg-black text-white py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Sending OTP..." : "Continue"}
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-6 text-center">
          By continuing, you agree to Alivio’s Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
