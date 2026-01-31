// app/report/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AvatarDisplay from "@/components/AvatarDisplay";
import { Persona } from "@/lib/personas";

type ReportData = {
  label: string;
  value: string;
  icon: string; // Emoji など
};

export default function ReportPage() {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [aiExpression, setAiExpression] = useState<
    "neutral" | "smile" | "tired" | "serious" | "concerned"
  >("neutral");

  // ダミーのレポートデータ
  const reportData: ReportData[] = [
    { label: "睡眠時間", value: "平均7時間", icon: "🛌" },
    { label: "肌の水分量", value: "5%改善", icon: "💧" },
    { label: "体脂肪率", value: "0.5%減少", icon: "⚡" },
  ];

  useEffect(() => {
    // localStorage から selectedModelId を取得
    const modelId = localStorage.getItem("selectedModelId") || "asami";
    import("@/lib/personas").then((mod) => {
      const persona = mod.personas.find((p) => p.id === modelId);
      if (persona) setSelectedPersona(persona);
    });
  }, []);

  if (!selectedPersona) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-mirror-beige-light to-white p-6 md:p-12">
      {/* ページ上部：AIメッセージ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <h1 className="text-2xl md:text-4xl font-serif text-mirror-charcoal mb-2">
          {selectedPersona.name} からのメッセージ
        </h1>
        <p className="text-lg md:text-xl text-mirror-charcoal/80">
          今週も美しさを育む努力、お疲れ様でした。
        </p>
      </motion.div>

      {/* レポートデータ */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {reportData.map((data, idx) => (
          <motion.div
            key={data.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.3, duration: 0.6 }}
            className="flex flex-col items-center justify-center p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-mirror-neumorphic"
          >
            <div className="text-4xl mb-4">{data.icon}</div>
            <div className="text-lg font-semibold">{data.label}</div>
            <div className="text-2xl md:text-3xl font-bold text-mirror-primary mt-1">
              {data.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* AIメンターコメント */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reportData.length * 0.3, duration: 0.6 }}
        className="flex flex-col md:flex-row items-center justify-center gap-6"
      >
        <AvatarDisplay
          persona={selectedPersona}
          aiExpression={aiExpression}
          userAvatarImage=""
          userExpression="neutral"
        />
        <div className="p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-mirror-neumorphic max-w-xl text-center md:text-left">
          <p className="text-lg md:text-xl text-mirror-charcoal">
            素晴らしい進捗ですね！特に肌の水分量が改善しているのは、毎日のケアの成果です。
            この調子で、次週も無理なく続けていきましょう。
          </p>
        </div>
      </motion.div>
    </div>
  );
}
