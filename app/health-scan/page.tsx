'use client';

import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';

export default function HealthScanPage() {
  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [muscle, setMuscle] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setSaving(true);
    const data = {
      weight: parseFloat(weight),
      bodyFat: parseFloat(bodyFat),
      muscle: parseFloat(muscle),
    };
    localStorage.setItem('inbodyData', JSON.stringify(data));

    // 成功アニメーション
    await new Promise(resolve => setTimeout(resolve, 1500));
    <Lottie
  animationData={loadingSpinner}
  loop
  autoplay
  style={{ width: 60, height: 60, margin: '0 auto' }}
/>


    setSaving(false);
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mirror-beige-light to-mirror-beige-medium p-8 font-sans flex flex-col items-center">
      <h1 className="font-serif text-4xl mb-6">ヘルスデータを入力</h1>

      <div className="flex flex-col gap-4 w-80">
        <input
          type="number"
          placeholder="体重 (kg)"
          value={weight}
          onChange={e => setWeight(e.target.value)}
          className="p-3 rounded-xl bg-mirror-beige-light border border-mirror-beige-medium focus:border-mirror-primary"
        />
        <input
          type="number"
          placeholder="体脂肪率 (%)"
          value={bodyFat}
          onChange={e => setBodyFat(e.target.value)}
          className="p-3 rounded-xl bg-mirror-beige-light border border-mirror-beige-medium focus:border-mirror-primary"
        />
        <input
          type="number"
          placeholder="筋肉量 (kg)"
          value={muscle}
          onChange={e => setMuscle(e.target.value)}
          className="p-3 rounded-xl bg-mirror-beige-light border border-mirror-beige-medium focus:border-mirror-primary"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-8 p-4 w-64 bg-mirror-primary rounded-2xl shadow-mirror-neumorphic text-white font-sans"
      >
        {saving ? (
          <Lottie animationData={require('../../public/lottie/success_sparkles.json')} loop={false} className="w-16 h-16 mx-auto" />
        ) : (
          '保存'
        )}
      </button>
    </div>
  );
}
