import React from "react";
import { useRegistration } from "@/contexts/RegistrationContext";

const steps = [
  "Basic Info",
  "OTP",
  "Role Info",
  "Bank Details",
  "Documents",
  "Terms & Signature",
  "Payment",
];

export default function StepIndicator() {
  const { currentStep, goToStep } = useRegistration();

  return (
    <>
      {/* MOBILE VIEW */}
      <div className="flex sm:hidden overflow-x-auto gap-3 pb-2">
        {steps.map((s, i) => {
          const stepIndex = i + 1;
          const isActive = stepIndex === currentStep;

          return (
            <button
              key={s}
              onClick={() => goToStep(stepIndex)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm border transition
                ${
                  isActive
                    ? "bg-black text-white border-black"
                    : "bg-gray-100 text-gray-600 border-gray-300"
                }
              `}
            >
              {stepIndex}. {s}
            </button>
          );
        })}
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden sm:flex flex-col space-y-2">
        {steps.map((s, i) => {
          const stepIndex = i + 1;
          const isActive = stepIndex === currentStep;

          return (
            <button
              key={s}
              onClick={() => goToStep(stepIndex)}
              className={`text-left px-2 py-2 rounded transition
                ${
                  isActive
                    ? "font-semibold text-black bg-gray-100"
                    : "text-gray-600 hover:bg-gray-50"
                }
              `}
            >
              <div className="text-sm">
                {stepIndex}. {s}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
