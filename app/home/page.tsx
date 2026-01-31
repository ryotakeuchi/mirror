'use client'

import { useEffect, useState } from 'react'
import { personas } from '@/lib/personas'
import { sendMessageToDify } from '@/lib/api'
import AvatarDisplay from '@/components/AvatarDisplay'
import Lottie from 'lottie-react'
import loadingAnim from '@/public/lottie/particle-converge.json'

export default function HomePage() {
  const [persona, setPersona] = useState(personas[0])
  const [message, setMessage] = useState(persona.initialGreeting)
  const [loading, setLoading] = useState(false)
  const [expression, setExpression] =
    useState<'normal' | 'happy' | 'concerned' | 'serious'>(
      'normal'
    )

  const inbody =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('inbody') || '{}')
      : {}

  const moods = [
    { label: '🌿 少しお疲れ気味', key: '疲れ' },
    { label: '✨ 自分を磨きたい', key: '成長' },
    { label: '🕯️ 静かに過ごしたい', key: '静か' },
  ]

  const handleMood = async (text: string) => {
    setLoading(true)

    const res = await sendMessageToDify(
      persona.systemPrompt,
      `ユーザーの状態：${text}`
    )

    const answer = res.answer
    setMessage(answer)

    if (answer.includes('素晴らしい')) setExpression('happy')
    else if (answer.includes('お疲れ')) setExpression('concerned')
    else setExpression('normal')

    setLoading(false)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between p-6"
      style={{
        background: persona.themeColors[0],
      }}
    >
      <div className="mt-12">
        <AvatarDisplay
          image={persona.avatarExpressions[expression]}
          bodyFat={inbody.bodyFat}
          muscle={inbody.muscle}
        />

        <div className="mt-6 p-4 bg-white/60 backdrop-blur rounded-xl max-w-md">
          {message}
        </div>
      </div>

      <div className="w-full max-w-md space-y-3 mb-8">
        {moods.map((m) => (
          <button
            key={m.key}
            disabled={loading}
            onClick={() => handleMood(m.key)}
            className="w-full p-4 rounded-xl bg-white/40 backdrop-blur border hover:scale-[1.02] transition"
          >
            {loading ? (
              <Lottie
                animationData={loadingAnim}
                className="h-10 mx-auto"
              />
            ) : (
              m.label
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
