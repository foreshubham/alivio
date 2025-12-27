"use client";

import React from "react";
import StatsCard from "@/components/Vender-Dashboard/StatsCard";
import {
  FiFileText,
  FiUsers,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

const AdminDashboardMain = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Admin Overview
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor applications, partners, and system activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Applications"
          value={120}
          icon={<FiFileText />}
        />

        <StatsCard
          title="Pending Review"
          value={31}
          icon={<FiClock />}
        />

        <StatsCard
          title="Approved Partners"
          value={89}
          icon={<FiCheckCircle />}
        />

        <StatsCard
          title="Total Partners"
          value={56}
          icon={<FiUsers />}
        />
      </div>

      {/* Recent Activity */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Admin Activity
        </h2>

        <div className="bg-white/80 backdrop-blur border border-gray-200/60 rounded-lg p-6">
          <p className="text-sm text-gray-500">
            No recent admin activities to display.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardMain;
