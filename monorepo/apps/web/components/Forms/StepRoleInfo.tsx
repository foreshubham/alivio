import React from "react";
import { useRegistration } from "@/contexts/RegistrationContext";

const technicianTypes = ["Electrician", "Plumber", "Carpenter", "Painter"];
const educationQualifications = [
  "8th",
  "10th",
  "12th",
  "Graduate",
  "ITI",
];

export default function StepRoleInfo() {
  const { formData, updateForm, errors } = useRegistration();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateForm({ [name]: value } as any);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Section Title */}
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Technician Role Details
      </h2>

      {/* Technician Type */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">
          Technician Type *
        </label>
        <select
          name="technicianType"
          value={formData.technicianType}
          onChange={handleChange}
          className={`border rounded-lg w-full p-3 bg-white focus:outline-none focus:ring-2 ${
            errors.technicianType
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
        >
          <option value="">Select Technician Type</option>
          {technicianTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.technicianType && (
          <p className="text-red-600 text-sm mt-1">{errors.technicianType}</p>
        )}
      </div>

      {/* Education */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">
          Educational Qualification *
        </label>
        <select
          name="educationQualification"
          value={formData.educationQualification}
          onChange={handleChange}
          className={`border rounded-lg w-full p-3 bg-white focus:outline-none focus:ring-2 ${
            errors.educationQualification
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
        >
          <option value="">Select Qualification</option>
          {educationQualifications.map((edu) => (
            <option key={edu} value={edu}>
              {edu}
            </option>
          ))}
        </select>
        {errors.educationQualification && (
          <p className="text-red-600 text-sm mt-1">
            {errors.educationQualification}
          </p>
        )}
      </div>

      {/* Experience */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">
          Years of Experience *
        </label>
        <input
          type="number"
          min={0}
          max={50}
          name="experienceYears"
          value={formData.experienceYears}
          placeholder="Enter years of experience"
          onChange={handleChange}
          className={`border rounded-lg w-full p-3 focus:outline-none focus:ring-2 ${
            errors.experienceYears
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
        />
        {errors.experienceYears && (
          <p className="text-red-600 text-sm mt-1">{errors.experienceYears}</p>
        )}
      </div>
    </div>
  );
}
