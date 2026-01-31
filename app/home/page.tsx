'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Persona, personas } from '@/lib/personas';
import AvatarDisplay, { AvatarExpression } from '@/components/AvatarDisplay';
import Lottie from 'lottie-react';
import loadingSpinner from '../../public/lottie/loading_spinner.json';
import auraGlow from '../../public/lottie/aura_glow.json';

export default function HomePage() {
  const router = useRouter();
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [currentMessage, setCurrentMessage] = useState('こんにちは！今日の気分はどうですか？');
  const [loading, setLoading] = useState(false);
  const [aiExpression, setAiExpression] = useState<AvatarExpression>('neutral');
  const [userExpression, setUserExpression] = useState<AvatarExpression>('neutral');

  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');

  useEffect(() => {
    const storedId = localStorage.getItem('selectedModelId');
    const selectedId = storedId || 'asami';

    const foundPersona = personas.find((p) => p.id === selectedId);
    if (foundPersona) {
      setSelectedPersona(foundPersona);
    } else {
      const defaultPersona = personas.find((p) => p.id === 'asami') || personas[0];
      setSelectedPersona(defaultPersona);
    }

    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 18) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
  }, []);

  if (!selectedPersona) return <div>Loading...</div>;

  // 気分カードクリック時
  const handleMoodSelect = async (moodText: string) => {
    setLoading(true);
    setCurrentMessage('...');
    try {
      // Dify API 呼び出し想定
      // const response = await sendMessageToDify({
      //   message: `現在の時間帯：${timeOfDay}。ユーザーの状態：${moodText}。寄り添う言葉とアクションを提案してください。`,
      //   personaInstruction: selectedPersona.systemPrompt,
      //   onStream: (partial) => {
      //     setCurrentMessage((prev) => prev + partial);

      //     // 表情判定
      //     if (/素晴らしい|いいですね/.test(partial)) setAiExpression('smile');
      //     else if (/お疲れ/.test(partial)) setAiExpression('concerned');
      //     else setAiExpression('neutral');
      //   },
      // });

      // 仮のダミー応答
      await new Promise((r) => setTimeout(r, 1000));
      setCurrentMessage(`AIからの応答: "${moodText}に寄り添う提案です。"`);
      if (moodText.includes('疲')) setAiExpression('concerned');
      else setAiExpression('smile');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-mirror-beige-light p-6 font-sans">
      {/* 背景画像 */}
      <div className="absolute inset-0">
        <img
          src={`/images/room_${timeOfDay}.jpg`}
          alt="room background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* 中央アバター */}
      <div className="relative z-10 mt-16 flex flex-col items-center">
        <div className="relative">
          {/* オーラ */}
          <Lottie
            animationData={auraGlow}
            loop
            autoplay
            style={{ width: 180, height: 180, position: 'absolute', top: -30, left: -30, opacity: 0.2 }}
          />
          <AvatarDisplay
            persona={selectedPersona}
            aiExpression={aiExpression} // 'smile'/'concerned'/'neutral'など
            userExpression={userExpression}
            className="w-36 h-36"
          />
        </div>

        {/* メッセージ吹き出し */}
        <div className="mt-4 p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-mirror-neumorphic max-w-xs text-center">
          {currentMessage}
        </div>
      </div>

      {/* 気分選択カード */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 z-10">
        {['🌿 少しお疲れ気味', '✨ 自分を磨きたい', '🕯️ 静かに過ごしたい'].map((mood) => (
          <button
            key={mood}
            onClick={() => handleMoodSelect(mood)}
            disabled={loading}
            className="flex items-center justify-center p-4 bg-white/20 backdrop-blur-md rounded-xl shadow-mirror-neumorphic hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 text-mirror-primary font-semibold"
          >
            {loading ? (
              <Lottie
                animationData={loadingSpinner}
                loop
                autoplay
                style={{ width: 40, height: 40 }}
              />
            ) : (
              mood
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
