// lib/api.ts

type SendMessageToDifyArgs = {
  message: string
  personaInstruction: string
  onStream?: (partialResponse: string) => void
}

export async function sendMessageToDify({
  message,
  personaInstruction,
  onStream,
}: SendMessageToDifyArgs): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DIFY_API_BASE_URL}/v1/chat-messages`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DIFY_API_KEY}`,
      },
      body: JSON.stringify({
        inputs: {
          persona_instruction: personaInstruction,
        },
        query: message,
        response_mode: 'streaming',
        user: 'mirror-user',
      }),
    }
  )

  if (!response.ok || !response.body) {
    throw new Error('Dify API request failed')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder('utf-8')

  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })

    /**
     * Dify streaming format:
     * data: {"event":"message","answer":"こんにちは"}
     * data: {"event":"message","answer":"お疲れ様です"}
     */
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''

    for (const line of lines) {
      if (!line.startsWith('data:')) continue

      const jsonStr = line.replace(/^data:\s*/, '').trim()
      if (!jsonStr || jsonStr === '[DONE]') continue

      try {
        const parsed = JSON.parse(jsonStr)

        if (parsed.event === 'message' && parsed.answer) {
          onStream?.(parsed.answer)
        }
      } catch (e) {
        console.warn('Failed to parse Dify stream chunk', e)
      }
    }
  }
}
