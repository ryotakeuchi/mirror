'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import clsx from 'clsx';

type Question = {
  id: number;
  text: string;
};

const questions: Question[] = [
  { id: 1, text: 'あなたは朝の時間をどのように過ごしますか？' },
  { id: 2, text: '日々のスキンケアはどのくらい意識していますか？' },
  { id: 3, text: '運動は週に何回行いますか？' },
  { id: 4, text: '睡眠の質に満足していますか？' },
  { id: 5, text: '食生活はバランス良く整っていますか？' },
];

const swipeThreshold = 100; // px

export default function DiagnosisPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [elegantScore, setElegantScore] = useState(0);

  // Motion values for tilt & glow
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const rightGlow = useTransform(x, [0, 200], [0, 1]);
  const leftGlow = useTransform(x, [-200, 0], [1, 0]);

  const handleDragEnd = (event: any, info: { offset: { x: number } }) => {
    const offsetX = info.offset.x;

    if (offsetX > swipeThreshold) {
      setElegantScore(prev => prev + 1);
      nextQuestion();
    } else if (offsetX < -swipeThreshold) {
      nextQuestion();
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      x.set(0); // reset motion
    } else {
      localStorage.setItem('elegantScore', elegantScore.toString());
      router.push('/avatar-generation');
    }
  };

  return (
    <div className="w-screen h-screen relative bg-gradient-to-b from-beige-light to-beige/80 overflow-hidden font-sans">
      {/* 背景ノイズ */}
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />

      {/* プログレスバー */}
      <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200 rounded-full overflow-hidden z-10">
        <motion.div
          className="h-full bg-mirror-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* 質問カードスタック */}
      <div className="w-full h-full flex justify-center items-center px-4 relative">
        {questions.map((q, idx) => {
          if (idx < currentIndex) return null;

          const isTop = idx === currentIndex;
          const scale = idx === currentIndex ? 1 : 0.9;
          const zIndex = 100 - idx;

          return (
            <AnimatePresence key={q.id} mode="popLayout">
              <motion.div
                key={q.id}
                drag={isTop ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={isTop ? handleDragEnd : undefined}
                style={isTop ? { x, rotate } : undefined}
                initial={{ opacity: 0, scale }}
                animate={{ opacity: 1, scale }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={clsx(
                  'absolute w-11/12 max-w-md h-3/4 p-6 rounded-2xl bg-white/20 backdrop-blur-xl shadow-mirror-neumorphic flex flex-col justify-center items-center text-center font-serif text-lg text-gray-800 cursor-grab select-none',
                  isTop && 'z-50',
                  !isTop && 'z-40'
                )}
              >
                {q.text}

                {/* Edge glow */}
                {isTop && (
                  <>
                    <motion.div
                      style={{ opacity: rightGlow }}
                      className="absolute top-0 bottom-0 right-0 w-4 bg-mirror-primary rounded-l-full pointer-events-none"
                    />
                    <motion.div
                      style={{ opacity: leftGlow }}
                      className="absolute top-0 bottom-0 left-0 w-4 bg-mirror-gold-accent rounded-r-full pointer-events-none"
                    />
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
}
