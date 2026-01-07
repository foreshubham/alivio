"use client";
import React from "react";
import Link from "next/link";

export default function PartnersOnboardingPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-gray-800">Partners Onboarding</h1>
      <p className="mt-3 text-gray-600 text-lg">
        Welcome! Please follow the steps below to complete your onboarding
        process and get started as a partner.
      </p>

      {/* Steps Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Application Status */}
        <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow transition">
          <h2 className="text-xl font-semibold text-gray-800">
            Step 1: Check Application Status
          </h2>
          <p className="mt-2 text-gray-600">
            After submitting your application, track its progress here. Make
            sure all required documents are uploaded and verified.
          </p>
          <Link
            href="/partners/onboarding/application-status"
            className="mt-4 inline-block px-5 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Check Status
          </Link>
        </div>
        {/* Toolkit Purchase */}
        <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow transition">
          <h2 className="text-xl font-semibold text-gray-800">
            Step 2: Buy Your Toolkit
          </h2>
          <p className="mt-2 text-gray-600">
            Purchase the necessary tools to start offering your services. The
            toolkit includes all essential items and manuals.
          </p>
          <Link
            href="/partners/onboarding/buy-toolkit"
            className="mt-4 inline-block px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Buy Toolkit
          </Link>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-10 p-6 bg-gray-50 border-l-4 border-blue-300 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800">
          Tips for Smooth Onboarding
        </h3>
        <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
          <li>
            Ensure all personal and business details are correct in your
            profile.
          </li>
          <li>Upload high-quality documents to avoid verification delays.</li>
          <li>
            Keep track of payment confirmations and receipts for your records.
          </li>
          <li>
            Reach out to our support team if you encounter any issues during
            onboarding.
          </li>
        </ul>
      </div>
    </div>
  );
}
