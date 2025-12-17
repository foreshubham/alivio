"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { PartnerApplication } from "@/types/application";

interface AdminContextType {
  applications: PartnerApplication[];
  addApplication: (app: PartnerApplication) => void;
  updateStatus: (id: string, status: PartnerApplication["status"]) => void;
  getApplicationById: (id: string) => PartnerApplication | undefined;
}

const AdminApplicationsContext = createContext<AdminContextType | undefined>(
  undefined
);

export function AdminApplicationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [applications, setApplications] = useState<PartnerApplication[]>([]);

  /* Restore */
  useEffect(() => {
    const saved = localStorage.getItem("admin_applications");
    if (saved) setApplications(JSON.parse(saved));
  }, []);

  /* Persist */
  useEffect(() => {
    localStorage.setItem(
      "admin_applications",
      JSON.stringify(applications)
    );
  }, [applications]);

  const addApplication = (app: PartnerApplication) => {
    setApplications((prev) => [app, ...prev]);
  };

  const updateStatus = (id: string, status: PartnerApplication["status"]) => {
    setApplications((prev) =>
      prev.map((a) =>
        a.applicationId === id ? { ...a, status } : a
      )
    );
  };

  const getApplicationById = (id: string) =>
    applications.find((a) => a.applicationId === id);

  return (
    <AdminApplicationsContext.Provider
      value={{ applications, addApplication, updateStatus, getApplicationById }}
    >
      {children}
    </AdminApplicationsContext.Provider>
  );
}

export const useAdminApplications = () => {
  const ctx = useContext(AdminApplicationsContext);
  if (!ctx)
    throw new Error(
      "useAdminApplications must be used inside AdminApplicationsProvider"
    );
  return ctx;
};
