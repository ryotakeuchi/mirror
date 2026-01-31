import { NextResponse } from 'next/server';

export async function POST(req: Request) { // ← ここが重要！
  try {
    // ... ダミーの遅延処理 ...
    const dummyResult = { "weight": 55.0, "bodyFat": 25.0, "muscle": 28.0 };
    return NextResponse.json(dummyResult);
  } catch (error) {
    // ... エラーハンドリング ...
  }
}