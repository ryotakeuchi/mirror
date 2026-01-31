'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HealthScanPage() {
  const [image, setImage] = useState<string | null>(null)

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-mirror-beige-light">
      <div
        className="
          w-full max-w-lg p-8 rounded-3xl
          bg-white/40 backdrop-blur-xl
          shadow-mirror-neumorphic
        "
      >
        <h1 className="text-xl font-semibold text-center mb-8">
          ヘルススキャン解析結果
        </h1>

        {/* ===== 解析結果フォーム ===== */}
        <div className="space-y-6">
          {/* 年齢 */}
          <div>
            <label className="block text-sm mb-2 opacity-70">
              年齢
            </label>
            <input
              type="number"
              placeholder="例：32"
              className="
                w-full px-4 py-3 rounded-xl
                bg-mirror-beige-light
                border border-mirror-beige-medium
                focus:border-mirror-primary
                focus:ring-1 focus:ring-mirror-primary
                outline-none transition
              "
            />
          </div>

          {/* 睡眠時間 */}
          <div>
            <label className="block text-sm mb-2 opacity-70">
              平均睡眠時間（時間）
            </label>
            <input
              type="number"
              placeholder="例：6.5"
              className="
                w-full px-4 py-3 rounded-xl
                bg-mirror-beige-light
                border border-mirror-beige-medium
                focus:border-mirror-primary
                focus:ring-1 focus:ring-mirror-primary
                outline-none transition
              "
            />
          </div>

          {/* 自由記述 */}
          <div>
            <label className="block text-sm mb-2 opacity-70">
              気になる点
            </label>
            <textarea
              placeholder="肌・体調・生活習慣など"
              rows={4}
              className="
                w-full px-4 py-3 rounded-xl
                bg-mirror-beige-light
                border border-mirror-beige-medium
                focus:border-mirror-primary
                focus:ring-1 focus:ring-mirror-primary
                outline-none transition resize-none
              "
            />
          </div>
        </div>

        {/* ===== 画像アップロード ===== */}
        <div className="mt-10">
          <label className="block text-sm mb-3 opacity-70">
            画像アップロード（任意）
          </label>

          <label
            className="
              relative block w-full h-40
              border-2 border-dashed border-mirror-beige-medium
              rounded-2xl cursor-pointer
              bg-white/20 backdrop-blur-md
              hover:border-mirror-primary transition
              flex items-center justify-center text-sm opacity-70
            "
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                if (e.target.files?.[0]) {
                  handleImageUpload(e.target.files[0])
                }
              }}
            />
            画像を選択またはドラッグ
          </label>

          {/* プレビュー */}
          <AnimatePresence>
            {image && (
              <motion.img
                src={image}
                alt="preview"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="
                  mt-4 w-full h-48 object-cover
                  rounded-2xl shadow-mirror-neumorphic
                "
              />
            )}
          </AnimatePresence>
        </div>

        {/* ===== 保存ボタン ===== */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="
            mt-10 w-full py-4 rounded-2xl
            bg-mirror-primary text-white font-semibold
            shadow-mirror-neumorphic
          "
        >
          保存
        </motion.button>
      </div>
    </div>
  )
}
