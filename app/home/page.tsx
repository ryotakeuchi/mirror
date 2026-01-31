'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import AvatarDisplay from '@/components/AvatarDisplay'
import { personas, Persona } from '@/lib/personas'
import { sendMessageToDify } from '@/lib/api'

export default function HomePage() {
  const [persona, setPersona] = useState<Persona | null>(null)
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const storedId = localStorage.getItem('selectedModelId') || 'asami'
    const foundPersona = personas.find(p => p.id === storedId)
    if (foundPersona) setPersona(foundPersona)
  }, [])

  const handleMoodClick = async (mood: string) => {
    if (!persona) return

    setLoading(true)
    setMessage('')

    try {
      const res = await sendMessageToDify({
        message: `ユーザーの状態：${mood}`,
        personaInstruction: persona.systemPrompt,
      })

      // Difyの answer をそのまま表示
      setMessage(res.answer || '……')
    } catch (error) {
      console.error(error)
      setMessage('少し通信が不安定みたい。もう一度試してみて。')
    } finally {
      setLoading(false)
    }
  }

  if (!persona) return null

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-between px-6 py-10"
      style={{
        background: `linear-gradient(
          180deg,
          ${persona.themeColors.background},
          ${persona.themeColors.accent}
        )`,
        color: persona.themeColors.text,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* ===== アバター ===== */}
      <div className="flex flex-col items-center gap-4 mt-10">
        <AvatarDisplay persona={persona} message={message} />

        {/* 吹き出し */}
        <motion.div
          className="mt-4 px-6 py-4 rounded-2xl bg-white/40 backdrop-blur-lg shadow-mirror-neumorphic max-w-md text-center"
          layout
        >
          {message || persona.initialGreeting}
        </motion.div>
      </div>

      {/* ===== 気分選択 ===== */}
      <div className="w-full max-w-md mb-8">
        <p className="text-center mb-4 font-medium">今の気分は？</p>

        <div className="grid grid-cols-1 gap-3">
          {[
            '🌿 少しお疲れ気味',
            '✨ 自分を磨きたい',
            '🕯️ 静かに過ごしたい',
          ].map(label => (
            <motion.button
              key={label}
              onClick={() => handleMoodClick(label)}
              disabled={loading}
              whileTap={{ scale: 0.96 }}
              className="w-full px-4 py-3 rounded-xl bg-white/30 backdrop-blur-lg shadow-mirror-neumorphic text-center disabled:opacity-50"
            >
              {loading ? '考え中…' : label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
