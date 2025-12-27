import React from "react";
import DashboardMain from "./main";

const DashboardPage = () => {
  return (
    <div className="flex">
      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        <DashboardMain />
      </div>
    </div>
  );
};

export default DashboardPage;
