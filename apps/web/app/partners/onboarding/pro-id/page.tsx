"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProIdPage() {
  const [proId, setProId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProId = async () => {
      const res = await api.get("/partners/me");
      setProId(res.data.data.proId);
    };

    fetchProId();
  }, []);

  return (
    <div className="max-w-xl mx-auto py-20 text-center">
      <CheckCircle size={48} className="mx-auto text-green-600 mb-6" />

      <h1 className="text-2xl font-semibold text-gray-800">
        You’re All Set!
      </h1>

      <p className="text-gray-600 mt-3">
        Your PRO ID has been generated successfully.
      </p>

      <div className="mt-6 bg-gray-100 rounded-lg p-4">
        <p className="text-sm text-gray-500">Your PRO ID</p>
        <p className="text-xl font-bold text-gray-800 mt-1">
          {proId || "—"}
        </p>
      </div>

      <button
        onClick={() => router.push("/dashboard")}
        className="mt-10 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Go to Dashboard →
      </button>
    </div>
  );
}
