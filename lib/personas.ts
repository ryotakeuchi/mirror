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
    avatarImage: 'avatar-mentor-asami.png',
    initialGreeting: '今日の調子、鏡みたいに一緒に見ていこ。',
    systemPrompt: 'あなたは優しく寄り添うAIメンターです。',

    themeColors: {
      background: '#F5F5F0',
      accent: '#E5DED4',
      text: '#4A4A4A',
    },

    //表情ごとにここは変える//
    avatarExpressions: {
      normal: 'avatar-mentor-asami.png',
      happy: 'avatar-mentor-asami.png',
      concerned: 'avatar-mentor-asami.png',
      serious: 'avatar-mentor-asami.png',
    },
  },
]

