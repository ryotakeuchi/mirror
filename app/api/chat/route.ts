import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message, personaInstruction } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "メッセージが必要です" },
        { status: 400 }
      );
    }

    const apiKey = process.env.DIFY_API_KEY;
    const apiUrl = process.env.DIFY_API_URL || "https://api.dify.ai/v1";

    if (!apiKey) {
      return NextResponse.json(
        { error: "DIFY_API_KEYが設定されていません" },
        { status: 500 }
      );
    }

    // inputsにpersona_instructionを追加
    const inputs: Record<string, any> = {};
    if (personaInstruction && typeof personaInstruction === "string") {
      inputs.persona_instruction = personaInstruction;
    }

    // Dify APIへのリクエスト
    const response = await fetch(`${apiUrl}/chat-messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        inputs: inputs,
        query: message,
        response_mode: "blocking",
        user: "user-123",
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Dify API Error:", errorData);
      return NextResponse.json(
        { error: "Dify APIからのエラーレスポンス", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      {
        error: "サーバーエラーが発生しました",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
