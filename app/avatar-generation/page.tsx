'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Lottie from 'lottie-react'
import { personas } from '@/lib/personas'

const particleAnimationUrl =
  'https://assets5.lottiefiles.com/packages/lf20_tq2s3d.json'

export default function AvatarGenerationPage() {
  const router = useRouter()
  const [animationData, setAnimationData] = useState<any>(null)
  const [personaAvatar, setPersonaAvatar] = useState('')

  useEffect(() => {
    fetch(particleAnimationUrl)
      .then(res => res.json())
      .then(setAnimationData)

    const id = localStorage.getItem('selectedModelId')
    const persona = personas.find(p => p.id === id)
    if (persona) setPersonaAvatar(persona.avatarImage)

    const timer = setTimeout(() => router.push('/home'), 3000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-mirror-beige-light to-white">
      {animationData && (
        <Lottie animationData={animationData} className="w-64 h-64" />
      )}

      {personaAvatar && (
        <img
          src={personaAvatar}
          className="w-32 h-32 rounded-full mt-6 shadow-xl"
        />
      )}

      <p className="mt-4 font-serif opacity-80">
        あなただけのMirrorが誕生しました。
      </p>
    </div>
  )
}
