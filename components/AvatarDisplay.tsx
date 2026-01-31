"use client";

import { motion } from "framer-motion";

type InBodyData = {
  weight: number;
  bodyFat: number;
  muscleMass: number;
};

type Props = {
  avatarUrl: string;
  inbody: InBodyData | null;
};

export default function AvatarDisplay({ avatarUrl, inbody }: Props) {
  // デフォルト値
  let scale = 1;
  let opacity = 1;
  let filter = "brightness(1) saturate(1)";

  if (inbody) {
    // 体脂肪率が低いほど引き締まる
    scale = 1 + (20 - inbody.bodyFat) * 0.005;

    // 筋肉量が多いほど存在感アップ
    opacity = Math.min(1, 0.8 + inbody.muscleMass * 0.005);

    // 健康感（ツヤ）
    filter = `brightness(${1 + inbody.muscleMass * 0.01}) saturate(${1 +
      (25 - inbody.bodyFat) * 0.02})`;
  }

  return (
    <motion.img
      src={avatarUrl}
      alt="User Avatar"
      className="w-40 h-40 rounded-full shadow-xl"
      animate={{
        scale,
        opacity,
        filter,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    />
  );
}
