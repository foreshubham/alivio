import React from "react";

export default function RecentActivity() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
      <ul className="space-y-2">
        <li>Activity 1: User A joined.</li>
        <li>Activity 2: User B updated profile.</li>
        <li>Activity 3: New task added.</li>
      </ul>
    </div>
  );
}
