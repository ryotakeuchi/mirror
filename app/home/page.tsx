'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { personas } from '@/lib/personas'
import AvatarDisplay from '@/components/AvatarDisplay'
import { sendMessageToDify } from '@/lib/api'
import Lottie from 'lottie-react'

const loadingAnimationUrl =
  'https://assets3.lottiefiles.com/packages/lf20_tmtp8q7a.json'

export default function HomePage() {
  const [selectedPersona, setSelectedPersona] = useState(personas[0])
  const [message, setMessage] = useState(personas[0].initialGreeting)
  const [loading, setLoading] = useState(false)
  const [loadingAnimation, setLoadingAnimation] = useState<any>(null)

  useEffect(() => {
    fetch(loadingAnimationUrl)
      .then(res => res.json())
      .then(setLoadingAnimation)

    const storedId = localStorage.getItem('selectedModelId')
    if (storedId) {
      const found = personas.find(p => p.id === storedId)
      if (found) {
        setSelectedPersona(found)
        setMessage(found.initialGreeting)
      }
    }
  }, [])

  const moods = [
    { label: '🌿 少しお疲れ気味', value: '疲れ気味' },
    { label: '✨ 自分を磨きたい', value: '前向き' },
    { label: '🕯️ 静かに過ごしたい', value: '落ち着きたい' },
  ]

  const handleMoodClick = async (mood: string) => {
    setLoading(true)

    try {
      const res = await sendMessageToDify({
        message: `${selectedPersona.systemPrompt}\n\nユーザーの状態：${mood}`,
        personaInstruction: selectedPersona.systemPrompt,
      })
      setMessage(res.answer)
    } catch {
      setMessage('少し間を置いて、また話しかけてくださいね。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`min-h-screen flex flex-col justify-between px-6 py-10 ${selectedPersona.themeColors.join(
        ' '
      )}`}
    >
      {/* Avatar & Message */}
      <div className="flex flex-col items-center gap-6">
        <AvatarDisplay
          expressions={selectedPersona.avatarExpressions}
          message={message}
        />

        <motion.div className="bg-white/30 backdrop-blur-lg rounded-2xl px-6 py-4 text-center shadow-sm">
          <p className="font-serif leading-relaxed">{message}</p>
        </motion.div>
      </div>

      {/* Mood Selector */}
      <div className="w-full max-w-md mx-auto space-y-4">
        <p className="text-center text-sm opacity-70">今の気分は？</p>

        <div className="grid gap-3">
          {moods.map(mood => (
            <motion.button
              key={mood.value}
              whileHover={{ scale: 1.03 }}
              disabled={loading}
              onClick={() => handleMoodClick(mood.value)}
              className="relative rounded-xl bg-white/25 backdrop-blur-lg py-4 shadow-sm"
            >
              {loading && loadingAnimation ? (
                <Lottie
                  animationData={loadingAnimation}
                  loop
                  className="h-10 mx-auto"
                />
              ) : (
                mood.label
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
