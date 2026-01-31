'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Persona } from '@/lib/personas'

type Props = {
  persona: Persona
  message?: string
}

export default function AvatarDisplay({ persona, message }: Props) {
  const [expression, setExpression] = useState<
    keyof Persona['avatarExpressions']
  >('normal')

  useEffect(() => {
    if (!message) {
      setExpression('normal')
      return
    }

    if (message.includes('お疲れ') || message.includes('無理')) {
      setExpression('concerned')
    } else if (message.includes('素晴らしい') || message.includes('いいですね')) {
      setExpression('happy')
    } else if (message.includes('大切') || message.includes('考えて')) {
      setExpression('serious')
    } else {
      setExpression('normal')
    }
  }, [message])

  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.img
        key={expression}
        src={persona.avatarExpressions[expression]}
        alt={persona.name}
        className="w-52 h-52 rounded-full shadow-xl"
        initial={{ opacity: 0.5, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  )
}
