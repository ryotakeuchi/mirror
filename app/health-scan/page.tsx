"use client";

import { useRouter } from "next/navigation";

export default function HealthScanPage() {
  const router = useRouter();

  const saveDummyInBodyData = () => {
    const inbodyData = {
      weight: 54,        // kg
      bodyFat: 22,       // %
      muscleMass: 38,    // kg
    };

    localStorage.setItem("inbodyData", JSON.stringify(inbodyData));
    router.push("/home");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-mirror-beige-light">
      <h1 className="text-xl font-semibold mb-6">
        InBody データをスキャン中…
      </h1>

      <button
        onClick={saveDummyInBodyData}
        className="px-8 py-4 rounded-xl bg-white/30 backdrop-blur-lg shadow-lg"
      >
        スキャン完了（ダミー）
      </button>
    </div>
  );
}
