"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "おはよう、麻美さん。",
  "今日の調子はどう？",
  "無理しなくていいからね。",
];

export default function HomePage() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isMorning, setIsMorning] = useState(true);

  /* ------------------------------
   * 時間帯判定（朝 / 夜）
   * ------------------------------ */
  useEffect(() => {
    const hour = new Date().getHours();
    setIsMorning(hour >= 5 && hour < 18);
  }, []);

  /* ------------------------------
   * メッセージ自動切り替え
   * ------------------------------ */
  useEffect(() => {
    if (messageIndex >= messages.length - 1) return;

    const timer = setTimeout(() => {
      setMessageIndex((prev) => prev + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [messageIndex]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 背景画像（時間帯で切り替え） */}
      <div className="absolute inset-0">
        <img
          src={
            isMorning
              ? "/bg-room-morning.jpg"
              : "/bg-room-night.jpg"
          }
          alt="Room background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* メインレイアウト */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-6 py-10">
        {/* 上部：アバター */}
        <div className="flex w-full max-w-md items-center justify-between">
          {/* AIメンター */}
          <div className="flex flex-col items-center">
            <img
              src="/avatar-mentor.png"
              alt="AI Mentor"
              className="h-20 w-20 rounded-full border-2 border-white/60 shadow-lg"
            />
            <span className="mt-2 text-xs text-white/80">
              麻美
            </span>
          </div>

          {/* ユーザー */}
          <div className="flex flex-col items-center">
            <img
              src="/avatar-user.png"
              alt="User"
              className="h-20 w-20 rounded-full border-2 border-white/60 shadow-lg"
            />
            <span className="mt-2 text-xs text-white/80">
              You
            </span>
          </div>
        </div>

        {/* 中央：メッセージ */}
        <div className="mt-10 flex flex-1 items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="max-w-sm text-center font-serif text-2xl leading-relaxed text-white"
            >
              {messages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* 下部：気分選択カード */}
        <div className="w-full max-w-md pb-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "😊 いい感じ" },
              { label: "😐 ふつう" },
              { label: "😔 ちょっと疲れた" },
            ].map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-2xl
                  border border-white/30
                  bg-white/30 px-3 py-4
                  text-sm text-white
                  shadow-lg backdrop-blur-lg
                  transition hover:bg-white/40"
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
