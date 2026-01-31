'use client'

import { motion } from 'framer-motion'

interface Props {
  onSelect: (label: string) => void
  disabled?: boolean
}

export default function MoodSelector({ onSelect, disabled }: Props) {
  const moods = [
    { emoji: '🌿', label: '少しお疲れ気味' },
    { emoji: '✨', label: '自分を磨きたい' },
    { emoji: '🕯️', label: '静かに過ごしたい' },
  ]

  return (
    <div className="flex justify-around mt-8 w-full max-w-md px-4">
      {moods.map((m) => (
        <motion.button
          key={m.label}
          whileTap={{ scale: 0.96 }}
          onClick={() => !disabled && onSelect(m.label)}
          disabled={disabled}
          className="
            flex flex-col items-center justify-center
            bg-white/20 backdrop-blur-md shadow-mirror-neumorphic
            rounded-2xl p-4 w-28 h-28 font-sans text-mirror-charcoal
            disabled:opacity-40
          "
        >
          <span className="text-3xl text-mirror-primary">{m.emoji}</span>
          <span className="mt-1 text-sm">{m.label}</span>
        </motion.button>
      ))}
    </div>
  )
}
