'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

type AvatarExpressions = {
  normal: string
  happy: string
  concerned: string
  serious: string
}

type Props = {
  expressions: AvatarExpressions
  message: string
}

export default function AvatarDisplay({ expressions, message }: Props) {
  const currentExpression = useMemo(() => {
    if (!message) return expressions.normal

    if (message.includes('お疲れ')) return expressions.concerned
    if (message.includes('素晴らしい') || message.includes('いいですね'))
      return expressions.happy
    if (message.includes('大切') || message.includes('意識'))
      return expressions.serious

    return expressions.normal
  }, [message, expressions])

  return (
    <motion.div
      key={currentExpression}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex justify-center"
    >
      <img
        src={currentExpression}
        alt="AI Mentor Avatar"
        className="w-40 h-40 rounded-full shadow-lg"
      />
    </motion.div>
  )
}
