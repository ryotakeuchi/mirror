export type Persona = {
  id: string
  name: string
  avatarImage: string
  initialGreeting: string
  systemPrompt: string

  themeColors: {
    background: string
    accent: string
    text: string
  }

  avatarExpressions: {
    normal: string
    happy: string
    concerned: string
    serious: string
  }
}


export const personas: Persona[] = [
  {
    id: 'asami',
    name: '麻美',
    avatarImage: 'https://api.dicebear.com/7.x/lorelei/svg?seed=asami',
    initialGreeting: '今日の調子、鏡みたいに一緒に見ていこ。',
    systemPrompt: 'あなたは優しく寄り添うAIメンターです。',

    themeColors: {
      background: '#F5F5F0',
      accent: '#E5DED4',
      text: '#4A4A4A',
    },

    avatarExpressions: {
      normal: 'https://api.dicebear.com/7.x/lorelei/svg?seed=asami',
      happy: 'https://api.dicebear.com/7.x/lorelei/svg?seed=asami-happy',
      concerned: 'https://api.dicebear.com/7.x/lorelei/svg?seed=asami-concerned',
      serious: 'https://api.dicebear.com/7.x/lorelei/svg?seed=asami-serious',
    },
  },
]

