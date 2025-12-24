"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";
import { useAdminApplications } from "@/contexts/adminContext";
import {
  PartnerApplication,
  ApplicationDocuments,
} from "@/types/application";

/* -----------------------------
  Types
------------------------------*/
export type FormData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  district: string;
  pin: string;
  dob: string;
  otp: string;

  technicianType: string;
  educationQualification: string;
  experienceYears: string;

  bankName: string;
  ifsc: string;
  accountNumber: string;
  reAccountNumber: string;

  documents: ApplicationDocuments; // ✅ URL based

  termsAccepted: boolean;
  digitalSignature: string;
};

export const initialFormData: FormData = {
  name: "",
  phone: "",
  email: "",
  address: "",
  district: "",
  pin: "",
  dob: "",
  otp: "",

  technicianType: "",
  educationQualification: "",
  experienceYears: "",

  bankName: "",
  ifsc: "",
  accountNumber: "",
  reAccountNumber: "",

  documents: {},

  termsAccepted: false,
  digitalSignature: "",
};

type RegistrationContextType = {
  currentStep: number;
  nextStep: () => boolean;
  prevStep: () => void;
  goToStep: (s: number) => void;

  formData: FormData;
  updateForm: (patch: Partial<FormData>) => void;

  errors: Record<string, string>;

  otpSent: boolean;
  otpVerified: boolean;
  sendOtp: () => Promise<void>;
  verifyOtp: (otpValue: string) => Promise<boolean>;

  paymentSuccess: boolean;
  applicationId: string | null;
  completePayment: () => Promise<void>;

  reset: () => void;
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(
  undefined
);

/* --------------------------------------------------------
   PROVIDER
-------------------------------------------------------- */
export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  const { addApplication } = useAdminApplications();

  /* -----------------------------
     VALIDATION
  ------------------------------*/
  const validateStep = (step: number) => {
    const e: Record<string, string> = {};

    if (step === 5) {
      const docs = formData.documents;
      if (!docs.aadhaar) e.aadhaar = "Aadhaar required";
      if (!docs.pan) e.pan = "PAN required";
      if (!docs.photo) e.photo = "Photo required";
    }

    if (step === 6) {
      if (!formData.termsAccepted) e.termsAccepted = "Accept terms";
      if (formData.digitalSignature.trim().length < 3)
        e.digitalSignature = "Enter signature";
    }

    setErrors(e);
    if (Object.keys(e).length > 0) toast.error(Object.values(e)[0]);
    return Object.keys(e).length === 0;
  };

  /* -----------------------------
     NAVIGATION
  ------------------------------*/
  const nextStep = () => {
    if (!validateStep(currentStep)) return false;
    setCurrentStep((s) => s + 1);
    return true;
  };

  const prevStep = () => setCurrentStep((s) => s - 1);

  const goToStep = (s: number) => setCurrentStep(s);

  /* -----------------------------
     FORM
  ------------------------------*/
  const updateForm = (patch: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  };

  /* -----------------------------
     OTP
  ------------------------------*/
  const sendOtp = async () => {
    setOtpSent(true);
    toast.success("OTP sent (demo: 123456)");
  };

  const verifyOtp = async (otpValue: string) => {
    if (otpValue === "123456") {
      setOtpVerified(true);
      toast.success("OTP verified");
      return true;
    }
    toast.error("Invalid OTP");
    return false;
  };

  /* -----------------------------
     🔥 FINAL SUBMISSION (FIXED)
  ------------------------------*/
  const completePayment = async () => {
    if (!validateStep(6)) return;

    const id = `APP-${Math.floor(100000 + Math.random() * 900000)}`;

    const application: PartnerApplication = {
      applicationId: id,
      submittedAt: new Date().toISOString(),
      status: "PENDING",

      formData: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        district: formData.district,
        technicianType: formData.technicianType,
        experienceYears: formData.experienceYears,
        // bankName: formData.bankName,
        // ifsc: formData.ifsc,
        // accountNumber: formData.accountNumber,
        // cancelledCheque: formData.documents?.cancelledCheque,
        // photo: formData.documents?.photo,
        // aadhaar: formData.documents?.aadhaar,
        // pan: formData.documents?.pan,
        // digitalSignature: formData.digitalSignature,

      },

      documents: formData.documents, //  NOW CORRECT
    };

    addApplication(application); // ADMIN RECEIVES FULL DATA

    setApplicationId(id);
    setPaymentSuccess(true);
    toast.success("Application submitted successfully");
  };

  /* -----------------------------
     RESET
  ------------------------------*/
  const reset = () => {
    setCurrentStep(1);
    setFormData(initialFormData);
    setErrors({});
    setOtpSent(false);
    setOtpVerified(false);
    setPaymentSuccess(false);
    setApplicationId(null);
    localStorage.clear();
  };

  return (
    <RegistrationContext.Provider
      value={{
        currentStep,
        nextStep,
        prevStep,
        goToStep,
        formData,
        updateForm,
        errors,
        otpSent,
        otpVerified,
        sendOtp,
        verifyOtp,
        paymentSuccess,
        applicationId,
        completePayment,
        reset,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export const useRegistration = () => {
  const ctx = useContext(RegistrationContext);
  if (!ctx)
    throw new Error("useRegistration must be used inside RegistrationProvider");
  return ctx;
};
