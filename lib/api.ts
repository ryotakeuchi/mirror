type SendMessageParams = {
  message: string
  personaInstruction: string
}

export async function sendMessageToDify({
  message,
  personaInstruction,
}: SendMessageParams) {
  const res = await fetch('/api/dify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: {
        persona_instruction: personaInstruction,
      },
      query: message,
    }),
  })

  if (!res.ok) {
    throw new Error('Dify API Error')
  }

  return res.json()
}
