"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

/* ==============================
 * ダミー質問（5問）
 * ============================== */
const questions = [
  {
    id: 1,
    text: "最近の体調はどうですか？",
    left: "とても良い",
    right: "少し疲れ気味",
  },
  {
    id: 2,
    text: "運動習慣はありますか？",
    left: "週に数回",
    right: "ほとんどない",
  },
  {
    id: 3,
    text: "睡眠の質はどう感じますか？",
    left: "よく眠れている",
    right: "浅い気がする",
  },
  {
    id: 4,
    text: "食生活は整っていますか？",
    left: "バランス良い",
    right: "乱れがち",
  },
  {
    id: 5,
    text: "今いちばん改善したいのは？",
    left: "体型・姿勢",
    right: "肌・透明感",
  },
];

/* ==============================
 * Persona themeColors のダミー
 * ============================== */
const backgroundColors = [
  "#F5F5F0",
  "#E5DED4",
  "#D2B48C",
  "#CFC6B8",
  "#B8B0A2",
];

/* ==============================
 * 既存の modelId 計算ロジック（仮）
 * ※ 実際は既存ロジックに置き換える
 * ============================== */
const getSelectedModelId = (): string => {
  // ダミー例
  return "asami";
};

export default function DiagnosisPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  const progress = ((current + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    console.log(
      `Q${questions[current].id} 回答: ${answer}`
    );

    // 最終質問でなければ次へ
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
      return;
    }

    /* ==============================
     * 診断完了処理
     * ============================== */
    const selectedModelId = getSelectedModelId();

    // localStorage に保存
    localStorage.setItem(
      "selectedModelId",
      selectedModelId
    );

    console.log(
      "診断完了 / selectedModelId:",
      selectedModelId
    );

    // avatar-generation へ遷移
    router.push("/avatar-generation");
  };

  return (
    <motion.div
      className="relative min-h-screen px-6 pt-8 font-sans"
      animate={{
        backgroundColor:
          backgroundColors[current % backgroundColors.length],
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* ==============================
          プログレスバー
      ============================== */}
      <div className="mx-auto mb-10 max-w-md">
        <div className="mb-2 flex justify-between text-xs text-mirror-charcoal/60">
          <span>
            質問 {current + 1} / {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/40 backdrop-blur">
          <motion.div
            className="h-2 rounded-full bg-mirror-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* ==============================
          質問カード
      ============================== */}
      <div className="mx-auto flex max-w-md items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={questions[current].id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full rounded-3xl bg-white/30 p-8 shadow-xl backdrop-blur-lg"
          >
            {/* 質問文 */}
            <p className="mb-10 text-center text-lg font-semibold text-mirror-charcoal">
              {questions[current].text}
            </p>

            {/* 選択肢 */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  handleAnswer(
                    questions[current].left
                  )
                }
                className="flex-1 rounded-2xl bg-white/40 px-4 py-6 text-mirror-charcoal shadow-md backdrop-blur-lg"
              >
                {questions[current].left}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  handleAnswer(
                    questions[current].right
                  )
                }
                className="flex-1 rounded-2xl bg-white/40 px-4 py-6 text-mirror-charcoal shadow-md backdrop-blur-lg"
              >
                {questions[current].right}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
