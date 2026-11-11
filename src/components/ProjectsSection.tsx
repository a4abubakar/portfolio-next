import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        id="projects-title"
        eyebrow="Selected work"
        title="Projects"
        intro="Three self-contained apps that show how I handle forms, data and email. They run on mock data, with tests and no backend to set up."
      />
      {projects.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-line p-8 text-center text-muted">Projects are on their way.</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
