"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/contexts/adminAuthContext";

export default function AdminProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/super-admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return null; // or loader
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
