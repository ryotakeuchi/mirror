"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { personas, Persona } from "@/lib/personas";

export default function HomePage() {
  const [persona, setPersona] = useState<Persona | null>(null);

  /* ------------------------------
   * selectedModelId → Persona 読み込み
   * ------------------------------ */
  useEffect(() => {
    const selectedModelId =
      localStorage.getItem("selectedModelId") || "asami";

    const foundPersona =
      personas.find((p) => p.id === selectedModelId) || personas[0];

    setPersona(foundPersona);
  }, []);

  /* ------------------------------
   * themeColors を背景に反映
   * ------------------------------ */
  const themeClass = useMemo(() => {
    if (!persona) return "";
    // 例: ['bg-mirror-beige-light', 'text-mirror-charcoal']
    return persona.themeColors.join(" ");
  }, [persona]);

  /* ------------------------------
   * タイプライター用 variants
   * ------------------------------ */
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut" },
    },
  };

  if (!persona) return null;

  return (
    <div
      className={`flex min-h-screen w-full items-center justify-center px-6 font-sans transition-colors duration-700 ${themeClass}`}
    >
      {/* ==============================
          中央コンテンツ
      ============================== */}
      <div className="flex max-w-md flex-col items-center text-center">
        {/* Persona アバター */}
        <motion.img
          src={persona.avatarImage}
          alt={persona.name}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8 h-48 w-48 rounded-full bg-white/60 p-4 shadow-2xl backdrop-blur-lg"
        />

        {/* 初回挨拶（タイプライター） */}
        <motion.p
          className="text-lg font-medium leading-relaxed text-mirror-charcoal"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {persona.initialGreeting.split("").map((char, index) => (
            <motion.span key={index} variants={charVariants}>
              {char}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </div>
  );
}
