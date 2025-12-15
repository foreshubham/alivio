import React from "react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
      <div className="text-3xl text-blue-600">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-lg text-gray-700">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
