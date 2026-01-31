"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { Sparkles } from "lucide-react";

export default function AvatarGenerationPage() {
  const router = useRouter();
  const { selectedPersona } = useApp();
  const [stage, setStage] = useState<"particles" | "reveal" | "complete">("particles");

  useEffect(() => {
    if (!selectedPersona) {
      router.push("/diagnosis");
      return;
    }

    // Particle animation stage
    setTimeout(() => {
      setStage("reveal");
    }, 2000);

    // Complete stage
    setTimeout(() => {
      setStage("complete");
    }, 4000);
  }, [selectedPersona, router]);

  useEffect(() => {
    if (stage === "complete") {
      setTimeout(() => {
        router.push("/home");
      }, 2000);
    }
  }, [stage, router]);

  if (!selectedPersona) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-base via-white to-base flex items-center justify-center p-4 relative overflow-hidden">
      {/* Particle Animation */}
      <AnimatePresence>
        {stage === "particles" && (
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: "50%",
                  y: "50%",
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                  repeat: Infinity,
                }}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: selectedPersona.theme.primary,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Reveal Stage */}
      <AnimatePresence>
        {stage === "reveal" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center max-w-md w-full"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mb-8"
            >
              <div
                className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-4xl font-serif font-bold text-white deep-shadow"
                style={{
                  background: `linear-gradient(135deg, ${selectedPersona.theme.primary}, ${selectedPersona.theme.secondary})`,
                }}
              >
                {selectedPersona.name.charAt(0)}
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-serif font-bold mb-4 text-charcoal"
            >
              {selectedPersona.name}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-charcoal/70 mb-6"
            >
              {selectedPersona.description}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="glass rounded-2xl p-6 soft-shadow"
            >
              <p className="text-charcoal/80 leading-relaxed">
                {selectedPersona.welcomeMessage}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Complete Stage */}
      <AnimatePresence>
        {stage === "complete" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
            <p className="text-xl font-semibold text-charcoal">準備完了！</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
