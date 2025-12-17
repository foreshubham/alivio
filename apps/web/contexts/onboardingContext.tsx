"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

/* =============================
   TYPES
============================= */

export interface ToolkitItem {
  id: string;
  name: string;
  price: number;
  paid: boolean;
  deliveryDate: string | null;
}

interface OnboardingContextType {
  /* -------- ADMIN CONTROLLED -------- */
  approved: boolean;
  zone: string | null;
  zoneCode: string | null;
  batch: string | null;

  /** Admin-only updater (called from Admin panel) */
  adminAssignZone: (data: {
    approved: boolean;
    zone: string;
    zoneCode: string;
    batch: string;
  }) => void;

  /* -------- VENDOR CONTROLLED -------- */
  toolkits: ToolkitItem[];
  markToolkitPaid: (id: string, deliveryDate: string) => void;

  proId: string | null;
  generateProId: () => void;

  allToolkitsPaid: boolean;

  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

/* =============================
   INITIAL TOOLKITS
============================= */

const initialToolkits: ToolkitItem[] = [
  { id: "tshirt", name: "T-Shirt (2 Sets)", price: 499, paid: false, deliveryDate: null },
  { id: "ac", name: "Tool-Kit AC", price: 2499, paid: false, deliveryDate: null },
  { id: "floor", name: "Tool-Kit Floor Cleaner", price: 1799, paid: false, deliveryDate: null },
  { id: "car", name: "Tool-Kit Car Washer", price: 2199, paid: false, deliveryDate: null },
  { id: "bike", name: "Tool-Kit Bike Mechanic", price: 1999, paid: false, deliveryDate: null },
];

export function OnboardingProvider({ children }: { children: ReactNode }) {
  /* -------- ADMIN DATA -------- */
  const [approved, setApproved] = useState(false);
  const [zone, setZone] = useState<string | null>(null);
  const [zoneCode, setZoneCode] = useState<string | null>(null);
  const [batch, setBatch] = useState<string | null>(null);

  /* -------- VENDOR DATA -------- */
  const [toolkits, setToolkits] = useState<ToolkitItem[]>(initialToolkits);
  const [proId, setProId] = useState<string | null>(null);

  /* -------------------------------------------
     📌 LOAD FROM LOCAL STORAGE
  ------------------------------------------- */
  useEffect(() => {
    const saved = localStorage.getItem("onboarding_data");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      setApproved(parsed.approved ?? false);
      setZone(parsed.zone ?? null);
      setZoneCode(parsed.zoneCode ?? null);
      setBatch(parsed.batch ?? null);
      setToolkits(parsed.toolkits ?? initialToolkits);
      setProId(parsed.proId ?? null);

    } catch (err) {
      console.error("Failed to restore onboarding data", err);
    }
  }, []);

  /* -------------------------------------------
     📌 SAVE TO LOCAL STORAGE
  ------------------------------------------- */
  useEffect(() => {
    localStorage.setItem(
      "onboarding_data",
      JSON.stringify({
        approved,
        zone,
        zoneCode,
        batch,
        toolkits,
        proId,
      })
    );
  }, [approved, zone, zoneCode, batch, toolkits, proId]);

  /* -------------------------------------------
     🔐 ADMIN ASSIGNS ZONE + APPROVAL
  ------------------------------------------- */
  const adminAssignZone = ({
    approved,
    zone,
    zoneCode,
    batch,
  }: {
    approved: boolean;
    zone: string;
    zoneCode: string;
    batch: string;
  }) => {
    setApproved(approved);
    setZone(zone);
    setZoneCode(zoneCode);
    setBatch(batch);
  };

  /* -------------------------------------------
     VENDOR: TOOLKIT PAYMENT
  ------------------------------------------- */
  const markToolkitPaid = (id: string, deliveryDate: string) => {
    setToolkits((prev) =>
      prev.map((tk) =>
        tk.id === id ? { ...tk, paid: true, deliveryDate } : tk
      )
    );
  };

  /* -------------------------------------------
     SYSTEM: GENERATE PRO ID
  ------------------------------------------- */
  const generateProId = () => {
    if (proId) return;
    const id = "PRO-" + Math.floor(100000 + Math.random() * 900000);
    setProId(id);
  };

  /* -------------------------------------------
     COMPUTED
  ------------------------------------------- */
  const allToolkitsPaid = toolkits.every((t) => t.paid);

  /* -------------------------------------------
     RESET
  ------------------------------------------- */
  const resetOnboarding = () => {
    setApproved(false);
    setZone(null);
    setZoneCode(null);
    setBatch(null);
    setToolkits(initialToolkits);
    setProId(null);
    localStorage.removeItem("onboarding_data");
  };

  return (
    <OnboardingContext.Provider
      value={{
        approved,
        zone,
        zoneCode,
        batch,

        adminAssignZone,

        toolkits,
        markToolkitPaid,

        proId,
        generateProId,

        allToolkitsPaid,

        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error("useOnboarding must be used inside OnboardingProvider");
  }
  return ctx;
};
