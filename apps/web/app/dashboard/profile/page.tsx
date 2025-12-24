"use client";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    address: "Some Address, City, Country",
    district: "District A",
    pinCode: "123456",
    dob: "1990-01-01",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    toast.success("Profile updated successfully!");
    setIsEditing(false);

    console.log("Updated Profile Data:", profileData);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSave}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={profileData.email}
                disabled
                className="mt-1 p-2 w-full border rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                District
              </label>
              <input
                type="text"
                name="district"
                value={profileData.district}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pin Code
              </label>
              <input
                type="text"
                name="pinCode"
                value={profileData.pinCode}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={profileData.dob}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>

            <div className="flex gap-4 mt-4">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white p-3 rounded w-full"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="bg-green-600 text-white p-3 rounded w-full"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 text-white p-3 rounded w-full"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Sonner toaster */}
      <Toaster position="top-right" richColors />
    </>
  );
};

export default Profile;
