'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Lottie from 'lottie-react'
import particleAnim from '@/public/lottie/particle-converge.json'

export default function AvatarGenerationPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Lottie
        animationData={particleAnim}
        className="w-80 h-80"
      />
      <p className="mt-6 text-lg">
        あなただけのMirrorが誕生しました。
      </p>
    </div>
  )
}
