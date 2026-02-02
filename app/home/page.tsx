'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

import { actions, ActionData } from '@/lib/actions'
import { sendMessageToDify } from '@/lib/api'
import { personas } from '@/lib/personas'
import AvatarDisplay from '@/components/AvatarDisplay'

type TimeSlot = '朝' | '昼' | '夕方' | '夜' | '深夜'
type Mood = '標準' | '疲れ気味' | 'モチベ高' | 'ストレス'

export default function HomePage() {
  const router = useRouter()

  /* ---------------- state ---------------- */

  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)
  const [suggestedAction, setSuggestedAction] = useState<ActionData | null>(null)

  const [aiMessage, setAiMessage] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)

  const [selectedPersona, setSelectedPersona] = useState<any>(null)

  const messageEndRef = useRef<HTMLDivElement>(null)

  /* ---------------- persona ---------------- */

  useEffect(() => {
    const storedId = localStorage.getItem('selectedModelId')
    const found =
      personas.find((p) => p.id === storedId) ||
      personas.find((p) => p.id === 'asami') ||
      personas[0]

    setSelectedPersona(found)
  }, [])

  /* ---------------- scroll ---------------- */

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [aiMessage])

  /* ---------------- time slot ---------------- */

  const getCurrentTimeSlot = (): TimeSlot => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 11) return '朝'
    if (hour >= 11 && hour < 15) return '昼'
    if (hour >= 15 && hour < 18) return '夕方'
    if (hour >= 18 && hour < 24) return '夜'
    return '深夜'
  }

  /* ---------------- mood select ---------------- */

  const handleMoodSelect = async (mood: Mood) => {
    setSelectedMood(mood)
    setAiMessage('')
    setIsStreaming(true)
    setSuggestedAction(null)

    /* --- アクション選出 --- */
    const timeSlot = getCurrentTimeSlot()

    const matchedActions = actions.filter(
      (a) => a.userStatus === mood && a.timeSlot === timeSlot
    )

    if (matchedActions.length > 0) {
      const picked =
        matchedActions[Math.floor(Math.random() * matchedActions.length)]
      setSuggestedAction(picked)
    }

    /* --- AI ストリーミング --- */
    try {
      await sendMessageToDify({
        message: `ユーザーの今の気分は「${mood}」です。寄り添う一言を短く伝えてください。`,
        personaInstruction: selectedPersona?.systemPrompt || '',
        onStream: (chunk: string) => {
          setAiMessage((prev) => prev + chunk)
        },
      })
    } catch (error) {
      console.error(error)
      setAiMessage('今の状態を大切にしてください。')
    } finally {
      setIsStreaming(false)
    }
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-mirror-base px-4 py-6 text-mirror-text">
      <div className="max-w-md mx-auto space-y-6">

        {/* Avatar */}
        {selectedPersona && (
          <div className="flex justify-center">
            <AvatarDisplay
              persona={selectedPersona}
              aiExpression="neutral"
            />
          </div>
        )}

        {/* AI Message */}
        <div className="rounded-2xl bg-white/40 backdrop-blur-xl p-4 shadow-sm min-h-[96px]">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {aiMessage || '今の気分を教えてください'}
          </p>
          <div ref={messageEndRef} />
        </div>

        {/* Mood Buttons */}
        <div className="flex flex-wrap gap-3">
          {(['標準', '疲れ気味', 'モチベ高', 'ストレス'] as Mood[]).map(
            (mood) => (
              <button
                key={mood}
                onClick={() => handleMoodSelect(mood)}
                disabled={isStreaming}
                className={`
                  px-4 py-2 rounded-full border transition
                  ${
                    selectedMood === mood
                      ? 'bg-mirror-primary text-white'
                      : 'bg-white/60'
                  }
                  ${isStreaming ? 'opacity-50' : ''}
                `}
              >
                {mood}
              </button>
            )
          )}
        </div>

        {/* Action Button */}
        <AnimatePresence>
          {suggestedAction && (
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              onClick={() =>
                router.push(`/action-detail?id=${suggestedAction.id}`)
              }
              className="
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
              {suggestedAction.actionName} を開始する
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
