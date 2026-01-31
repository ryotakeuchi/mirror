'use client'

import { useState } from 'react'
import Lottie from 'lottie-react'

const successAnimationUrl =
  'https://assets9.lottiefiles.com/packages/lf20_t3p4w8k0.json'

export default function HealthScanPage() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [animationData, setAnimationData] = useState<any>(null)

  const handleSave = async () => {
    localStorage.setItem(
      'inbody',
      JSON.stringify({ weight: 55, bodyFat: 25, muscle: 28 })
    )

    if (!animationData) {
      const res = await fetch(successAnimationUrl)
      setAnimationData(await res.json())
    }

    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-mirror-beige-light">
      <button
        onClick={handleSave}
        className="px-10 py-4 rounded-full bg-white/30 backdrop-blur-lg shadow-lg"
      >
        保存
      </button>

      {showSuccess && animationData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20">
          <Lottie
            animationData={animationData}
            className="w-48 h-48"
            loop={false}
          />
        </div>
      )}
    </div>
  )
}
