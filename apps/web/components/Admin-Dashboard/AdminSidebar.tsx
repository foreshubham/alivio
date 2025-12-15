import React from "react";
import { useRouter } from "next/navigation";
import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="bg-blue-800 text-white w-64 h-screen p-5 flex flex-col">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
      </div>

      <nav className="flex flex-col space-y-4">
        <button
          onClick={() => navigate("/admin/applications")}
          className="flex items-center gap-2 text-lg hover:bg-blue-700 p-2 rounded-md"
        >
          <FiHome />
          Applications
        </button>
        <button
          onClick={() => navigate("/admin/users")}
          className="flex items-center gap-2 text-lg hover:bg-blue-700 p-2 rounded-md"
        >
          <FiUser />
          Users
        </button>
        <button
          onClick={() => navigate("/admin/settings")}
          className="flex items-center gap-2 text-lg hover:bg-blue-700 p-2 rounded-md"
        >
          <FiSettings />
          Settings
        </button>
        <button
          onClick={() => navigate("/logout")}
          className="flex items-center gap-2 text-lg hover:bg-blue-700 p-2 rounded-md mt-auto"
        >
          <FiLogOut />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
