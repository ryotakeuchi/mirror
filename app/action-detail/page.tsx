'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { actions } from '@/lib/actions'

export default function ActionDetailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const idParam = searchParams.get('id')

  const action = actions.find(
    (a) => a.id === Number(idParam)
  )

  if (!action) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm opacity-60">アクションが見つかりません</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-mirror-base text-mirror-text">

      {/* グラデーション背景 */}
      <div
        className="
          relative
          h-56
          bg-gradient-to-br
          from-[#EDE6D8]
          via-[#F4EFE7]
          to-[#FFFFFF]
        "
      >
        <button
          onClick={() => router.back()}
          className="
            absolute
            top-4
            left-4
            flex
            items-center
            gap-1
            text-sm
            opacity-80
          "
        >
          <ArrowLeft size={16} />
          戻る
        </button>
      </div>

      {/* コンテンツ */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="
          relative
          -mt-20
          mx-auto
          max-w-md
          px-4
        "
      >
        <div
          className="
            rounded-3xl
            bg-white/50
            backdrop-blur-2xl
            shadow-xl
            p-6
            space-y-6
          "
        >
          {/* タイトル */}
          <h1 className="text-xl font-serif leading-snug">
            {action.title}
          </h1>

          {/* なぜそれをするのか */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide opacity-60">
              なぜそれをするのか
            </p>
            <p className="text-sm leading-relaxed opacity-90">
              {action.logic}
            </p>
          </div>

          {/* ステップ */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wide opacity-60">
              3ステップ
            </p>

            <ol className="space-y-3">
              {action.steps.map((step, index) => (
                <li
                  key={index}
                  className="
                    flex
                    gap-3
                    items-start
                    text-sm
                  "
                >
                  <span
                    className="
                      flex
                      items-center
                      justify-center
                      w-6
                      h-6
                      rounded-full
                      bg-mirror-primary
                      text-white
                      text-xs
                      flex-shrink-0
                    "
                  >
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* 完了ボタン */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push('/home')}
          className="
            mt-8
            w-full
            py-4
            rounded-full
            bg-mirror-primary
            text-white
            text-lg
            font-medium
            shadow-lg
          "
        >
          完了
        </motion.button>
      </motion.div>
    </div>
  )
}
