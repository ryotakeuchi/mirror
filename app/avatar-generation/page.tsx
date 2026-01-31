"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

const LOTTIE_URL =
  "https://assets5.lottiefiles.com/packages/lf20_tq2s3d.json";

const MESSAGE = "あなたにぴったりのMirrorを生成中...";

export default function AvatarGenerationPage() {
  const router = useRouter();
  const [displayedText, setDisplayedText] = useState("");

  /* ------------------------------
   * タイプライター演出
   * ------------------------------ */
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + MESSAGE[index]);
      index++;
      if (index >= MESSAGE.length) {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  /* ------------------------------
   * 3秒後にホームへ遷移
   * ------------------------------ */
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-mirror-secondary via-white to-mirror-primary/30 px-6">
      {/* 背景のやわらかい光 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/3 h-96 w-96 rounded-full bg-mirror-primary/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-white/60 blur-3xl" />
      </div>

      {/* 中央コンテンツ */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Lottie アニメーション */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-72 w-72"
        >
          <Lottie
            animationData={undefined}
            path={LOTTIE_URL}
            loop
            autoplay
          />
        </motion.div>

        {/* タイプライターメッセージ */}
        <motion.p
          className="mt-10 h-8 font-sans text-center text-lg text-mirror-tertiary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {displayedText}
          <span className="ml-1 animate-pulse">|</span>
        </motion.p>
      </div>
    </div>
  );
}
