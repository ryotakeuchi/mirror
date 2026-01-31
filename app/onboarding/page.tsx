"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { ArrowRight, Heart, Moon, Activity } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { setOnboarded } = useApp();
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "あなたの睡眠が、美しさになる",
      description: "Mirrorは、あなたの健康データを美しさに変換するAIライフOSです。",
      icon: Moon,
    },
    {
      title: "データが価値になる",
      description: "睡眠、歩数、心拍数...すべてのデータが、あなただけの美しさプログラムを作ります。",
      icon: Activity,
    },
    {
      title: "パーソナライズされた体験",
      description: "AIがあなたの生活リズムを学習し、最適なタイミングでアドバイスを提供します。",
      icon: Heart,
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      router.push("/health-sync");
    }
  };

  const handleSkip = () => {
    router.push("/health-sync");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base via-white to-base flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-charcoal/10 to-charcoal/5 flex items-center justify-center">
                {(() => {
                  const Icon = steps[step].icon;
                  return <Icon className="w-12 h-12 text-charcoal" />;
                })()}
              </div>
            </motion.div>

            <h1 className="text-3xl font-serif font-bold mb-4 text-charcoal">
              {steps[step].title}
            </h1>
            <p className="text-lg text-charcoal/70 mb-12 leading-relaxed">
              {steps[step].description}
            </p>

            <div className="flex gap-2 justify-center mb-8">
              {steps.map((_, i) => (
                <motion.div
                  key={i}
                  className={`h-2 rounded-full ${
                    i === step ? "bg-charcoal w-8" : "bg-charcoal/20 w-2"
                  }`}
                  initial={false}
                  animate={{
                    width: i === step ? 32 : 8,
                    backgroundColor:
                      i === step ? "rgba(74, 74, 74, 1)" : "rgba(74, 74, 74, 0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSkip}
                className="flex-1 py-3 px-6 rounded-full text-charcoal/60 hover:text-charcoal transition-colors"
              >
                スキップ
              </button>
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 px-6 rounded-full bg-charcoal text-white flex items-center justify-center gap-2 soft-shadow"
              >
                次へ
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
