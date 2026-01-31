"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Persona } from "@/lib/personas";

interface AvatarDisplayProps {
  persona?: Persona | { id: string; name: string; theme?: { primary: string; secondary: string } };
  isUser?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showStatus?: boolean;
  statusColor?: string;
}

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-40 h-40",
};

export default function AvatarDisplay({
  persona,
  isUser = false,
  size = "md",
  className = "",
  showStatus = false,
  statusColor = "bg-green-400",
}: AvatarDisplayProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (isUser) {
      // ユーザーアバター用のURL
      setAvatarUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=user");
    } else if (persona) {
      // ペルソナ名をシードとして使用
      const seed = persona.name.replace(/\s+/g, "").toLowerCase();
      setAvatarUrl(`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`);
    }
  }, [persona, isUser]);

  const handleImageError = () => {
    setImageError(true);
  };

  const sizeClass = sizeClasses[size];

  if (isUser) {
    return (
      <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className={`relative ${sizeClass} ${className}`}
      >
        {!imageError && avatarUrl ? (
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/50 deep-shadow">
            <Image
              src={avatarUrl}
              alt="User Avatar"
              fill
              className="object-cover"
              onError={handleImageError}
              unoptimized
            />
          </div>
        ) : (
          <div className="w-full h-full rounded-full bg-white/30 backdrop-blur-md border-2 border-white/50 flex items-center justify-center text-2xl deep-shadow">
            👤
          </div>
        )}
        {showStatus && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ${statusColor} border-2 border-white`}
          />
        )}
      </motion.div>
    );
  }

  if (!persona) return null;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`relative ${sizeClass} ${className}`}
    >
      {!imageError && avatarUrl ? (
        <div
          className="relative w-full h-full rounded-full overflow-hidden deep-shadow"
          style={{
            border: `3px solid ${
              "themeColors" in persona
                ? persona.themeColors.primary
                : "theme" in persona && persona.theme
                ? persona.theme.primary
                : "#D4C5B9"
            }`,
          }}
        >
          <Image
            src={avatarUrl}
            alt={`${persona.name} Avatar`}
            fill
            className="object-cover"
            onError={handleImageError}
            unoptimized
          />
        </div>
      ) : (
        <div
          className="w-full h-full rounded-full flex items-center justify-center text-2xl font-serif font-bold text-white deep-shadow"
          style={{
            background: `linear-gradient(135deg, ${
              "themeColors" in persona
                ? persona.themeColors.primary
                : "theme" in persona && persona.theme
                ? persona.theme.primary
                : "#D4C5B9"
            }, ${
              "themeColors" in persona
                ? persona.themeColors.secondary
                : "theme" in persona && persona.theme
                ? persona.theme.secondary
                : "#9B8E7F"
            })`,
          }}
        >
          {persona.name.charAt(0)}
        </div>
      )}
      {showStatus && (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-400 border-2 border-white"
        />
      )}
    </motion.div>
  );
}
