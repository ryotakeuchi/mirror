'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sendMessageToDify } from '@/lib/api'
import AvatarDisplay from '@/components/AvatarDisplay'
import { personas } from '@/lib/personas'

export default function HomePage() {
  const selectedPersona = personas[0]

  const [currentMessage, setCurrentMessage] = useState(
    '今日はどんな気分ですか？'
  )
  const [loading, setLoading] = useState(false)
  const [aiExpression, setAiExpression] = useState<'neutral' | 'smile' | 'tired'>(
    'neutral'
  )

  /* ===== 時間帯判定 ===== */
  const timeOfDay = useMemo<'morning' | 'afternoon' | 'evening'>(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'morning'
    if (hour < 18) return 'afternoon'
    return 'evening'
  }, [])

  /* ===== 気分選択 ===== */
  const handleMoodSelect = async (moodText: string) => {
    if (loading) return

    setLoading(true)
    setCurrentMessage('')

    const query = `現在の時間帯：${timeOfDay}。ユーザーの状態：${moodText}。これに寄り添う言葉と1分でできるアクションを提案してください。`

    try {
      await sendMessageToDify({
        message: query,
        personaInstruction: selectedPersona.systemPrompt,

        /* ▼ ストリーミング受信 */
        onStream: (partial: string) => {
          setCurrentMessage(prev => prev + partial)

          /* 表情切り替え（簡易ルール） */
          if (partial.includes('お疲れ')) {
            setAiExpression('tired')
          }
          if (
            partial.includes('素晴らしい') ||
            partial.includes('いいですね')
          ) {
            setAiExpression('smile')
          }
        },
      })
    } catch (error) {
      console.error(error)
      setCurrentMessage('少し通信が不安定なようです。もう一度試してください。')
      setAiExpression('neutral')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-mirror-beige-light">
      {/* ===== アバターエリア ===== */}
      <div className="relative flex flex-col items-center pt-20">
        <AvatarDisplay
          persona={selectedPersona}
          aiExpression={aiExpression}
        />

        {/* ===== メッセージ吹き出し ===== */}
        <motion.div
          layout
          className="
            mt-6 max-w-md px-6 py-4
            bg-white/20 backdrop-blur-md
            rounded-3xl shadow-mirror-neumorphic
            text-center text-sm
          "
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {currentMessage}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ===== 気分選択 ===== */}
      <div className="mt-12 flex justify-center gap-4 px-6">
        {[
          '少しお疲れ気味',
          '普通',
          '調子がいい',
        ].map(mood => (
          <motion.button
            key={mood}
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            className={`
              px-5 py-3 rounded-2xl
              bg-white/30 backdrop-blur-md
              shadow-mirror-neumorphic
              text-sm
              ${loading ? 'opacity-40 pointer-events-none' : ''}
            `}
            onClick={() => handleMoodSelect(mood)}
          >
            {mood}
          </motion.button>
        ))}
      </div>

      {/* ===== ローディング表示 ===== */}
      {loading && (
        <div className="mt-6 text-center text-xs opacity-60">
          AIメンターが考えています…
        </div>
      )}
    </div>
  )
}
