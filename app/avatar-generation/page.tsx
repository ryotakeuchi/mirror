"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { personas, Persona } from "@/lib/personas";

const LOTTIE_URL =
  "https://assets5.lottiefiles.com/packages/lf20_tq2s3d.json";

export default function AvatarGenerationPage() {
  const router = useRouter();
  const [persona, setPersona] = useState<Persona | null>(null);
  const [animationData, setAnimationData] = useState<any>(null);

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
   * Lottie 読み込み
   * ------------------------------ */
  useEffect(() => {
    fetch(LOTTIE_URL)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error(err));
  }, []);

  /* ------------------------------
   * 3秒後に /home へ遷移
   * ------------------------------ */
  useEffect(() => {
    if (!persona) return;

    const timer = setTimeout(() => {
      router.push("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [persona, router]);

  if (!persona) return null;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-mirror-secondary via-white to-mirror-primary/30 px-6 font-sans">
      {/* 背景演出 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/3 h-96 w-96 rounded-full bg-mirror-primary/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-white/40 blur-3xl" />
      </div>

      {/* 中央コンテンツ */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Persona アバター */}
        <motion.img
          src={persona.avatarImage}
          alt={persona.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 h-48 w-48 rounded-full bg-white/60 p-4 shadow-2xl backdrop-blur-lg"
        />

        {/* メッセージ */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-10 text-lg font-medium text-mirror-charcoal"
        >
          あなただけのMirrorが誕生しました。
        </motion.p>

        {/* 3秒間の演出（Lottie） */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="h-32 w-32"
        >
          {animationData && (
            <Lottie
              animationData={animationData}
              loop
              autoplay
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
