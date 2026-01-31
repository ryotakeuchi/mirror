'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Lottie from 'lottie-react'
// import successSparkles from '../../public/lottie/success_sparkles.json'
// もしLottie JSONがimportできる場合は上記を使用
// public/lottie に保存して、src={successSparkles} のように渡す

export default function HealthScanPage() {
  const router = useRouter()
  const [weight, setWeight] = useState('')
  const [bodyFat, setBodyFat] = useState('')
  const [muscle, setMuscle] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = () => {
    setLoading(true)
    // 仮のAPI送信 or localStorage 保存
    const data = {
      weight,
      bodyFat,
      muscle,
    }
    localStorage.setItem('inbodyData', JSON.stringify(data))

    // 成功演出
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setLoading(false)
      router.push('/home')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-mirror-beige-light p-6 font-sans">
      <h1 className="text-3xl font-serif mb-8">InBody データ入力</h1>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="number"
          placeholder="体重 (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="p-3 rounded-xl bg-mirror-beige-light border border-mirror-beige-medium focus:border-mirror-primary outline-none shadow-mirror-neumorphic"
        />
        <input
          type="number"
          placeholder="体脂肪率 (%)"
          value={bodyFat}
          onChange={(e) => setBodyFat(e.target.value)}
          className="p-3 rounded-xl bg-mirror-beige-light border border-mirror-beige-medium focus:border-mirror-primary outline-none shadow-mirror-neumorphic"
        />
        <input
          type="number"
          placeholder="筋肉量 (kg)"
          value={muscle}
          onChange={(e) => setMuscle(e.target.value)}
          className="p-3 rounded-xl bg-mirror-beige-light border border-mirror-beige-medium focus:border-mirror-primary outline-none shadow-mirror-neumorphic"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-6 px-6 py-3 bg-mirror-primary text-white font-semibold rounded-xl shadow-mirror-neumorphic hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
      >
        {loading ? (
          <div className="flex justify-center items-center">
            {/* Tailwind のシンプルスピナー */}
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
            {/* Lottie を使う場合は下記に置き換え */}
            {/* <Lottie animationData={successSparkles} loop style={{ width: 60, height: 60 }} /> */}
          </div>
        ) : (
          '保存'
        )}
      </button>

      {/* 成功演出 */}
      {showSuccess && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          {/* Lottieを使う場合はこちら */}
          {/* <Lottie animationData={successSparkles} loop autoplay style={{ width: 200, height: 200 }} /> */}
          <div className="p-6 bg-white/50 rounded-3xl shadow-mirror-neumorphic text-xl font-semibold animate-pulse">
            保存しました！
          </div>
        </div>
      )}
    </div>
  )
}
