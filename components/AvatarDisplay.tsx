'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { Persona } from '@/lib/personas'
import Lottie from 'lottie-react'
import auraGlow from '../../public/lottie/aura_glow.json'

/**
 * Avatar 表情型
 * 既存の 'normal' | 'happy' | 'concerned' | 'serious' に加え
 * 安全のため任意の文字列も受け入れられるように string を許容
 */
export type AvatarExpression = 'neutral' | 'smile' | 'tired' | 'serious' | 'concerned'

type Props = {
  persona: Persona
  aiExpression?: AvatarExpression | string
  userExpression?: AvatarExpression | string
  userAvatarImage?: string
  className?: string
}

export default function AvatarDisplay({
  persona,
  aiExpression,
  userExpression,
  userAvatarImage,
  className,
}: Props) {
  // フォールバック関数：受け取った表情が存在しなければ normal/neutral に
  const getAiAvatar = () => {
    const key = aiExpression && aiExpression in persona.avatarExpressions
      ? aiExpression
      : 'normal'
    return persona.avatarExpressions[key as keyof typeof persona.avatarExpressions]
  }

  const getUserAvatar = () => {
    if (userAvatarImage) return userAvatarImage
    const key = userExpression && userExpression in persona.avatarExpressions
      ? userExpression
      : 'normal'
    return persona.avatarExpressions[key as keyof typeof persona.avatarExpressions]
  }

  return (
    <div className={`relative w-64 h-64 mx-auto mt-12 ${className ?? ''}`}>
      {/* オーラアニメーション */}
      <Lottie
        className="absolute inset-0"
        animationData={auraGlow}
        loop
        autoplay
        style={{ opacity: 0.25 }}
      />

      {/* AI メンターアバター */}
      <AnimatePresence mode="wait">
        <motion.div
          key={aiExpression}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.45 }}
          className="absolute left-1/2 top-1/3 -translate-x-1/2"
        >
          <Image
            src={getAiAvatar()}
            width={140}
            height={140}
            alt={`${persona.name} avatar`}
            className="rounded-full shadow-mirror-neumorphic"
          />
        </motion.div>
      </AnimatePresence>

      {/* ユーザーアバター */}
      <AnimatePresence mode="wait">
        <motion.div
          key={userExpression}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.45 }}
          className="absolute left-1/2 bottom-0 -translate-x-1/2"
        >
          <Image
            src={getUserAvatar()}
            width={90}
            height={90}
            alt="User avatar"
            className="rounded-full shadow-mirror-neumorphic"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
