'use client';

import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Persona } from '@/lib/personas';
import Lottie from 'lottie-react';

// JSONインポート安全化（型エラー回避）
import auraGlowData from '../public/lottie/aura_glow.json'; // ここは public/lottie 内に配置

export type AvatarExpression = 'neutral' | 'smile' | 'tired' | 'serious' | 'concerned';

type Props = {
  persona: Persona;
  aiExpression?: AvatarExpression | string; // 外部からの文字列も許容
  userExpression?: AvatarExpression | string; // 外部からの文字列も許容
  className?: string;
};

const AvatarDisplay: FC<Props> = ({ persona, aiExpression, userExpression, className }) => {
  // AIメンターの表情
  const aiAvatarImage = persona.avatarExpressions[aiExpression as keyof typeof persona.avatarExpressions] 
    || persona.avatarExpressions['normal'];

  // ユーザーの表情（現状は neutral にフォールバック）
  const userAvatarImage = persona.avatarExpressions[userExpression as keyof typeof persona.avatarExpressions] 
    || persona.avatarExpressions['normal'];

  return (
    <div className={`relative flex items-center justify-center ${className || ''}`}>
      {/* ユーザーのオーラ（Lottie） */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Lottie 
          animationData={auraGlowData as any} 
          loop 
          autoplay 
          style={{ width: '100%', height: '100%', opacity: 0.2 }}
        />
      </div>

      <div className="relative z-10 flex space-x-4 items-end">
        {/* ユーザーアバター */}
        <AnimatePresence>
          <motion.img
            key={userAvatarImage}
            src={userAvatarImage}
            alt="User Avatar"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 rounded-full object-cover"
          />
        </AnimatePresence>

        {/* AIメンターアバター */}
        <AnimatePresence>
          <motion.img
            key={aiAvatarImage}
            src={aiAvatarImage}
            alt="AI Mentor Avatar"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="w-28 h-28 rounded-full object-cover"
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AvatarDisplay;
