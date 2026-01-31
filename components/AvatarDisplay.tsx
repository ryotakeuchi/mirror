'use client';

import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Persona } from '@/lib/personas';
import Lottie from 'lottie-react';
import auraGlowData from '../public/lottie/aura_glow.json'; // Lottieオーラ

export type AvatarExpression = 'neutral' | 'smile' | 'tired' | 'serious' | 'concerned';

type Props = {
  persona: Persona;
  aiExpression?: AvatarExpression | string;
  userExpression?: AvatarExpression | string;
  className?: string;
};

const AvatarDisplay: FC<Props> = ({ persona, aiExpression, userExpression, className }) => {
  // AIメンター（前面）の表情
  const aiAvatarImage =
    persona.avatarExpressions[aiExpression as keyof typeof persona.avatarExpressions] ||
    persona.avatarExpressions['normal'];

  // ユーザーアバター（背後）
  const userAvatarImage =
    persona.avatarExpressions[userExpression as keyof typeof persona.avatarExpressions] ||
    'avatar-user.png';

  return (
    <div className={`relative w-48 h-48 ${className || ''}`}>
      {/* Lottieオーラ（背景中央） */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center">
        <Lottie
          animationData={auraGlowData as any}
          loop
          autoplay
          style={{ width: '100%', height: '100%', opacity: 0.15 }}
        />
      </div>

      {/* 背後のユーザーアバター */}
      <AnimatePresence>
        <motion.img
          key={userAvatarImage}
          src={userAvatarImage}
          alt="User Avatar"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 0.8 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="absolute w-24 h-24 rounded-full object-cover filter grayscale blur-[2px] opacity-50 top-0 left-0"
        />
      </AnimatePresence>

      {/* 前面のAIメンター */}
      <AnimatePresence>
        <motion.img
          key={aiAvatarImage}
          src={aiAvatarImage}
          alt="AI Mentor Avatar"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="absolute w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl bottom-0 right-0"
        />
      </AnimatePresence>
    </div>
  );
};

export default AvatarDisplay;
