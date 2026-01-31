"use client";

import { motion } from "framer-motion";

export default function HealthSyncPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-mirror-secondary px-6 py-10">
      {/* 背景（抽象グラデーション：白 × ベージュ） */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-white/70 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-mirror-primary/40 blur-3xl" />
      </div>

      {/* 中央コンテンツ */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        {/* メッセージ */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 max-w-sm font-serif text-2xl leading-relaxed text-mirror-tertiary"
        >
          あなたの健康データが、
          <br />
          未来の美しさを創る鍵です
        </motion.p>

        {/* 画像エリア（仮：抽象グラデーション） */}
        <div
          className="h-56 w-56 rounded-3xl
            bg-gradient-to-br from-white via-mirror-secondary to-mirror-primary/40
            shadow-inner"
        />
      </div>

      {/* 下部：同期ボタン */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative z-10 w-full max-w-md pb-4"
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            console.log("同期開始（ダミー）");
          }}
          className="
            w-full rounded-full
            bg-white/20 px-8 py-4
            font-sans text-lg font-medium text-mirror-tertiary
            shadow-lg backdrop-blur-lg
            transition hover:bg-white/30
          "
        >
          ヘルスケアと同期する
        </motion.button>
      </motion.div>
    </div>
  );
}
