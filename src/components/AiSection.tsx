import { aiWork } from "@/data/ai";
import { SectionHeading } from "@/components/SectionHeading";

const icons: Record<string, React.ReactNode> = {
  "clickup-github-agents": (
    <path d="M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 9a9 9 0 0 1-9 9" />
  ),
  "email-plugins": <path d="M4 6h16v12H4zM4 7l8 6 8-6" />,
  "ai-assisted-development": <path d="M12 3l2.2 5.3L20 9l-4.4 3.8L17 18.5 12 15.6 7 18.5l1.4-5.7L4 9l5.8-.7z" />,
};

export function AiSection() {
  return (
    <section id="ai" aria-labelledby="ai-title" className="border-y border-line bg-surface-2/50">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          id="ai-title"
          eyebrow="AI and automation"
          title="AI engineering"
          intro="At InsuranceMarket.ae I build AI agents and Claude tooling that take repetitive work out of how we ship software and emails."
        />

        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {aiWork.map((item) => (
            <li key={item.slug} data-testid="ai-card">
              <article
                aria-labelledby={`ai-${item.slug}`}
                className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm"
              >
                <span aria-hidden="true" className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">
                  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {icons[item.slug]}
                  </svg>
                </span>
                <h3 id={`ai-${item.slug}`} className="mt-4 text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted">{item.summary}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 rounded-xl bg-accent-soft px-4 py-3 text-sm font-medium text-ink">
                  <span className="sr-only">Impact: </span>
                  {item.impact}
                </p>
                <ul aria-label="Technologies" className="mt-auto flex flex-wrap gap-1.5 pt-5">
                  {item.tech.map((tech) => (
                    <li key={tech} className="rounded-md bg-surface-2 px-2 py-1 font-mono text-xs text-muted">
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
