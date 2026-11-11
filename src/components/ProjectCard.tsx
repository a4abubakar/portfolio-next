import Image from "next/image";
import type { Project } from "@/data/projects";
import { ProjectArt } from "@/components/ProjectArt";
import { SafeLink } from "@/components/SafeLink";

const linkBase =
  "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors";
const activeLink = `${linkBase} bg-ink text-bg hover:bg-accent hover:text-accent-contrast`;
const outlineLink = `${linkBase} border border-line text-ink hover:bg-surface-2`;
const pendingLink = `${linkBase} cursor-not-allowed border border-dashed border-line text-muted`;

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const headingId = `project-${project.slug}`;

  return (
    <article
      aria-labelledby={headingId}
      data-testid="project-card"
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[8/5] overflow-hidden bg-surface-2">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <ProjectArt art={project.art} title={project.title} id={project.slug} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">Project {String(index + 1).padStart(2, "0")}</p>
        <h3 id={headingId} className="mt-1 text-xl font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 text-muted">{project.summary}</p>

        <ul className="mt-4 space-y-2 text-sm">
          {project.highlights.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li key={tech} className="rounded-md bg-surface-2 px-2 py-1 font-mono text-xs text-muted">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <SafeLink
            url={project.liveUrl}
            pendingLabel="live demo coming soon"
            className={activeLink}
            pendingClassName={pendingLink}
            ariaLabel={`Live demo of ${project.title}`}
          >
            Live demo
          </SafeLink>
          <SafeLink
            url={project.repoUrl}
            pendingLabel="source code coming soon"
            className={outlineLink}
            pendingClassName={pendingLink}
            ariaLabel={`Source code of ${project.title} on GitHub`}
          >
            Source code
          </SafeLink>
        </div>
      </div>
    </article>
  );
}
