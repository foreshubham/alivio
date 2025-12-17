import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";

import "./globals.css";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";

import { RegistrationProvider } from "@/contexts/RegistrationContext";
import { OnboardingProvider } from "@/contexts/onboardingContext";
import { CartProvider } from "@/contexts/cartContext";
import { AdminApplicationsProvider } from "@/contexts/adminContext";
import { PartnersProvider } from "@/contexts/partnerContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Alivio Technology Partner",
  description: "Partner onboarding portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <AdminApplicationsProvider>
          <RegistrationProvider>
            <OnboardingProvider>
              <PartnersProvider>
                <CartProvider>
                  <Navbar />
                  {children}
                  <Footer />
                </CartProvider>
              </PartnersProvider>
            </OnboardingProvider>
          </RegistrationProvider>
        </AdminApplicationsProvider>
      </body>
    </html>
  );
}
