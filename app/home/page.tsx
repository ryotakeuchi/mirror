"use client";

import { useEffect, useState } from "react";
import { personas } from "@/lib/personas";
import AvatarDisplay from "@/components/AvatarDisplay";

type InBodyData = {
  weight: number;
  bodyFat: number;
  muscleMass: number;
};

export default function HomePage() {
  const [persona, setPersona] = useState(personas[0]);
  const [inbody, setInbody] = useState<InBodyData | null>(null);

  useEffect(() => {
    const selectedId = localStorage.getItem("selectedModelId");
    if (selectedId) {
      const found = personas.find(p => p.id === selectedId);
      if (found) setPersona(found);
    }

    const savedInbody = localStorage.getItem("inbodyData");
    if (savedInbody) {
      setInbody(JSON.parse(savedInbody));
    }
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-700 ${persona.themeColors[0]}`}
    >
      {/* ユーザーアバター */}
      <AvatarDisplay
        avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
        inbody={inbody}
      />

      {/* AIメンター */}
      <img
        src={persona.avatarImage}
        alt={persona.name}
        className="w-24 h-24 mt-6 rounded-full"
      />

      <p className="mt-4 text-center text-lg font-medium max-w-md">
        {persona.initialGreeting}
      </p>
    </div>
  );
}
