import { Suspense } from "react";
import { GitHubActivityChart, GitHubActivityHeading, GitHubActivitySkeleton } from "@/components/GitHubActivity";

export function GitHubSection() {
  return (
    <section id="activity" aria-labelledby="activity-title" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <GitHubActivityHeading />
      <Suspense fallback={<GitHubActivitySkeleton />}>
        <GitHubActivityChart />
      </Suspense>
    </section>
  );
}
