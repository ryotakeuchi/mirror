'use client';
import { motion } from 'framer-motion';

interface Props {
  onSelect: (mood: string) => void;
  disabled?: boolean;
}

const moods = [
  { emoji: '🌿', label: '少しお疲れ気味' },
  { emoji: '✨', label: '自分を磨きたい' },
  { emoji: '🕯️', label: '静かに過ごしたい' },
];

export default function MoodSelector({ onSelect, disabled }: Props) {
  return (
    <div className="flex justify-around mt-8 w-full max-w-md">
      {moods.map((m) => (
        <motion.button
          key={m.label}
          whileTap={{ scale: 0.95 }}
          disabled={disabled}
          className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-md shadow-mirror-neumorphic p-4 rounded-xl w-28 h-28 text-center"
          onClick={() => onSelect(m.label)}
        >
          <span className="text-3xl">{m.emoji}</span>
          <span className="mt-2 font-semibold">{m.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
