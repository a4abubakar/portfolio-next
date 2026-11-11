import { experience } from "@/data/experience";
import { education } from "@/data/profile";
import { formatDuration, formatMonth, sortByRecency } from "@/lib/dates";
import { SectionHeading } from "@/components/SectionHeading";

export function ExperienceSection() {
  const roles = sortByRecency(experience);

  return (
    <section id="experience" aria-labelledby="experience-title" className="border-y border-line bg-surface-2/50">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading id="experience-title" eyebrow="Career" title="Experience" intro="9+ years of frontend work across Pakistan, the UAE, the US and Italy." />

        <ol className="relative mt-12 space-y-10 border-l-2 border-line pl-6 sm:pl-10" aria-label="Work history, most recent first">
          {roles.map((role) => {
            const duration = formatDuration(role.start, role.end);
            const isCurrent = role.end === null;
            return (
              <li key={role.id} data-testid="experience-item" className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[calc(1.5rem+7px)] top-2 size-3 rounded-full border-2 border-bg sm:-left-[calc(2.5rem+7px)] ${isCurrent ? "bg-accent ring-4 ring-accent/25" : "bg-muted"}`}
                />
                <div className="flex flex-col gap-x-6 gap-y-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {role.role} <span className="text-muted">at</span> {role.company}
                  </h3>
                  <p className="font-mono text-sm text-muted">
                    <time dateTime={role.start}>{formatMonth(role.start)}</time>
                    {" to "}
                    {role.end ? <time dateTime={role.end}>{formatMonth(role.end)}</time> : "present"}
                    {duration ? ` · ${duration}` : ""}
                  </p>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {role.location}
                  {role.note ? ` · ${role.note}` : ""}
                </p>
                <p className="mt-3 max-w-3xl">{role.summary}</p>
                {role.highlights.length > 0 && (
                  <ul className="mt-3 max-w-3xl space-y-2 text-muted">
                    {role.highlights.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {role.tech.length > 0 && (
                  <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-1.5">
                    {role.tech.map((tech) => (
                      <li key={tech} className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-xs text-muted">
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-14 rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Education</p>
          <h3 className="mt-2 text-lg font-semibold">{education.degree}</h3>
          <p className="text-muted">
            {education.school}, {education.location} · {education.period}
          </p>
        </div>
      </div>
    </section>
  );
}
