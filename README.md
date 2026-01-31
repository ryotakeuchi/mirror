# Mirror - AI Beauty Life OS

高級感のあるライフスタイルアプリケーション「Mirror」は、あなたの健康データを美しさに変換するAIライフOSです。

## 特徴

- **パーソナライズされた診断**: 5つの質問に答えて、10のペルソナから最適なAIメンターを割り当て
- **動的なホーム画面**: 時間に応じて変化する背景と、パーソナライズされたメッセージ
- **ムードベースのアクション**: 現在の気分に応じたアドバイスとアクション
- **プレミアムなUI/UX**: Glassmorphism、スムーズなアニメーション、洗練されたデザイン

## 技術スタック

- **Next.js 14** - React フレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS** - ユーティリティファーストのCSS
- **Framer Motion** - アニメーションライブラリ
- **Lucide React** - アイコンライブラリ

## セットアップ

1. 依存関係のインストール:
```bash
npm install
```

2. 環境変数の設定:
プロジェクトルートに `.env.local` ファイルを作成し、以下の環境変数を設定してください：

```env
DIFY_API_KEY=your_dify_api_key_here
DIFY_API_URL=https://api.dify.ai/v1
```

3. 開発サーバーの起動:
```bash
npm run dev
```

4. ブラウザで `http://localhost:3000` を開く

## プロジェクト構造

```
mirror/
├── app/                    # Next.js App Router
│   ├── onboarding/        # オンボーディングページ
│   ├── health-sync/       # ヘルスケア同期ページ
│   ├── diagnosis/         # 診断ページ（5ステップ）
│   ├── avatar-generation/ # アバター生成ページ
│   ├── home/              # ホーム画面
│   └── result/            # 結果ページ
├── contexts/              # React Context（状態管理）
├── lib/                   # ユーティリティとデータ
│   ├── personas.ts       # ペルソナデータと診断ロジック
│   └── api.ts            # Dify API連携関数
├── app/
│   └── api/
│       └── chat/         # Dify API連携エンドポイント
└── app/globals.css        # グローバルスタイル
```

## ペルソナ

10のペルソナが用意されており、診断結果に基づいて自動的に割り当てられます：

1. Nakamura Asami - エレガント/習慣/スタイル/ガイド/大人
2. Tanaka Minami - エレガント/ストイック/顔/ガイド/大人
3. MEGUMI - エレガント/習慣/顔/ガイド/大人
4. Nanao - エレガント/ストイック/ボディ/ガイド/大人
5. Goto Maki - エレガント/習慣/顔/友達/大人
6. KAZUHA - クール/ストイック/ボディ/ガイド/若い
7. SAKURA - キュート/ストイック/顔/ガイド/若い
8. Shigemori Satomi - キュート/習慣/顔/友達/若い
9. Meruru - キュート/習慣/スタイル/友達/若い
10. Nagomi - キュート/ストイック/ボディ/ガイド/若い
.

## ライセンス

MIT
