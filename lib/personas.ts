export type Persona = {
  id: string
  name: string
  avatarImage: string
  avatarExpressions: {
    normal: string
    happy: string
    concerned: string
    serious: string
  }
  initialGreeting: string
  systemPrompt: string
  themeColors: string[]
}

export const personas: Persona[] = [
  {
    id: 'asami',
    name: 'Asami',
    avatarImage:
      'https://api.dicebear.com/7.x/notionists/svg?seed=Asami',
    avatarExpressions: {
      normal:
        'https://api.dicebear.com/7.x/notionists/svg?seed=Asami',
      happy:
        'https://api.dicebear.com/7.x/notionists/svg?seed=Asami&mouth=smile',
      concerned:
        'https://api.dicebear.com/7.x/notionists/svg?seed=Asami&eyebrows=concerned',
      serious:
        'https://api.dicebear.com/7.x/notionists/svg?seed=Asami&eyes=serious',
    },
    initialGreeting: 'こんにちは。今日はどんな気分？',
    systemPrompt:
      'あなたは穏やかで寄り添うAIメンターです。',
    themeColors: [
      '#F5F5F0',
      '#E5DED4',
      '#D2B48C',
      '#A9A9A9',
      '#808080',
    ],
  },
]
