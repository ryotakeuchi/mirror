'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

/* ===== 設定 ===== */

const QUESTIONS = [
  '最近、疲れを感じやすいですか？',
  '美容や健康に意識的ですか？',
  '運動は習慣化できていますか？',
  '自分磨きに前向きですか？',
  'どんなAIメンターに導かれたいですか？',
]

// tailwind.config.ts で定義している想定のベージュ系
const BACKGROUND_GRADIENTS = [
  ['#F5F5F0', '#EFE8DC'],
  ['#EFE8DC', '#E5DED4'],
  ['#E5DED4', '#D2B48C'],
  ['#E8DDCC', '#CFC2A6'],
  ['#D2B48C', '#BFA27A'],
]

/* ===== アニメーション ===== */

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
    scale: 0.96,
  }),
}

export default function DiagnosisPage() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const progress = ((index + 1) / QUESTIONS.length) * 100

  const next = (dir: number) => {
    setDirection(dir)

    if (index === QUESTIONS.length - 1) {
      // ※ 本来は診断ロジック結果
      localStorage.setItem('selectedModelId', 'asami')
      router.push('/avatar-generation')
      return
    }

    setIndex(prev => prev + 1)
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-6"
      animate={{
        background: `linear-gradient(
          135deg,
          ${BACKGROUND_GRADIENTS[index][0]},
          ${BACKGROUND_GRADIENTS[index][1]}
        )`,
      }}
      transition={{ duration: 1.4, ease: 'easeInOut' }}
    >
      {/* ===== プログレスバー ===== */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3/4 max-w-md">
        <div className="h-[2px] bg-black/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-mirror-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </div>
        <p className="mt-2 text-xs text-center opacity-60">
          {index + 1} / {QUESTIONS.length}
        </p>
      </div>

      {/* ===== 質問カード ===== */}
      <div className="w-full max-w-md">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 260, damping: 28 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(_, info) => {
              if (info.offset.x < -120) next(1)
              if (info.offset.x > 120) next(-1)
            }}
            className="
              p-8 rounded-3xl text-center
              bg-white/30 backdrop-blur-xl
              shadow-mirror-neumorphic
            "
          >
            <h2 className="font-semibold text-lg mb-10">
              {QUESTIONS[index]}
            </h2>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => next(-1)}
                className="
                  flex-1 py-3 rounded-xl
                  bg-white/40 backdrop-blur-lg
                  shadow-mirror-neumorphic
                "
              >
                いいえ
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => next(1)}
                className="
                  flex-1 py-3 rounded-xl
                  bg-mirror-primary text-white
                  shadow-mirror-neumorphic
                "
              >
                はい
              </motion.button>
            </div>

            <p className="mt-6 text-xs opacity-50">
              左右にスワイプしても回答できます
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
