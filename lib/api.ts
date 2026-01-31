const DIFY_API_URL = process.env.NEXT_PUBLIC_DIFY_API_URL!;
const DIFY_API_KEY = process.env.NEXT_PUBLIC_DIFY_API_KEY!;

type DifyResponse = {
  answer: string;
};

export async function sendMessageToDify(
  message: string,
  personaInstruction: string
): Promise<DifyResponse> {
  const res = await fetch(DIFY_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${DIFY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: {
        persona_instruction: personaInstruction,
      },
      query: message,
      response_mode: "blocking",
      user: "mirror-user",
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch from Dify API");
  }

  const data = await res.json();

  return {
    answer: data.answer ?? "",
  };
}
