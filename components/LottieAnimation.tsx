"use client";

import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";

interface LottieAnimationProps {
  animationData?: any;
  animationUrl?: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
}

// シンプルなキラキラアニメーション（CSSアニメーションで代替）
const SparkleParticles = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-yellow-300"
          style={{
            left: `${50 + Math.cos((i * Math.PI * 2) / 12) * 30}%`,
            top: `${50 + Math.sin((i * Math.PI * 2) / 12) * 30}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function LottieAnimation({
  animationData,
  animationUrl,
  className = "",
  loop = true,
  autoplay = true,
  speed = 1,
}: LottieAnimationProps) {
  const lottieRef = useRef<any>(null);
  const [loadedAnimation, setLoadedAnimation] = useState<any>(null);

  useEffect(() => {
    if (animationUrl && !animationData) {
      fetch(animationUrl)
        .then((res) => res.json())
        .then((data) => setLoadedAnimation(data))
        .catch((err) => console.error("Failed to load animation:", err));
    } else if (animationData) {
      setLoadedAnimation(animationData);
    }
  }, [animationData, animationUrl]);

  useEffect(() => {
    if (lottieRef.current && speed !== 1) {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed]);

  if (!loadedAnimation && !animationData && !animationUrl) {
    // フォールバック: CSSアニメーション
    return <SparkleParticles className={className} />;
  }

  if (!loadedAnimation && !animationData) {
    return <SparkleParticles className={className} />;
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Lottie
        lottieRef={lottieRef}
        animationData={loadedAnimation || animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

// ローディング用のキラキラアニメーションコンポーネント
export function SparkleLoading({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={className}
    >
      <div className="relative w-32 h-32">
        <SparkleParticles className="w-full h-full" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-16 h-16 rounded-full border-4 border-yellow-300 border-t-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// 完了時のキラキラアニメーションコンポーネント
export function SparkleComplete({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={className}
    >
      <div className="relative w-24 h-24">
        <SparkleParticles className="w-full h-full" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-12 rounded-full bg-yellow-300 flex items-center justify-center">
            <span className="text-2xl">✨</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
