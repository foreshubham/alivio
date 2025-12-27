Alivio Technology – Partner Onboarding System
📄 Description

The Partner Onboarding System at Alivio Technology is a structured, step-by-step workflow designed to onboard vendors (partners) efficiently and securely.
The onboarding process is divided into two major phases:

Vendor Application (Before Admin Approval)

Post-Approval Partner Setup

Each phase ensures proper data collection, verification, compliance, and readiness before a vendor gains access to the platform dashboard.

📁 Project Structure
Alivio-Technology
├── components
│   └── Forms
│       ├── StepBasicInfo
│       ├── SendOTP
│       ├── StepRoleInfo
│       ├── StepBankDetails
│       ├── StepTerms
│       ├── StepPayment
│       └── SuccessScreen
│
└── web
    └── app
        └── partners
            └── onboarding
                ├── application-status
                ├── buy-toolkit
                ├── zone
                ├── training
                ├── pro-id
                └── dashboard

📝 Phase 1: Vendor Application (Pre-Approval)

Location: components/Forms
This phase collects all necessary information from the vendor and submits the application for admin review.

1. StepBasicInfo

Description:
Collects basic personal and contact details of the vendor such as name, phone number, email, and address. This forms the foundation of the vendor profile.

2. SendOTP

Description:
Verifies the vendor’s mobile number through a One-Time Password (OTP) to ensure authenticity and prevent fraudulent registrations.

3. StepRoleInfo

Description:
Captures professional details including:

Educational qualification

Vendor type (service category)

Total work experience
This information helps in role assignment and service eligibility.

4. StepBankDetails

Description:
Collects bank account information required for vendor payouts, settlements, and financial transactions.

5. StepTerms

Description:
Displays Alivio Technology’s terms and conditions.
The vendor must accept the terms and provide a digital signature to proceed.

6. StepPayment

Description:
Handles application or onboarding fee payment securely.
Successful payment is mandatory for application submission.

7. SuccessScreen

Description:
Confirms successful submission of the vendor application and notifies the vendor that their application has been sent to Alivio Technology for review.

✅ Phase 2: Partner Onboarding (Post-Approval)

Location: web/app/partners/onboarding
This phase begins only after admin approval and completes vendor activation.

1. application-status

Description:
The first page visible after approval.
Allows vendors to track their onboarding progress and view approval status.

2. buy-toolkit

Description:
Enables vendors to purchase the required toolkit needed to start operations.
An order confirmation is sent to the vendor upon successful purchase.

3. zone

Description:
Displays the service zone and unique zone code assigned by the admin.
This determines the vendor’s operational area.

4. training

Description:
Provides training details, schedules, and resources assigned to the vendor to ensure service quality and compliance.

5. pro-id

Description:
Generates a unique Pro ID linked to the vendor.
This ID is used for identification, tracking, and service assignments.

6. dashboard

Description:
The main vendor dashboard providing access to jobs, earnings, profile management, and analytics.

⚠️ Note: The dashboard is located outside the partners folder and accessed via:

*/dashboard*
