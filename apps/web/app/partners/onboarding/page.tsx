"use client";
import React from "react";
import Link from "next/link";

export default function PartnersOnboardingPage() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold">Partners Onboarding</h1>
      <p className="mt-4">Welcome — pick next step below.</p>

      <div className="mt-6 space-x-3">
        <Link href="/partners/onboarding/buy-toolkit" className="px-4 py-2 bg-blue-600 text-white rounded">Toolkits</Link>
        <Link href="/partners/onboarding/application-status" className="px-4 py-2 bg-gray-200 rounded">Approval</Link>
      </div>
    </div>
  );
}
