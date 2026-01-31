"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/contexts/AppContext";

export default function Home() {
  const router = useRouter();
  const { isOnboarded, hasCompletedDiagnosis } = useApp();

  useEffect(() => {
    if (!isOnboarded) {
      router.push("/onboarding");
    } else if (!hasCompletedDiagnosis) {
      router.push("/diagnosis");
    } else {
      router.push("/home");
    }
  }, [isOnboarded, hasCompletedDiagnosis, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse">読み込み中...</div>
    </div>
  );
}
