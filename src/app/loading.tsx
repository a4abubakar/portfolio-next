export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="mx-auto flex min-h-dvh max-w-6xl flex-col justify-center gap-4 px-4 sm:px-6">
      <span className="sr-only">Loading</span>
      <div className="h-4 w-48 animate-pulse rounded bg-surface-2" />
      <div className="h-12 w-full max-w-2xl animate-pulse rounded bg-surface-2" />
      <div className="h-12 w-2/3 animate-pulse rounded bg-surface-2" />
    </div>
  );
}
