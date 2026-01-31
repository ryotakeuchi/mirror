'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import auraGlow from '../../public/lottie/aura_glow.json';
import { Persona } from '@/lib/personas';

interface Props {
  persona: Persona;
  aiExpression: 'normal' | 'happy' | 'concerned' | 'serious';
  userExpression?: 'normal' | 'happy' | 'concerned' | 'serious';
  userAvatarImage?: string;
}

export default function AvatarDisplay({
  persona,
  aiExpression,
  userExpression = 'normal',
  userAvatarImage,
}: Props) {
  return (
    <div className="relative w-64 h-64 mx-auto mt-12">
      {/* ユーザーアバター */}
      {userAvatarImage && (
        <AnimatePresence>
          <motion.img
            key={userExpression}
            src={userAvatarImage}
            alt="User Avatar"
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full object-cover border-2 border-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </AnimatePresence>
      )}

      {/* オーラアニメーション */}
      <Lottie
        className="absolute inset-0"
        animationData={auraGlow}
        loop
        autoplay
        style={{ opacity: 0.3 }}
      />

      {/* AIメンターアバター */}
      <AnimatePresence>
        <motion.img
          key={aiExpression}
          src={persona.avatarExpressions[aiExpression] ?? persona.avatarExpressions.normal}
          alt="AI Mentor"
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full object-cover border-2 border-white shadow-mirror-neumorphic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
    </div>
  );
}
