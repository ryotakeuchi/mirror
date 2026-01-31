"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { Activity, Moon, Check } from "lucide-react";

export default function HealthSyncPage() {
  const router = useRouter();
  const { setOnboarded } = useApp();
  const [permissions, setPermissions] = useState({
    steps: false,
    sleep: false,
  });

  const handleToggle = (key: "steps" | "sleep") => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleContinue = () => {
    setOnboarded(true);
    router.push("/diagnosis");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base via-white to-base flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold mb-4 text-charcoal">
            ヘルスケアデータの連携
          </h1>
          <p className="text-lg text-charcoal/70">
            Mirrorがあなたの健康データにアクセスして、パーソナライズされたアドバイスを提供します。
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glass rounded-2xl p-6 soft-shadow cursor-pointer"
            onClick={() => handleToggle("steps")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-charcoal/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-charcoal" />
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal">歩数データ</h3>
                  <p className="text-sm text-charcoal/60">Apple Health / Google Fit</p>
                </div>
              </div>
              <motion.div
                className={`w-12 h-6 rounded-full p-1 ${
                  permissions.steps ? "bg-charcoal" : "bg-charcoal/20"
                }`}
                animate={{
                  backgroundColor: permissions.steps
                    ? "rgba(74, 74, 74, 1)"
                    : "rgba(74, 74, 74, 0.2)",
                }}
              >
                <motion.div
                  className="w-4 h-4 bg-white rounded-full"
                  animate={{
                    x: permissions.steps ? 24 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glass rounded-2xl p-6 soft-shadow cursor-pointer"
            onClick={() => handleToggle("sleep")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-charcoal/10 flex items-center justify-center">
                  <Moon className="w-6 h-6 text-charcoal" />
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal">睡眠データ</h3>
                  <p className="text-sm text-charcoal/60">Apple Health / Google Fit</p>
                </div>
              </div>
              <motion.div
                className={`w-12 h-6 rounded-full p-1 ${
                  permissions.sleep ? "bg-charcoal" : "bg-charcoal/20"
                }`}
                animate={{
                  backgroundColor: permissions.sleep
                    ? "rgba(74, 74, 74, 1)"
                    : "rgba(74, 74, 74, 0.2)",
                }}
              >
                <motion.div
                  className="w-4 h-4 bg-white rounded-full"
                  animate={{
                    x: permissions.sleep ? 24 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.button
          onClick={handleContinue}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 px-6 rounded-full bg-charcoal text-white font-semibold soft-shadow flex items-center justify-center gap-2"
        >
          続ける
          <Check className="w-5 h-5" />
        </motion.button>

        <button
          onClick={handleContinue}
          className="w-full mt-4 py-3 text-charcoal/60 hover:text-charcoal transition-colors"
        >
          後で設定
        </button>
      </motion.div>
    </div>
  );
}
