import React from "react";
import { useRegistration } from "@/contexts/RegistrationContext";

export default function StepTerms() {
  const { formData, updateForm, errors } = useRegistration();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    updateForm({ [name]: type === "checkbox" ? checked : value } as any);
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Terms & Conditions
      </h2>

      {/* Terms List */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <ul className="list-disc ml-6 text-gray-700 space-y-2 text-sm leading-relaxed">
          <li>
            All information provided must be accurate and verifiable. Any false
            information may result in rejection of the application.
          </li>
          <li>
            Uploaded documents must be valid, clear, and belong to the applicant.
            Misuse of documents is a punishable offense.
          </li>
          <li>
            Once the registration fee is paid, it is <b>non-refundable</b>.
          </li>
          <li>
            Upon approval, the applicant will be assigned a zone, batch, and required
            toolkit purchases where applicable.
          </li>
          <li>
            The applicant agrees to follow company policies, safety rules, and
            service quality standards.
          </li>
          <li>
            By submitting the form, the applicant authorizes the company to contact
            them via phone, SMS, or email regarding onboarding and updates.
          </li>
        </ul>
      </div>

      {/* Checkbox */}
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
          className="w-5 h-5 mt-1"
        />
        <span className="text-gray-800 text-sm leading-relaxed">
          I have read and agree to the above Terms & Conditions and Privacy Policy. *
        </span>
      </label>
      {errors.termsAccepted && (
        <p className="text-red-600 text-sm">{errors.termsAccepted}</p>
      )}

      {/* Digital Signature */}
      <div className="flex flex-col">
        <label className="block font-semibold mb-1 text-gray-700">
          Digital Signature *
        </label>
        <input
          type="text"
          name="digitalSignature"
          value={formData.digitalSignature}
          onChange={handleChange}
          placeholder="Type your full name as signature"
          className={`border rounded-lg w-full p-3 focus:outline-none focus:ring-2 ${
            errors.digitalSignature
              ? "border-red-600 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
        />
        {errors.digitalSignature && (
          <p className="text-red-600 text-sm mt-1">
            {errors.digitalSignature}
          </p>
        )}
      </div>
    </div>
  );
}
