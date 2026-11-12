import Image from "next/image";
import { clientProjects, type ClientProject } from "@/data/clients";

function hostname(url: string): string {
  return new URL(url).hostname.replace(/^www\./, "");
}

function ClientCard({ client }: { client: ClientProject }) {
  const headingId = `client-${client.slug}`;
  return (
    <li data-testid="client-card">
      <article
        aria-labelledby={headingId}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-shadow hover:shadow-lg"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
          {client.image ? (
            <Image
              src={client.image}
              alt={`Screenshot of the ${client.name} website`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top"
            />
          ) : (
            <div
              role="img"
              aria-label={`${client.name} (illustration)`}
              className="grid h-full place-items-center"
              style={{ backgroundImage: `linear-gradient(135deg, ${client.colors.from}, ${client.colors.to})` }}
            >
              <span className="rounded-xl bg-white/90 px-5 py-3 text-2xl font-semibold tracking-tight text-neutral-900 shadow">
                {client.name}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">{client.category}</p>
          <h4 id={headingId} className="mt-1 text-lg font-semibold tracking-tight">
            {client.name}
          </h4>
          <p className="mt-2 text-sm text-muted">{client.summary}</p>
          <a
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${client.name} (opens in a new tab)`}
            className="mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            {hostname(client.url)}
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </div>
      </article>
    </li>
  );
}

export function ClientWork() {
  return (
    <div className="mt-20" aria-labelledby="client-work-title" role="region">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Production work</p>
      <h3 id="client-work-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        Client work
      </h3>
      <p className="mt-3 max-w-2xl text-muted">
        Live websites and apps I worked on for clients and employers, from social and fintech platforms to education.
      </p>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {clientProjects.map((client) => (
          <ClientCard key={client.slug} client={client} />
        ))}
      </ul>
    </div>
  );
}
