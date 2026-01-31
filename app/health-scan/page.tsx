"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AnalyzeResult = {
  weight: number | null;
  bodyFat: number | null;
  muscle: number | null;
};

export default function HealthScanPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResult>({
    weight: null,
    bodyFat: null,
    muscle: null,
  });

  /* ------------------------------
   * ファイル選択 & プレビュー
   * ------------------------------ */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selected);
  };

  /* ------------------------------
   * 画像を base64 にして API 呼び出し
   * ------------------------------ */
  const handleAnalyze = async () => {
    if (!file || !preview) return;

    setLoading(true);

    try {
      // 修正: preview (data:image/png;base64,...) をそのまま画像データとして送る
      // const base64 = preview.split(",")[1]; // この行は削除
      const imageData = preview; // preview変数は既にデータURI形式なのでそのまま使う

      const res = await fetch("/api/analyze-screenshot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageData }), // image: base64 から image: imageData に変更
      });

      if (!res.ok) {
        // エラーメッセージを詳細化
        const errorData = await res.json();
        throw new Error(errorData.error || "API request failed");
      }

      const data: AnalyzeResult = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert(`解析に失敗しました: ${error instanceof Error ? error.message : String(error)}`); // エラーメッセージを表示
    } finally {
      setLoading(false);
    }
  };


  /* ------------------------------
   * 保存（今回はダミー）
   * ------------------------------ */
  const handleSave = () => {
    console.log("Saved data:", result);
    alert("保存しました（ダミー）");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-12">
      <div className="mx-auto max-w-xl space-y-8">
        {/* タイトル */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight text-slate-900"
        >
          ヘルスデータ解析
        </motion.h1>

        {/* ファイル選択 */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <label className="block text-sm font-medium text-slate-700">
            スクリーンショットを選択
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-3 block w-full text-sm text-slate-500
              file:mr-4 file:rounded-full file:border-0
              file:bg-slate-900 file:px-4 file:py-2
              file:text-sm file:font-semibold file:text-white
              hover:file:bg-slate-700"
          />
        </div>

        {/* プレビュー */}
        <AnimatePresence>
          {preview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="overflow-hidden rounded-2xl bg-white p-4 shadow-sm"
            >
              <img
                src={preview}
                alt="Preview"
                className="mx-auto max-h-96 rounded-lg object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 解析ボタン */}
        <div className="flex justify-center">
          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="relative inline-flex items-center rounded-full bg-slate-900 px-8 py-3
              text-white transition hover:bg-slate-700 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                解析中...
              </span>
            ) : (
              "解析開始"
            )}
          </button>
        </div>

        {/* 解析結果 */}
        <AnimatePresence>
          {(result.weight !== null ||
            result.bodyFat !== null ||
            result.muscle !== null) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4 rounded-2xl bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                解析結果（編集可）
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-sm text-slate-600">体重 (kg)</label>
                  <input
                    type="number"
                    value={result.weight ?? ""}
                    onChange={(e) =>
                      setResult({ ...result, weight: Number(e.target.value) })
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-600">体脂肪率 (%)</label>
                  <input
                    type="number"
                    value={result.bodyFat ?? ""}
                    onChange={(e) =>
                      setResult({
                        ...result,
                        bodyFat: Number(e.target.value),
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-600">筋肉量 (kg)</label>
                  <input
                    type="number"
                    value={result.muscle ?? ""}
                    onChange={(e) =>
                      setResult({
                        ...result,
                        muscle: Number(e.target.value),
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* 保存ボタン */}
              <div className="pt-4 text-right">
                <button
                  onClick={handleSave}
                  className="rounded-full bg-emerald-600 px-6 py-2 text-white transition hover:bg-emerald-500"
                >
                  保存
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

