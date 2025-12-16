"use client";

import React from "react";
import { useOnboarding } from "@/contexts/onboardingContext";

export default function ToolkitPage() {
  const { toolkits, markToolkitPaid, allToolkitsPaid } = useOnboarding();

  const simulatePayment = (id: string) => {
    const delivery = new Date(Date.now() + 4 * 86400000).toLocaleDateString();
    markToolkitPaid(id, delivery);
  };

  return (
    <div className="max-w-lg mx-auto py-10">
      <h1 className="text-xl font-semibold mb-4">Purchase Toolkits</h1>

      <div className="flex flex-col gap-4">
        {toolkits.map((t) => (
          <div key={t.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-medium">{t.name}</p>
              <p className="text-gray-600 text-sm">₹{t.price}</p>
              {t.paid && (
                <p className="text-green-600 text-sm">
                  ✔ Paid • Delivery: {t.deliveryDate}
                </p>
              )}
            </div>

            {!t.paid && (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => simulatePayment(t.id)}
              >
                Pay
              </button>
            )}
          </div>
        ))}

        {allToolkitsPaid && (
          <a
            href="/partners/onboarding/pro-id"
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded text-center"
          >
            Generate PRO ID →
          </a>
        )}
      </div>
    </div>
  );
}
