// app/error.tsx
"use client";

import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-mirror-beige-light">
      <h1 className="text-2xl font-bold text-mirror-charcoal mb-2">Something went wrong</h1>
      <p className="text-mirror-charcoal mb-4">{error.message}</p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-mirror-primary text-white rounded-lg shadow-mirror-neumorphic"
        >
          Retry
        </button>
        <Link
          href="/"
          className="px-4 py-2 bg-white/20 backdrop-blur-md text-mirror-charcoal rounded-lg shadow-mirror-neumorphic"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
