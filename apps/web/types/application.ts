export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";
export type PartnerStatus = "ACTIVE" | "BLOCKED";

export interface ApplicationDocuments {
  aadhaar?: File | null;
  pan?: File | null;
  photo?: File | null;
  eduCert?: File | null;
  drivingLicense?: File | null;
  rcBook?: File | null;
  policeVerification?: File | null;
  cancelCheque?: File | null;
}

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

  createdAt?: string;
}
