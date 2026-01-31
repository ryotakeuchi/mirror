'use client'

import { motion } from 'framer-motion'

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-mirror-beige-light text-mirror-charcoal font-sans flex justify-center px-6 py-16">
      <div className="w-full max-w-3xl space-y-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3"
        >
          <h1 className="text-3xl md:text-4xl font-serif tracking-wide">
            Weekly Beauty Report
          </h1>
          <p className="text-sm text-mirror-charcoal/70">
            あなたの1週間を、美しさの視点で振り返ります
          </p>
        </motion.header>

        {/* Infographic Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Sleep */}
          <div className="relative rounded-2xl bg-white/40 backdrop-blur-lg shadow-sm p-6 space-y-4">
            <span className="text-xs tracking-widest text-mirror-charcoal/60">
              SLEEP
            </span>
            <p className="text-5xl font-serif">7.0</p>
            <p className="text-sm text-mirror-charcoal/70">
              平均睡眠時間（時間）
            </p>
            <div className="absolute bottom-4 right-4 text-xs text-mirror-charcoal/40">
              安定しています
            </div>
          </div>

          {/* Skin */}
          <div className="relative rounded-2xl bg-white/40 backdrop-blur-lg shadow-sm p-6 space-y-4">
            <span className="text-xs tracking-widest text-mirror-charcoal/60">
              SKIN
            </span>
            <p className="text-5xl font-serif">+5%</p>
            <p className="text-sm text-mirror-charcoal/70">
              肌の水分量の変化
            </p>
            <div className="absolute bottom-4 right-4 text-xs text-mirror-charcoal/40">
              改善傾向
            </div>
          </div>

          {/* Body */}
          <div className="relative rounded-2xl bg-white/40 backdrop-blur-lg shadow-sm p-6 space-y-4 md:col-span-2">
            <span className="text-xs tracking-widest text-mirror-charcoal/60">
              BODY BALANCE
            </span>
            <div className="flex items-end gap-3 h-24">
              <div className="w-6 bg-mirror-beige h-20 rounded-full" />
              <div className="w-6 bg-mirror-beige-dark h-24 rounded-full" />
              <div className="w-6 bg-mirror-beige h-16 rounded-full" />
              <div className="w-6 bg-mirror-beige-light h-18 rounded-full" />
            </div>
            <p className="text-sm text-mirror-charcoal/70">
              体のバランスは安定。無理のない継続ができています。
            </p>
          </div>
        </motion.section>

        {/* AI Mentor Comment */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="rounded-3xl bg-white/30 backdrop-blur-xl shadow-md p-8 space-y-4"
        >
          <span className="text-xs tracking-widest text-mirror-charcoal/60">
            AI MENTOR COMMENT
          </span>
          <p className="font-serif text-lg leading-relaxed">
            今週はとても美しいリズムで過ごせていますね。
            <br />
            睡眠が安定していることで、肌の水分保持力がしっかり回復しています。
            <br />
            この「余白のある生活」を、来週も大切にしていきましょう。
          </p>
          <p className="text-right text-sm text-mirror-charcoal/60">
            — Asami
          </p>
        </motion.section>
      </div>
    </div>
  )
}
