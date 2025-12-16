import React from "react";
import StatsCard from "@/components/Vender-Dashboard/StatsCard";  // Create StatsCard component to display stats
import { FiUsers, FiClipboard, FiCheckCircle } from "react-icons/fi";

const DashboardMain = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Orders"
          value={120}
          icon={<FiClipboard />}
        />
        <StatsCard
          title="Completed Tasks"
          value={89}
          icon={<FiCheckCircle />}
        />
        <StatsCard
          title="Pending Orders"
          value={31}
          icon={<FiUsers />}
        />
      </div>

      {/* Recent Activity Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600">No recent activities to show.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
