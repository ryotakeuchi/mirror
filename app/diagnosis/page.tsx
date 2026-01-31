'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const QUESTIONS = [
  '最近、疲れを感じやすいですか？',
  '美容や健康に意識的ですか？',
  '運動は習慣化できていますか？',
  '自分磨きに前向きですか？',
  'どんなAIメンターに導かれたいですか？',
]

/**
 * ベージュ系の繊細なグラデーション（tailwind.config.ts想定）
 */
const BACKGROUND_GRADIENTS = [
  ['#F5F5F0', '#EDE8DE'],
  ['#EFE8DC', '#E5DED4'],
  ['#E8DDCC', '#D2B48C'],
  ['#E5DED4', '#CFC2A6'],
  ['#D2B48C', '#BFA27A'],
]

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
}

export default function DiagnosisPage() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const progress = ((index + 1) / QUESTIONS.length) * 100

  const nextQuestion = (dir: number) => {
    setDirection(dir)

    if (index === QUESTIONS.length - 1) {
      // 仮ロジック（本来は診断計算結果）
      localStorage.setItem('selectedModelId', 'asami')
      router.push('/avatar-generation')
      return
    }

    setIndex(prev => prev + 1)
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      animate={{
        background: `linear-gradient(
          135deg,
          ${BACKGROUND_GRADIENTS[index][0]},
          ${BACKGROUND_GRADIENTS[index][1]}
        )`,
      }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {/* ===== プログレスバー ===== */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3/4 max-w-md">
        <div className="h-2 bg-white/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-mirror-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <p className="text-xs text-center mt-2 opacity-70">
          {index + 1} / {QUESTIONS.length}
        </p>
      </div>

      {/* ===== 質問カード ===== */}
      <div className="w-full max-w-md mt-10">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            className="p-8 rounded-3xl bg-white/35 backdrop-blur-xl shadow-mirror-neumorphic text-center"
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(_, info) => {
              if (info.offset.x < -120) nextQuestion(1)
              if (info.offset.x > 120) nextQuestion(-1)
            }}
          >
            <h2 className="font-semibold text-lg mb-8">
              {QUESTIONS[index]}
            </h2>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => nextQuestion(-1)}
                className="flex-1 py-3 rounded-xl bg-white/40 backdrop-blur-lg shadow-mirror-neumorphic"
              >
                いいえ
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => nextQuestion(1)}
                className="flex-1 py-3 rounded-xl bg-mirror-primary text-white shadow-mirror-neumorphic"
              >
                はい
              </motion.button>
            </div>

            <p className="text-xs opacity-50 mt-6">
              スワイプでも回答できます
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
