"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface ToolkitItem {
  id: string;
  name: string;
  price: number;
  paid: boolean;
  deliveryDate: string | null;
}

interface OnboardingContextType {
  approved: boolean;
  setApproved: (value: boolean) => void;

  zone: string | null;
  setZone: (value: string | null) => void;

  zoneCode: string | null;
  setZoneCode: (value: string | null) => void;

  batch: string | null;
  setBatch: (value: string | null) => void;

  toolkits: ToolkitItem[];
  markToolkitPaid: (id: string, deliveryDate: string) => void;

  proId: string | null;
  generateProId: () => void;

  allToolkitsPaid: boolean;

  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

const initialToolkits: ToolkitItem[] = [
  { id: "tshirt", name: "T-Shirt (2 Sets)", price: 499, paid: false, deliveryDate: null },
  { id: "ac", name: "Tool-Kit AC", price: 2499, paid: false, deliveryDate: null },
  { id: "floor", name: "Tool-Kit Floor Cleaner", price: 1799, paid: false, deliveryDate: null },
  { id: "car", name: "Tool-Kit Car Washer", price: 2199, paid: false, deliveryDate: null },
  { id: "bike", name: "Tool-Kit Bike Mechanic", price: 1999, paid: false, deliveryDate: null },
];

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [approved, setApproved] = useState(false);
  const [zone, setZone] = useState<string | null>(null);
  const [zoneCode, setZoneCode] = useState<string | null>(null);
  const [batch, setBatch] = useState<string | null>(null);
  const [toolkits, setToolkits] = useState<ToolkitItem[]>(initialToolkits);
  const [proId, setProId] = useState<string | null>(null);

  /* -------------------------------------------
     📌 Load onboarding data from localStorage
  ------------------------------------------- */
  useEffect(() => {
    const saved = localStorage.getItem("onboarding_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        setApproved(parsed.approved ?? false);
        setZone(parsed.zone ?? null);
        setZoneCode(parsed.zoneCode ?? null);
        setBatch(parsed.batch ?? null);

        setToolkits(parsed.toolkits ?? initialToolkits);
        setProId(parsed.proId ?? null);

      } catch (err) {
        console.error("Failed to restore onboarding data:", err);
      }
    }
  }, []);

  /* -------------------------------------------
     📌 Save onboarding data whenever something changes
  ------------------------------------------- */
  useEffect(() => {
    const data = {
      approved,
      zone,
      zoneCode,
      batch,
      toolkits,
      proId,
    };
    localStorage.setItem("onboarding_data", JSON.stringify(data));
  }, [approved, zone, zoneCode, batch, toolkits, proId]);

  /* -------------------------------------------
     MARK TOOLKIT PAID
  ------------------------------------------- */
  const markToolkitPaid = (id: string, deliveryDate: string) => {
    setToolkits((prev) =>
      prev.map((tk) =>
        tk.id === id ? { ...tk, paid: true, deliveryDate } : tk
      )
    );
  };

  /* -------------------------------------------
     GENERATE PRO ID
  ------------------------------------------- */
  const generateProId = () => {
    const id = "PRO-" + Math.floor(100000 + Math.random() * 900000);
    setProId(id);
  };

  /* -------------------------------------------
     ALL TOOLKITS PAID CHECK
  ------------------------------------------- */
  const allToolkitsPaid = toolkits.every((t) => t.paid);

  /* -------------------------------------------
     RESET ONBOARDING
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
        setApproved,

        zone,
        setZone,

        zoneCode,
        setZoneCode,

        batch,
        setBatch,

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
  if (!ctx) throw new Error("useOnboarding must be used inside OnboardingProvider");
  return ctx;
};
