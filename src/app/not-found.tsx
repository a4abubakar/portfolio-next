import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-4 px-4 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">That page does not exist.</h1>
      <p className="text-muted">The link may be old, or the address mistyped.</p>
      <div>
        <Link href="/" className="inline-flex rounded-full bg-accent px-5 py-2.5 font-semibold text-accent-contrast hover:bg-accent-strong">
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
