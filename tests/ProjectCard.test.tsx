import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/data/projects";

const base: Project = {
  slug: "demo",
  title: "Demo Project",
  summary: "A demo.",
  highlights: ["One thing", "Another thing"],
  tech: ["React", "TypeScript"],
  liveUrl: "TODO",
  repoUrl: "TODO",
  art: { variant: "form", from: "#000", to: "#fff" },
};

describe("ProjectCard", () => {
  it("shows disabled placeholders instead of dead links while URLs are TODO", () => {
    render(<ProjectCard project={base} index={0} />);
    const card = screen.getByRole("article", { name: "Demo Project" });
    expect(card.querySelectorAll("a[href]")).toHaveLength(0);
    expect(card.querySelectorAll("[data-placeholder='true']")).toHaveLength(2);
    expect(card).toHaveTextContent("live demo coming soon");
  });

  it("renders real external links that open safely once URLs are set", () => {
    render(
      <ProjectCard
        project={{ ...base, liveUrl: "https://demo.example.com", repoUrl: "https://github.com/me/demo" }}
        index={1}
      />,
    );
    const live = screen.getByRole("link", { name: "Live demo of Demo Project" });
    expect(live).toHaveAttribute("href", "https://demo.example.com");
    expect(live).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: /Source code of Demo Project/ })).toHaveAttribute(
      "href",
      "https://github.com/me/demo",
    );
    expect(screen.getByText("Project 02")).toBeInTheDocument();
  });

  it("lists the highlights and tech", () => {
    render(<ProjectCard project={base} index={0} />);
    expect(screen.getByText("One thing")).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Technologies" })).toHaveTextContent("TypeScript");
  });
});
