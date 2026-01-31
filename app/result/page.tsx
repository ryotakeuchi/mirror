"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { CheckCircle, Sparkles } from "lucide-react";

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedPersona } = useApp();
  const mood = searchParams.get("mood");
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<string>("");

  const moodMessages: Record<string, string> = {
    tired: "良質な睡眠を取ることで、明日の美しさが変わります。早めに休息を取りましょう。",
    motivated: "素晴らしいエネルギーですね！そのやる気を美しさの習慣に変えていきましょう。",
    relax: "リラックスした時間は、内面の美しさを育みます。ゆっくりと過ごしてください。",
    focused: "集中力が高まっていますね。この状態で、効果的なケアを実践しましょう。",
  };

  useEffect(() => {
    if (!selectedPersona) {
      router.push("/diagnosis");
      return;
    }

    if (!mood) {
      router.push("/home");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setResult(moodMessages[mood] || "アクションを完了しました。");
    }, 2000);
  }, [mood, selectedPersona, router]);

  if (!selectedPersona || !mood) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-base via-white to-base flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-4"
              >
                <Sparkles
                  className="w-16 h-16"
                  style={{ color: selectedPersona.theme.primary }}
                />
              </motion.div>
              <p className="text-lg text-charcoal/70">分析中...</p>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              {/* Glowing User Avatar */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mb-8 relative"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${selectedPersona.theme.primary}40, transparent)`,
                  }}
                />
                <div className="relative w-32 h-32 mx-auto rounded-full bg-white/30 backdrop-blur-md border-4 flex items-center justify-center text-4xl deep-shadow">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨
                  </motion.div>
                </div>
              </motion.div>

              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                className="mb-6"
              >
                <CheckCircle
                  className="w-20 h-20 mx-auto"
                  style={{ color: selectedPersona.theme.primary }}
                />
              </motion.div>

              {/* Result Message */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="glass rounded-3xl p-8 soft-shadow mb-6"
              >
                <h2 className="text-2xl font-serif font-bold mb-4 text-charcoal">
                  アクション完了
                </h2>
                <p className="text-lg text-charcoal/80 leading-relaxed">
                  {result}
                </p>
              </motion.div>

              {/* Back Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/home")}
                className="w-full py-4 px-6 rounded-full text-white font-semibold soft-shadow"
                style={{
                  background: `linear-gradient(135deg, ${selectedPersona.theme.primary}, ${selectedPersona.theme.secondary})`,
                }}
              >
                ホームに戻る
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
