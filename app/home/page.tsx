"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { MessageCircle } from "lucide-react";
import AvatarDisplay from "@/components/AvatarDisplay";
import { SparkleLoading, SparkleComplete } from "@/components/LottieAnimation";
import { sendMessageToDify } from "@/lib/api";
import { TimeOfDay, Mood } from "@/lib/personas";

export default function HomePage() {
  const router = useRouter();
  const { selectedPersona } = useApp();
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("morning");
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [apiResponse, setApiResponse] = useState<string>("");

  useEffect(() => {
    if (!selectedPersona) {
      router.push("/diagnosis");
      return;
    }

    // Determine time of day
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      setTimeOfDay("morning");
    } else if (hour >= 12 && hour < 18) {
      setTimeOfDay("afternoon");
    } else {
      setTimeOfDay("night");
    }

    // Typewriter effect for welcome message
    const welcomeMessage = `${selectedPersona.name}です。${selectedPersona.tone} よろしくお願いします。`;
    setIsTyping(true);
    let index = 0;
    const typeMessage = () => {
      if (index < welcomeMessage.length) {
        setMessage(welcomeMessage.slice(0, index + 1));
        index++;
        setTimeout(typeMessage, 50);
      } else {
        setIsTyping(false);
      }
    };
    typeMessage();
  }, [selectedPersona, router]);

  if (!selectedPersona) return null;

  const handleMoodClick = async (moodId: Mood) => {
    setIsLoading(true);
    setShowComplete(false);
    setApiResponse("");

    try {
      // ペルソナのsystemPromptと気分を組み合わせたメッセージを作成
      const moodMessages: Record<Mood, string> = {
        tired: "疲れ気味です。",
        motivated: "やる気があります！",
        relax: "リラックスしたいです。",
        focused: "集中したいです。",
        stressed: "ストレスを感じています。",
        energetic: "エネルギッシュです！",
      };

      const userMessage = `${moodMessages[moodId]} この気分に合わせたアドバイスをお願いします。`;
      
      // Dify APIを呼び出す（ペルソナ情報を渡す）
      const response = await sendMessageToDify(userMessage, selectedPersona);

      if (response.success && response.data?.answer) {
        setApiResponse(response.data.answer);
        setShowComplete(true);
        setTimeout(() => {
          setShowComplete(false);
          router.push(`/result?mood=${moodId}&response=${encodeURIComponent(response.data.answer)}`);
        }, 2000);
      } else {
        // APIエラーの場合でも結果ページに遷移
        setApiResponse(response.error || "アドバイスを生成しました。");
        setShowComplete(true);
        setTimeout(() => {
          setShowComplete(false);
          router.push(`/result?mood=${moodId}`);
        }, 2000);
      }
    } catch (error) {
      console.error("Error calling Dify API:", error);
      setApiResponse("エラーが発生しました。");
      setIsLoading(false);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: timeOfDay === "morning"
          ? "linear-gradient(135deg, #FFE5B4 0%, #FFD89B 50%, #F5F5F0 100%)"
          : "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {timeOfDay === "morning" ? (
          <>
            <motion.div
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-20 left-10 w-32 h-32 rounded-full bg-yellow-200/30 blur-3xl"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-orange-200/20 blur-3xl"
            />
          </>
        ) : (
          <>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl"
            />
          </>
        )}
      </div>

      <div className="relative z-10 p-6 pt-12 max-w-4xl mx-auto">
        {/* Avatars - Left: AI Mentor, Right: User */}
        <div className="flex items-center justify-between mb-8">
          {/* AI Mentor Avatar (Left) */}
          <div className="flex flex-col items-center gap-3">
            <AvatarDisplay
              persona={selectedPersona}
              size="lg"
              showStatus={true}
              statusColor="bg-green-400"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-sm font-semibold ${
                timeOfDay === "morning" ? "text-charcoal" : "text-white"
              }`}
            >
              {selectedPersona.name}
            </motion.p>
          </div>

          {/* Mood Cards (Center) */}
          <div className="flex-1 flex flex-col items-center gap-4 mx-8">
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mb-4"
                >
                  <SparkleLoading />
                </motion.div>
              )}
              {showComplete && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="mb-4"
                >
                  <SparkleComplete />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              {(["tired", "motivated", "relax", "focused"] as Mood[]).map((mood, index) => {
                const moodData = {
                  tired: { label: "疲れた", emoji: "😴" },
                  motivated: { label: "やる気", emoji: "💪" },
                  relax: { label: "リラックス", emoji: "🧘" },
                  focused: { label: "集中", emoji: "🎯" },
                }[mood];

                return (
                  <motion.button
                    key={mood}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMoodClick(mood)}
                    disabled={isLoading}
                    className={`glass rounded-2xl p-4 soft-shadow flex flex-col items-center gap-2 hover:bg-white/40 transition-colors ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <span className="text-2xl">{moodData.emoji}</span>
                    <span
                      className={`text-sm font-semibold ${
                        timeOfDay === "morning" ? "text-charcoal" : "text-white"
                      }`}
                    >
                      {moodData.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* User Avatar (Right) */}
          <div className="flex flex-col items-center gap-3">
            <AvatarDisplay
              isUser={true}
              size="lg"
              showStatus={true}
              statusColor="bg-blue-400"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-sm font-semibold ${
                timeOfDay === "morning" ? "text-charcoal" : "text-white"
              }`}
            >
              あなた
            </motion.p>
          </div>
        </div>

        {/* Speech Bubble */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-3xl p-6 soft-shadow max-w-2xl mx-auto"
        >
          <div className="flex items-start gap-3">
            <MessageCircle
              className="w-6 h-6 flex-shrink-0 mt-1"
              style={{ color: selectedPersona.theme.primary }}
            />
            <div className="flex-1">
              {apiResponse ? (
                <p
                  className={`text-base leading-relaxed ${
                    timeOfDay === "morning" ? "text-charcoal" : "text-white"
                  }`}
                >
                  {apiResponse}
                </p>
              ) : (
                <p
                  className={`text-base leading-relaxed ${
                    timeOfDay === "morning" ? "text-charcoal" : "text-white"
                  }`}
                >
                  {message}
                  {isTyping && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="ml-1"
                    >
                      |
                    </motion.span>
                  )}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
