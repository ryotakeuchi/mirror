"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------
 * ダミー質問（5問想定）
 * ------------------------------ */
const questions = [
  "最近、十分な睡眠が取れていますか？",
  "日常的に体を動かしていますか？",
  "食事のバランスに満足していますか？",
  "ストレスを感じることは多いですか？",
  "自分の体調を意識する時間はありますか？",
];

/* 背景グラデーション（ベージュ系・微差） */
const backgrounds = [
  "from-mirror-secondary to-white",
  "from-mirror-secondary/80 to-white",
  "from-white to-mirror-secondary/80",
  "from-mirror-secondary/70 to-white",
  "from-white to-mirror-secondary/60",
];

export default function DiagnosisPage() {
  const [index, setIndex] = useState(0);

  const total = questions.length;
  const progress = ((index + 1) / total) * 100;

  const handleAnswer = () => {
    if (index < total - 1) {
      setIndex((prev) => prev + 1);
    } else {
      console.log("診断完了（ダミー）");
    }
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`min-h-screen bg-gradient-to-br ${backgrounds[index]} px-6 py-10 font-sans`}
    >
      {/* ==============================
          プログレスバー
         ============================== */}
      <div className="mx-auto mb-10 max-w-xl">
        <div className="mb-3 flex justify-between text-xs text-mirror-tertiary/70">
          <span>
            質問 {index + 1} / {total}
          </span>
          <span>残り {total - index - 1}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-mirror-tertiary/10">
          <motion.div
            className="h-full rounded-full bg-mirror-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* ==============================
          質問カード
         ============================== */}
      <div className="mx-auto flex max-w-xl items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={questions[index]}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="
              w-full rounded-3xl
              border border-white/30
              bg-white/40 p-8
              shadow-xl backdrop-blur-xl
            "
          >
            {/* 質問文 */}
            <p className="mb-10 text-center text-xl font-semibold leading-relaxed text-mirror-tertiary">
              {questions[index]}
            </p>

            {/* 選択肢 */}
            <div className="grid grid-cols-2 gap-4">
              {["はい", "いいえ"].map((label) => (
                <motion.button
                  key={label}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAnswer}
                  className="
                    rounded-2xl
                    border border-white/40
                    bg-white/50 px-4 py-6
                    text-base font-medium text-mirror-tertiary
                    shadow-md backdrop-blur-lg
                    transition
                    hover:bg-white/70 hover:shadow-lg
                  "
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
