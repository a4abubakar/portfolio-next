"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-4 px-4 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Something went wrong</p>
      <h1 className="text-3xl font-semibold tracking-tight">This page hit an unexpected error.</h1>
      <p className="text-muted">You can try again, or head back to the start.</p>
      <div className="flex gap-3">
        <button type="button" onClick={reset} className="rounded-full bg-accent px-5 py-2.5 font-semibold text-accent-contrast hover:bg-accent-strong">
          Try again
        </button>
        <Link href="/" className="rounded-full border border-line px-5 py-2.5 font-semibold hover:bg-surface-2">
          Home
        </Link>
      </div>
    </main>
  );
}
