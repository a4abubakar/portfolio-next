import { skillGroups } from "@/data/skills";
import { SectionHeading } from "@/components/SectionHeading";

/** Stretch a lone last card across the row so the grid never ends with a gap (2 columns on tablet, 3 on desktop). */
export function lastCardSpan(index: number, count: number): string {
  if (index !== count - 1) return "";
  const classes: string[] = [];
  if (count % 2 === 1) classes.push("sm:col-span-2");
  if (count % 3 === 1) classes.push("lg:col-span-3");
  else if (count % 2 === 1) classes.push("lg:col-span-1");
  return classes.join(" ");
}

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        id="skills-title"
        eyebrow="Toolbox"
        title="Skills"
        intro="Frontend first, with the backend, testing and AI tooling to ship features end to end."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <section
            key={group.id}
            aria-labelledby={`skills-${group.id}`}
            data-testid="skill-group"
            className={`rounded-2xl border border-line bg-surface p-6 ${lastCardSpan(index, skillGroups.length)}`}
          >
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
