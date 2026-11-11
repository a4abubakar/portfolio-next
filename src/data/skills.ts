export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    items: [
      "React",
      "Next.js (App Router, RSC, SSR, SSG)",
      "React Native",
      "TypeScript",
      "JavaScript",
      "Redux",
      "Context",
    ],
  },
  {
    id: "styling",
    title: "Styling",
    items: ["Tailwind CSS", "MUI", "Ant Design", "Styled Components", "Design systems", "WCAG"],
  },
  {
    id: "email",
    title: "Email engineering",
    items: [
      "Maizzle",
      "Responsive, cross-client HTML email",
      "Dark-mode email",
      "Liquid",
      "WebEngage",
      "Brevo",
      "Postmark",
      "Bird",
    ],
  },
  {
    id: "quality",
    title: "Quality",
    items: ["Vitest", "Playwright", "Cypress", "Core Web Vitals", "SEO"],
  },
  {
    id: "ai",
    title: "AI & automation",
    items: ["Claude Code", "MCP", "AI agents", "ClickUp and GitHub automation"],
  },
  {
    id: "other",
    title: "Other",
    items: ["REST", "Python/Flask", "Firebase", "SharePoint SPFx", "Git", "Figma"],
  },
];
