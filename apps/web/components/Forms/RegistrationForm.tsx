"use client";

import React from "react";
import StepIndicator from "./StepsIndicator";
import StepBasicInfo from "./StepBasicInfo";
import StepOTP from "./SendOTP";
import StepRoleInfo from "./StepRoleInfo";
import StepBankDetails from "./StepBankDetails";
import StepDocuments from "./StepDocuments";
import StepTerms from "./StepTerms";
import StepPayment from "./StepPayment";
import SuccessScreen from "./SuccessScreen";
import { RegistrationProvider, useRegistration } from "@/contexts/RegistrationContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FormContent() {
  const {
    currentStep,
    nextStep,
    prevStep,
    formData,
    updateForm,
    errors,
    paymentSuccess,
    applicationId,
  } = useRegistration();

  // Render SuccessScreen if payment success
  if (paymentSuccess && applicationId) {
    return <SuccessScreen applicationId={applicationId} />;
  }

  return (
    <>
      <h1 className="text-2xl text-center py-10">Registration Form</h1>
      <div className="flex flex-col md:flex-row max-w-5xl mx-auto bg-white rounded shadow overflow-hidden">
        <div className="md:w-60 bg-gray-50 p-4">
          <StepIndicator />
        </div>

        <div className="flex-1 p-6">
          {currentStep === 1 && <StepBasicInfo />}
          {currentStep === 2 && <StepOTP />}
          {currentStep === 3 && <StepRoleInfo />}
          {currentStep === 4 && <StepBankDetails />}
          {currentStep === 5 && <StepDocuments />}
          {currentStep === 6 && <StepTerms />}
          {currentStep === 7 && <StepPayment />}

          <div className="flex justify-between mt-6">
            {currentStep > 1 && currentStep < 7 && (
              <button
                onClick={() => prevStep()}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Previous
              </button>
            )}

            {currentStep < 7 && (
              <button
                onClick={() => nextStep()}
                className="ml-auto px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function BecomePartnerFormWrapper() {
  return (
    <RegistrationProvider>
      <FormContent />
      <ToastContainer position="top-right" />
    </RegistrationProvider>
  );
}
