'use client'

import { useEffect, useState } from 'react'
import AvatarDisplay from '@/components/AvatarDisplay'
import MoodSelector from '@/components/MoodSelector'
import Lottie from 'lottie-react'
import loadingSpinner from '../../public/lottie/loading_spinner.json'
import { Persona, personas } from '@/lib/personas'
import { sendMessageToDify } from '@/lib/api'

type AIExpr = 'normal' | 'happy' | 'concerned' | 'serious'

export default function HomePage() {
  const [persona, setPersona] = useState<Persona | null>(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [aiExpression, setAiExpression] = useState<AIExpr>('normal')

  useEffect(() => {
    const id = localStorage.getItem('selectedModelId')
    const found = personas.find((p) => p.id === id)
    setPersona(found ?? personas[0])
  }, [])

  const mapExpr = (text: string): AIExpr => {
    if (text.includes('疲れ')) return 'concerned'
    if (text.includes('素晴らしい')) return 'happy'
    if (text.includes('頑張')) return 'serious'
    return 'normal'
  }

  const handleSelect = async (label: string) => {
    if (!persona) return
    setLoading(true)
    setMessage('')

    const time = new Date().getHours()
    const timeOfDay =
      time < 12 ? 'morning' : time < 18 ? 'afternoon' : 'evening'

    await sendMessageToDify({
      message: `現在の時間帯：${timeOfDay}。ユーザーの状態：${label}。寄り添い提案をしてください。`,
      personaInstruction: persona.systemPrompt,
      onStream: (chunk) => {
        setMessage((prev) => prev + chunk)
        setAiExpression(mapExpr(chunk))
      },
    })

    setLoading(false)
  }

  if (!persona) return null

  return (
    <div className="min-h-screen bg-mirror-beige-light font-sans p-6 flex flex-col items-center">
      {/* アバター */}
      <AvatarDisplay
        persona={persona}
        aiExpression={aiExpression}
      />

      {/* メッセージ */}
      <div
        className="
          mt-8 p-4 bg-white/20 backdrop-blur-md
          shadow-mirror-neumorphic rounded-2xl
          w-full max-w-xl text-center text-lg
        "
      >
        {loading ? (
          <Lottie animationData={loadingSpinner} loop autoplay className="w-16 h-16 mx-auto" />
        ) : (
          message || '今日の気分を選んでください。'
        )}
      </div>

      {/* 気分カード */}
      <MoodSelector onSelect={handleSelect} disabled={loading} />
    </div>
  )
}
