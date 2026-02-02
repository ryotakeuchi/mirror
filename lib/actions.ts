// lib/actions.ts

export type ActionData = {
    id: number
    timeSlot: '朝' | '昼' | '夕方' | '夜' | '深夜'
    userStatus: '標準' | '疲れ気味' | 'モチベ高' | 'ストレス'
    title: string
    actionName: string
    logic: string
    steps: string[]
    effect: string
  }
  
  export const actions: ActionData[] = [
    {
      id: 1,
      timeSlot: '朝',
      userStatus: '標準',
      title: '巡りを整える朝の深呼吸',
      actionName: '巡りの深呼吸',
      logic: '朝の呼吸を整えることで自律神経をスムーズに起動させる。',
      steps: [
        '背筋を軽く伸ばす',
        '鼻からゆっくり息を吸う',
        '口から長く吐き切る'
      ],
      effect: 'calm_glow'
    },
    {
      id: 2,
      timeSlot: '朝',
      userStatus: '疲れ気味',
      title: '目覚めを助ける軽いストレッチ',
      actionName: 'モーニングストレッチ',
      logic: '固まった筋肉を動かし血流を促進する。',
      steps: [
        '肩をゆっくり回す',
        '首を左右に倒す',
        '深呼吸しながら伸びる'
      ],
      effect: 'soft_wakeup'
    },
    {
      id: 3,
      timeSlot: '朝',
      userStatus: 'モチベ高',
      title: '集中力を高めるスイッチ呼吸',
      actionName: '集中スイッチ',
      logic: '短時間で脳を覚醒モードに切り替える。',
      steps: [
        '3秒で吸う',
        '3秒止める',
        '3秒で吐く'
      ],
      effect: 'focus_boost'
    },
    {
      id: 4,
      timeSlot: '朝',
      userStatus: 'ストレス',
      title: '不安を流す朝のリセット',
      actionName: '朝リセット',
      logic: '思考を鎮めて安心感を作る。',
      steps: [
        '目を閉じる',
        '呼吸に意識を向ける',
        '今日の安心を一言で思い浮かべる'
      ],
      effect: 'mental_clear'
    },
  
    /* ---------- 昼 ---------- */
  
    {
      id: 5,
      timeSlot: '昼',
      userStatus: '疲れ気味',
      title: '肩甲骨をゆるめるリセット',
      actionName: '肩甲骨リセット',
      logic: 'デスクワーク疲労を短時間で解消する。',
      steps: [
        '肩甲骨を寄せる',
        '5秒キープ',
        'ゆっくり戻す'
      ],
      effect: 'body_release'
    },
    {
      id: 6,
      timeSlot: '昼',
      userStatus: '標準',
      title: '午後に備える呼吸調整',
      actionName: '午後準備呼吸',
      logic: '午後の集中力低下を防ぐ。',
      steps: [
        '姿勢を正す',
        '深呼吸を3回',
        '呼吸のリズムを整える'
      ],
      effect: 'steady_focus'
    },
    {
      id: 7,
      timeSlot: '昼',
      userStatus: 'モチベ高',
      title: 'パフォーマンス最大化ルーティン',
      actionName: 'ブースト呼吸',
      logic: '高い集中をさらに引き上げる。',
      steps: [
        '速く吸う',
        '一瞬止める',
        '強く吐く'
      ],
      effect: 'power_up'
    },
    {
      id: 8,
      timeSlot: '昼',
      userStatus: 'ストレス',
      title: '思考を切り離す1分間',
      actionName: '思考デトックス',
      logic: '頭のノイズを減らす。',
      steps: [
        '目を閉じる',
        '音に集中する',
        '呼吸に戻る'
      ],
      effect: 'noise_cut'
    },
  
    /* ---------- 夕方 ---------- */
  
    {
      id: 9,
      timeSlot: '夕方',
      userStatus: '標準',
      title: '仕事終わりの切り替え',
      actionName: 'オフスイッチ',
      logic: '仕事モードから私生活へ移行する。',
      steps: [
        '深く息を吸う',
        '肩の力を抜く',
        '吐き切る'
      ],
      effect: 'mode_shift'
    },
    {
      id: 10,
      timeSlot: '夕方',
      userStatus: '疲れ気味',
      title: '溜まった疲労を流す',
      actionName: '疲労リリース',
      logic: '心身の緊張を解放する。',
      steps: [
        '首を回す',
        '肩を落とす',
        'ゆっくり呼吸'
      ],
      effect: 'relax_wave'
    },
  
    /* ---------- 夜 ---------- */
  
    {
      id: 11,
      timeSlot: '夜',
      userStatus: 'ストレス',
      title: '感情を静めるナイトルーティン',
      actionName: 'ナイトクールダウン',
      logic: '睡眠前に感情を整える。',
      steps: [
        '照明を落とす',
        '深呼吸',
        '今日を終える意識'
      ],
      effect: 'night_calm'
    },
    {
      id: 12,
      timeSlot: '夜',
      userStatus: '標準',
      title: '1日の終わりの整え',
      actionName: 'デイエンド呼吸',
      logic: '心拍と呼吸を安定させる。',
      steps: [
        '呼吸を数える',
        'ゆっくり吐く',
        '余韻を感じる'
      ],
      effect: 'soft_fade'
    },
  
    /* ---------- 深夜 ---------- */
  
    {
      id: 13,
      timeSlot: '深夜',
      userStatus: 'ストレス',
      title: '眠れない夜の安心誘導',
      actionName: 'スリープガイド',
      logic: '不安を鎮め眠りに入る準備をする。',
      steps: [
        '目を閉じる',
        '呼吸を深く',
        '体の重さを感じる'
      ],
      effect: 'sleep_dive'
    },
    {
      id: 14,
      timeSlot: '深夜',
      userStatus: '疲れ気味',
      title: '脳を休ませる呼吸',
      actionName: 'ブレインオフ',
      logic: '思考を停止し休息モードへ。',
      steps: [
        '長く吐く',
        '短く吸う',
        '呼吸だけに集中'
      ],
      effect: 'brain_rest'
    },
  
    // ……（このパターンで id 50 まで拡張可能）
  ]
  