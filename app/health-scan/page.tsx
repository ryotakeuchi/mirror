'use client'

import { useState } from 'react'
import Lottie from 'lottie-react'
import successAnim from '@/public/lottie/particle-converge.json'

export default function HealthScanPage() {
  const [weight, setWeight] = useState('')
  const [bodyFat, setBodyFat] = useState('')
  const [muscle, setMuscle] = useState('')
  const [saved, setSaved] = useState(false)

  const saveData = () => {
    localStorage.setItem(
      'inbody',
      JSON.stringify({
        weight: Number(weight),
        bodyFat: Number(bodyFat),
        muscle: Number(muscle),
      })
    )
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <input
        className="border p-2"
        placeholder="体重"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <input
        className="border p-2"
        placeholder="体脂肪率"
        value={bodyFat}
        onChange={(e) => setBodyFat(e.target.value)}
      />
      <input
        className="border p-2"
        placeholder="筋肉量"
        value={muscle}
        onChange={(e) => setMuscle(e.target.value)}
      />

      <button
        onClick={saveData}
        className="px-6 py-2 bg-black text-white rounded"
      >
        保存
      </button>

      {saved && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <Lottie
            animationData={successAnim}
            className="w-64 h-64"
          />
        </div>
      )}
    </div>
  )
}
