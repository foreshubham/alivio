"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import DashboardLayout from "../layout";

// Make sure to import the styles for react-toastify
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    address: "Some Address, City, Country",
    district: "District A",
    pinCode: "123456",
    dob: "1990-01-01",
  });

  // Handle changes in the form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission and save profile data
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!"); // Display success toast
    setIsEditing(false); // Switch back to view mode
    // Here, you can make an API call to save the updated profile data
    console.log("Updated Profile Data:", profileData);
  };

  return (
  <>
  
      <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSave}>
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                disabled={!isEditing}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                disabled
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                disabled={!isEditing}
              />
            </div>

            {/* Address Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={profileData.address}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                disabled={!isEditing}
              />
            </div>

            {/* District Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="district">
                District
              </label>
              <input
                type="text"
                id="district"
                name="district"
                value={profileData.district}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                disabled={!isEditing}
              />
            </div>

            {/* Pin Code Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="pinCode">
                Pin Code
              </label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                value={profileData.pinCode}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                disabled={!isEditing}
              />
            </div>

            {/* Date of Birth Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="dob">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={profileData.dob}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                disabled={!isEditing}
              />
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-4">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 w-full"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="bg-green-600 text-white p-3 rounded-md hover:bg-green-700 w-full"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 text-white p-3 rounded-md hover:bg-gray-700 w-full"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Toast container for showing success message */}
      <ToastContainer />
  </>
  );
};

export default Profile;
