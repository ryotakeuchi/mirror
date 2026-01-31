'use client'

import { motion } from 'framer-motion'

type Props = {
  image: string
  bodyFat?: number
  muscle?: number
}

export default function AvatarDisplay({
  image,
  bodyFat = 25,
  muscle = 50,
}: Props) {
  const scale = Math.max(0.9, 1.1 - bodyFat / 100)
  const opacity = Math.min(1, 0.7 + muscle / 200)
  const filter = `brightness(${1 + muscle / 300})`

  return (
    <motion.img
      src={image}
      alt="avatar"
      className="w-64 h-64 mx-auto rounded-full"
      animate={{ scale, opacity, filter }}
      transition={{ duration: 0.8 }}
    />
  )
}
