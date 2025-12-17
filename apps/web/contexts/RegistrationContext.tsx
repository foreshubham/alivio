"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";
import { useAdminApplications } from "@/contexts/adminContext";
import { PartnerApplication } from "@/types/application";

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

  aadhaar: File | null;
  pan: File | null;
  eduCert: File | null;
  drivingLicense: File | null;
  rcBook: File | null;
  policeVerification: File | null;
  photo: File | null;
  cancelCheque: File | null;

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

  aadhaar: null,
  pan: null,
  eduCert: null,
  drivingLicense: null,
  rcBook: null,
  policeVerification: null,
  photo: null,
  cancelCheque: null,

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
  setForm: (data: FormData) => void;

  errors: Record<string, string>;
  setErrors: (e: Record<string, string>) => void;

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
   🔥 MAIN PROVIDER WITH ADMIN HANDOFF
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
     Restore from localStorage
  ------------------------------*/
  useEffect(() => {
    const savedForm = localStorage.getItem("reg_form");
    const savedStep = localStorage.getItem("reg_step");
    const savedOtpSent = localStorage.getItem("reg_otp_sent");
    const savedOtpVerified = localStorage.getItem("reg_otp_verified");
    const savedPayment = localStorage.getItem("reg_payment");
    const savedAppId = localStorage.getItem("reg_app_id");

    if (savedForm) setFormData(JSON.parse(savedForm));
    if (savedStep) setCurrentStep(Number(savedStep));
    if (savedOtpSent) setOtpSent(savedOtpSent === "true");
    if (savedOtpVerified) setOtpVerified(savedOtpVerified === "true");
    if (savedPayment) setPaymentSuccess(savedPayment === "true");
    if (savedAppId) setApplicationId(savedAppId);
  }, []);

  /* -----------------------------
     Persist to localStorage
  ------------------------------*/
  useEffect(() => {
    localStorage.setItem("reg_form", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("reg_step", String(currentStep));
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem("reg_otp_sent", String(otpSent));
  }, [otpSent]);

  useEffect(() => {
    localStorage.setItem("reg_otp_verified", String(otpVerified));
  }, [otpVerified]);

  useEffect(() => {
    localStorage.setItem("reg_payment", String(paymentSuccess));
  }, [paymentSuccess]);

  useEffect(() => {
    if (applicationId) localStorage.setItem("reg_app_id", applicationId);
  }, [applicationId]);

  /* -----------------------------
     VALIDATIONS
  ------------------------------*/
  const validateStep = (step: number) => {
    const e: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) e.name = "Name is required";
      if (!/^\d{10}$/.test(formData.phone)) e.phone = "Phone must be 10 digits";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        e.email = "Enter a valid email";
      if (!formData.address.trim()) e.address = "Address is required";
      if (!formData.district) e.district = "Select district";
      if (!/^\d{4,6}$/.test(formData.pin)) e.pin = "Enter a valid PIN";
      if (!formData.dob) e.dob = "DOB is required";
    }

    if (step === 2) {
      if (!otpSent) e.otp = "Send OTP first";
      if (formData.otp.length !== 6) e.otp = "Enter 6 digit OTP";
      if (!otpVerified) e.otpVerified = "OTP not verified";
    }

    if (step === 3) {
      if (!formData.technicianType) e.technicianType = "Required";
      if (!formData.educationQualification)
        e.educationQualification = "Required";
    }

    if (step === 4) {
      if (!formData.bankName) e.bankName = "Bank is required";
      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(formData.ifsc))
        e.ifsc = "Invalid IFSC";
      if (formData.accountNumber !== formData.reAccountNumber)
        e.reAccountNumber = "Account numbers do not match";
    }

    if (step === 5) {
      if (!(formData.aadhaar instanceof File)) e.aadhaar = "Aadhaar required";
      if (!(formData.pan instanceof File)) e.pan = "PAN required";
      if (!(formData.photo instanceof File)) e.photo = "Photo required";
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
    setCurrentStep((s) => Math.min(s + 1, 7));
    return true;
  };

  const prevStep = () => {
    setErrors({});
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const goToStep = (s: number) => {
    if (s < currentStep) return setCurrentStep(s);
    for (let i = currentStep; i < s; i++) {
      if (!validateStep(i)) return;
    }
    setCurrentStep(s);
  };

  /* -----------------------------
     FORM
  ------------------------------*/
  const updateForm = (patch: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  };

  const setForm = (data: FormData) => setFormData(data);

  /* -----------------------------
     OTP
  ------------------------------*/
  const sendOtp = async () => {
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Enter valid phone number");
      return;
    }
    setOtpSent(true);
    toast.success("OTP sent (demo: 123456)");
  };

  const verifyOtp = async (otpValue: string) => {
    if (otpValue === "123456") {
      setOtpVerified(true);
      toast.success("OTP verified!");
      return true;
    }
    toast.error("Invalid OTP");
    return false;
  };

  /* -----------------------------
     🔥 PAYMENT → ADMIN HANDOFF
  ------------------------------*/
  const completePayment = async () => {
    if (!validateStep(6)) return;

    toast.info("Processing payment...");
    await new Promise((r) => setTimeout(r, 1000));

    const id = `APP-${Math.floor(100000 + Math.random() * 900000)}`;

    const application: PartnerApplication = {
      applicationId: id,
      submittedAt: new Date().toISOString(),
      status: "PENDING",
      formData,
    };

    addApplication(application); // 🔥 SEND TO ADMIN

    setApplicationId(id);
    setPaymentSuccess(true);

    toast.success("Application submitted successfully!");
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
        setForm,
        errors,
        setErrors,
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
