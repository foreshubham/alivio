"use client";

import React, { useState } from "react";
import { FiEye, FiSlash, FiCheckCircle } from "react-icons/fi";
import { usePartners } from "@/contexts/partnerContext";
import { useRouter } from "next/navigation";

export default function PartnersPage() {
  const { partners, togglePartnerStatus } = usePartners();
  const router = useRouter();

  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "BLOCKED">("ALL");

  const filteredPartners = partners.filter((p) =>
    statusFilter === "ALL" ? true : p.status === statusFilter
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Partners
          </p>
          <h1 className="text-sm font-medium text-gray-700 mt-1">
            Service Partners
          </h1>
        </div>

        {/* Filters */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="border border-gray-200 rounded-md px-3 py-2 text-sm"
        >
          <option value="ALL">All</option>
          <option value="ACTIVE">Active</option>
          <option value="BLOCKED">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200/50 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-5 py-3 text-left">Partner</th>
              <th className="px-5 py-3 text-left">Zone</th>
              <th className="px-5 py-3 text-left">Batch</th>
              <th className="px-5 py-3 text-left">Payment</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPartners.map((partner) => (
              <tr
                key={partner.id}
                className="border-t border-gray-200/40 hover:bg-gray-50/50"
              >
                <td className="px-5 py-4">
                  <p className="font-medium text-gray-800">
                    {partner.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {partner.phone}
                  </p>
                </td>

                <td className="px-5 py-4">{partner.zone}</td>
                <td className="px-5 py-4">{partner.batch}</td>

                <td className="px-5 py-4">
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    partner.paymentStatus === "PAID"
                      ? "bg-green-50 text-green-700"
                      : "bg-yellow-50 text-yellow-700"
                  }`}>
                    {partner.paymentStatus}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    partner.status === "ACTIVE"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}>
                    {partner.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => router.push(`/admin/partners/${partner.id}`)}
                      className="text-gray-500 hover:text-blue-600"
                      title="View Partner"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => togglePartnerStatus(partner.id)}
                      className="text-gray-500 hover:text-red-600"
                      title={partner.status === "ACTIVE" ? "Block" : "Unblock"}
                    >
                      {partner.status === "ACTIVE" ? <FiSlash /> : <FiCheckCircle />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPartners.length === 0 && (
          <p className="p-6 text-sm text-gray-500">
            No partners found.
          </p>
        )}
      </div>
    </div>
  );
}
