'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Persona, personas } from '@/lib/personas';
import AvatarDisplay from '@/components/AvatarDisplay';
import MoodSelector from '@/components/MoodSelector';
import Lottie from 'lottie-react';
import loadingSpinner from '../../../public/lottie/loading_spinner.json';

export default function HomePage() {
  const router = useRouter();
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiExpression, setAiExpression] = useState<'normal' | 'happy' | 'concerned' | 'serious'>('normal');

  // localStorageからselectedModelIdを取得
  useEffect(() => {
    const id = localStorage.getItem('selectedModelId');
    const persona = personas.find((p) => p.id === id) ?? personas[0];
    setSelectedPersona(persona);
  }, []);

  // 時間帯取得
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  // AIメッセージに基づき表情マッピング
  const mapExpression = (text: string): 'normal' | 'happy' | 'concerned' | 'serious' => {
    if (text.includes('お疲れ')) return 'concerned';
    if (text.includes('素晴らしい')) return 'happy';
    if (text.includes('頑張って')) return 'serious';
    return 'normal';
  };

  const handleMoodSelect = async (mood: string) => {
    if (!selectedPersona) return;
    setLoading(true);
    setCurrentMessage('');

    const message = `現在の時間帯：${getTimeOfDay()}。ユーザーの状態：${mood}。これに寄り添う言葉と1分でできるアクションを提案してください。`;

    try {
      const { sendMessageToDify } = await import('@/lib/api');
      await sendMessageToDify({
        message,
        personaInstruction: selectedPersona.systemPrompt,
        onStream: (partial) => {
          setCurrentMessage((prev) => prev + partial);
          setAiExpression(mapExpression(partial));
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedPersona) return null;

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start bg-${selectedPersona.themeColors.background} font-sans transition-colors duration-700`}
    >
      <AvatarDisplay
        persona={selectedPersona}
        aiExpression={aiExpression}
        userExpression="normal"
      />

      {/* メッセージ吹き出し */}
      <div className="mt-8 p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-mirror-neumorphic w-80 min-h-[80px] text-center text-lg">
        {loading ? (
          <Lottie animationData={loadingSpinner} loop autoplay style={{ width: 60, height: 60, margin: '0 auto' }} />
        ) : (
          currentMessage
        )}
      </div>

      {/* 気分選択カード */}
      <MoodSelector onSelect={handleMoodSelect} disabled={loading} />
    </div>
  );
}
