'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Persona } from '@/lib/personas'

/* =========================
   型定義
========================= */

export type ExpressionType =
  | 'neutral'
  | 'smile'
  | 'tired'
  | 'serious'
  | 'concerned'

interface AvatarDisplayProps {
  persona: Persona
  aiExpression: ExpressionType
  userAvatarImage?: string
  userExpression?: ExpressionType
}

/* =========================
   表情マッピング
   UI用表情 → Persona定義キー
========================= */

const expressionMap: Record<
  ExpressionType,
  keyof Persona['avatarExpressions']
> = {
  neutral: 'normal',
  smile: 'happy',
  tired: 'concerned',
  concerned: 'concerned',
  serious: 'serious',
}

/* =========================
   Component
========================= */

export default function AvatarDisplay({
  persona,
  aiExpression,
  userAvatarImage,
  userExpression = 'neutral',
}: AvatarDisplayProps) {
  const aiAvatarSrc =
    persona.avatarExpressions[expressionMap[aiExpression]]

  const userAvatarSrc =
    userAvatarImage ??
    'https://api.dicebear.com/7.x/avataaars/svg?seed=user'

  return (
    <div className="relative flex items-center justify-center w-full h-[320px]">
      {/* =====================
          User Avatar (back)
      ====================== */}
      <div className="absolute z-10 translate-x-[-40px] translate-y-[20px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`user-${userExpression}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="rounded-full overflow-hidden"
          >
            <Image
              src={userAvatarSrc}
              alt="User Avatar"
              width={120}
              height={120}
              className="rounded-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =====================
          AI Mentor Avatar (front)
      ====================== */}
      <div className="absolute z-20 translate-x-[40px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`ai-${aiExpression}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="rounded-full overflow-hidden shadow-lg"
          >
            <Image
              src={aiAvatarSrc}
              alt={persona.name}
              width={160}
              height={160}
              className="rounded-full"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
