"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

/* =============================
   TYPES
============================= */

export type PartnerStatus = "ACTIVE" | "BLOCKED";
export type PaymentStatus = "PAID" | "PENDING";

export interface Partner {
  id: string;
  name: string;
  phone: string;
  zone: string;
  batch: string;
  proId: string;
  paymentStatus: PaymentStatus;
  status: PartnerStatus;
}

/* =============================
   CONTEXT
============================= */

interface PartnersContextType {
  partners: Partner[];
  togglePartnerStatus: (id: string) => void;
}

const PartnersContext = createContext<PartnersContextType | null>(null);

/* =============================
   MOCK DATA (replace with API later)
============================= */

const initialPartners: Partner[] = [
  {
    id: "p1",
    name: "Rahul Sharma",
    phone: "9876543210",
    zone: "South Delhi",
    batch: "Batch A",
    proId: "PRO-123456",
    paymentStatus: "PAID",
    status: "ACTIVE",
  },
  {
    id: "p2",
    name: "Amit Verma",
    phone: "9123456789",
    zone: "Noida",
    batch: "Batch B",
    proId: "PRO-654321",
    paymentStatus: "PENDING",
    status: "BLOCKED",
  },
];

/* =============================
   PROVIDER
============================= */

export function PartnersProvider({ children }: { children: ReactNode }) {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);

  const togglePartnerStatus = (id: string) => {
    setPartners((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: p.status === "ACTIVE" ? "BLOCKED" : "ACTIVE",
            }
          : p
      )
    );
  };

  return (
    <PartnersContext.Provider
      value={{
        partners,
        togglePartnerStatus,
      }}
    >
      {children}
    </PartnersContext.Provider>
  );
}

export const usePartners = () => {
  const ctx = useContext(PartnersContext);
  if (!ctx) {
    throw new Error("usePartners must be used inside PartnersProvider");
  }
  return ctx;
};
