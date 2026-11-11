import { skillGroups } from "@/data/skills";
import { SectionHeading } from "@/components/SectionHeading";

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading id="skills-title" eyebrow="Toolbox" title="Skills" intro="What I reach for, grouped by the kind of problem it solves." />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <section key={group.id} aria-labelledby={`skills-${group.id}`} data-testid="skill-group" className="rounded-2xl border border-line bg-surface p-6">
            <h3 id={`skills-${group.id}`} className="text-lg font-semibold tracking-tight">
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="rounded-full border border-line bg-bg px-3 py-1.5 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
