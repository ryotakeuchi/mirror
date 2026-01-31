"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { diagnosisQuestions, calculatePersona } from "@/lib/personas";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function DiagnosisPage() {
  const router = useRouter();
  const { updateDiagnosisAnswer, diagnosisAnswers, setSelectedPersona, setCompletedDiagnosis } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const question = diagnosisQuestions[currentStep];
  const progress = ((currentStep + 1) / diagnosisQuestions.length) * 100;

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    updateDiagnosisAnswer(question.category, value);
    
    setTimeout(() => {
      if (currentStep < diagnosisQuestions.length - 1) {
        setCurrentStep(currentStep + 1);
        setSelectedOption(null);
        setDragX(0);
      } else {
        // Calculate persona and navigate
        const updatedAnswers = {
          ...diagnosisAnswers,
          [question.category]: value,
        };
        const persona = calculatePersona(updatedAnswers);
        if (persona) {
          setSelectedPersona(persona);
          setCompletedDiagnosis(true);
          router.push("/avatar-generation");
        }
      }
    }, 500);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      if (info.offset.x > 0 && currentStep > 0) {
        setCurrentStep(currentStep - 1);
        setSelectedOption(null);
        setDragX(0);
      }
    } else {
      setDragX(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base via-white to-base flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-charcoal/60 mb-2">
            <span>質問 {currentStep + 1} / {diagnosisQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-charcoal/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-charcoal rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDrag={(_, info) => setDragX(info.offset.x)}
          onDragEnd={handleDragEnd}
          animate={{ x: dragX }}
          className="relative"
        >
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="glass rounded-3xl p-8 soft-shadow"
          >
            <h2 className="text-2xl font-serif font-bold mb-8 text-charcoal text-center">
              {question.question}
            </h2>

            <div className="space-y-4">
              <motion.button
                onClick={() => handleSelect(question.optionA.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-2xl text-left transition-all ${
                  selectedOption === question.optionA.value
                    ? "bg-charcoal text-white"
                    : "bg-white/50 text-charcoal hover:bg-white/70"
                } soft-shadow`}
              >
                {question.optionA.text}
              </motion.button>

              <motion.button
                onClick={() => handleSelect(question.optionB.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-2xl text-left transition-all ${
                  selectedOption === question.optionB.value
                    ? "bg-charcoal text-white"
                    : "bg-white/50 text-charcoal hover:bg-white/70"
                } soft-shadow`}
              >
                {question.optionB.text}
              </motion.button>

              {question.optionC && (
                <motion.button
                  onClick={() => handleSelect(question.optionC.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-2xl text-left transition-all ${
                    selectedOption === question.optionC.value
                      ? "bg-charcoal text-white"
                      : "bg-white/50 text-charcoal hover:bg-white/70"
                  } soft-shadow`}
                >
                  {question.optionC.text}
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => {
              if (currentStep > 0) {
                setCurrentStep(currentStep - 1);
                setSelectedOption(null);
                setDragX(0);
              }
            }}
            disabled={currentStep === 0}
            className="flex items-center gap-2 text-charcoal/60 disabled:opacity-30"
          >
            <ArrowLeft className="w-5 h-5" />
            戻る
          </button>
        </div>
      </div>
    </div>
  );
}
