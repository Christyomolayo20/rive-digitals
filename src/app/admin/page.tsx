"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRootRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem("rive_admin_session") ||
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_session="))
        ?.split("=")[1];

    if (token) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/admin/login");
    }
  }, [router]);

  return (
    <div className="flex h-64 items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 rounded-full border-2 border-brand-coral border-t-transparent animate-spin" />
        <span className="text-sm font-medium text-slate-500">
          Directing to Admin Studio...
        </span>
      </div>
    </div>
  );
}
