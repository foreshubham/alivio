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
    <div className="flex flex-col gap-3">
      {steps.map((s, i) => {
        const stepIndex = i + 1;
        const isActive = stepIndex === currentStep;
        return (
          <button
            key={s}
            onClick={() => goToStep(stepIndex)}
            className={`text-left px-2 py-2 rounded ${isActive ? "font-semibold text-black" : "text-gray-600"}`}
          >
            <div className="text-sm">{stepIndex}. {s}</div>
          </button>
        );
      })}
    </div>
  );
}
