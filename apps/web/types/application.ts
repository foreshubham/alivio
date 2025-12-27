export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";
export type PartnerStatus = "ACTIVE" | "BLOCKED";

/* =============================
   DOCUMENTS (URL BASED)
============================= */
export interface ApplicationDocuments {
  aadhaar?: string;
  pan?: string;
  photo?: string;
  eduCert?: string;
  drivingLicense?: string;
  rcBook?: string;
  policeVerification?: string;
  cancelledCheque?: string;
}

/* =============================
   PARTNER APPLICATION
============================= */
export interface PartnerApplication {
  applicationId: string;

  formData: {
    name: string;
    phone: string;
    email: string;
    address: string;
    district: string;
    technicianType: string;
    experienceYears: string;
  };

  documents?: ApplicationDocuments;

  status: ApplicationStatus;
  submittedAt: string;

  /* Admin controlled */
  partnerStatus?: PartnerStatus;
  zone?: string;
  zoneCode?: string;
  batch?: string;
}
