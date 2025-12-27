import React from "react";

const TopNav = () => {
  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
      <div className="flex items-center gap-4">
        <span>Welcome, Vendor</span>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopNav;
