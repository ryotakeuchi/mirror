'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Lottie from 'lottie-react'
import auraGlow from '../../public/lottie/aura_glow.json'
import { Persona } from '@/lib/personas'

type Expression = 'normal' | 'happy' | 'concerned' | 'serious'

interface Props {
  persona: Persona
  aiExpression: Expression
  userExpression?: Expression
  userAvatarImage?: string
}

export default function AvatarDisplay({
  persona,
  aiExpression,
  userExpression = 'normal',
  userAvatarImage,
}: Props) {
  const aiAvatar = persona.avatarExpressions[aiExpression] ?? persona.avatarExpressions.normal
  const userAvatar = userAvatarImage ?? persona.avatarExpressions.normal

  return (
    <div className="relative w-64 h-64 mx-auto mt-12">
      {/* オーラ */}
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
            src={aiAvatar}
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
            src={userAvatar}
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
