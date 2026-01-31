"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { personas, Persona } from "@/lib/personas";

type Mood = {
  id: string;
  label: string;
  emoji: string;
};

const moods: Mood[] = [
  { id: "good", label: "いい感じ", emoji: "🌿" },
  { id: "normal", label: "ふつう", emoji: "☁️" },
  { id: "tired", label: "ちょっと疲れた", emoji: "🌙" },
];

export default function HomePage() {
  const [persona, setPersona] = useState<Persona | null>(null);

  /* ------------------------------
   * Persona 読み込み
   * ------------------------------ */
  useEffect(() => {
    // 診断結果などで保存されている想定
    const selectedModelId =
      typeof window !== "undefined"
        ? localStorage.getItem("selectedModelId") || "asami"
        : "asami";

    const foundPersona =
      personas.find((p) => p.id === selectedModelId) || personas[0];

    setPersona(foundPersona);
  }, []);

  /* ------------------------------
   * テーマカラー適用
   * ------------------------------ */
  const themeClass = useMemo(() => {
    if (!persona) return "";
    return persona.themeColors.join(" ");
  }, [persona]);

  /* ------------------------------
   * タイプライター用 Variants
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
    hidden: { opacity: 0, y: 4 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut" },
    },
  };

  if (!persona) return null;

  return (
    <div
      className={`min-h-screen w-full px-6 pt-10 font-sans transition-colors duration-700 ${themeClass}`}
    >
      {/* ==============================
          AIメンター表示
      ============================== */}
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        {/* アバター */}
        <motion.img
          src={persona.avatarImage}
          alt={persona.name}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 h-32 w-32 rounded-full bg-white/60 p-3 shadow-lg backdrop-blur"
        />

        {/* 挨拶（タイプライター） */}
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

      {/* ==============================
          気分選択カード
      ============================== */}
      <div className="mx-auto mt-16 grid max-w-md grid-cols-3 gap-4">
        {moods.map((mood) => (
          <motion.button
            key={mood.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              console.log(`気分選択: ${mood.id}`)
            }
            className="flex flex-col items-center justify-center rounded-2xl bg-white/30 px-3 py-6 text-mirror-charcoal shadow-md backdrop-blur-lg transition"
          >
            <span className="mb-2 text-2xl">{mood.emoji}</span>
            <span className="text-sm font-medium">
              {mood.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
