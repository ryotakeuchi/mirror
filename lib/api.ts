import { Persona } from "./personas";

export interface DifyResponse {
  success: boolean;
  data?: {
    answer?: string;
    message_id?: string;
    conversation_id?: string;
    [key: string]: any;
  };
  error?: string;
  details?: string;
}

/**
 * Dify APIにメッセージを送信する関数
 * @param message - ユーザーが送信するメッセージ
 * @param persona - 選択されたペルソナ（オプション）
 * @returns Dify APIからのレスポンス
 */
export async function sendMessageToDify(
  message: string,
  persona?: Persona
): Promise<DifyResponse> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        personaId: persona?.id,
        personaInstruction: persona?.systemPrompt,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "リクエストに失敗しました",
        details: data.details,
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: "ネットワークエラーが発生しました",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
