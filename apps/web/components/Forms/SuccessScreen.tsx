import React from "react";
import { useRegistration } from "@/contexts/RegistrationContext";

export default function SuccessScreen({ applicationId }: { applicationId: string }) {
  const { reset } = useRegistration();

  return (
    <div className="max-w-xl mx-auto p-8 text-center max-h-screen">
      <h2 className="text-2xl font-bold text-green-600">Application Submitted</h2>
      <p className="mt-4">Your application id is <strong>{applicationId}</strong></p>
      <p className="mt-2">We will review your application and notify you about approval status.</p>

      <div className="mt-6 flex justify-center gap-3">
        <button onClick={() => reset()} className="px-4 py-2 border rounded">Start New Application</button>
      </div>
    </div>
  );
}
