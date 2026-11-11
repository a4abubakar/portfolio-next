export type ProjectArtVariant = "form" | "dashboard" | "builder";

export interface Project {
  slug: string;
  title: string;
  summary: string;
  highlights: string[];
  tech: string[];
  /**
   * Live demo URL. Keep `TODO` until deployed; the UI shows a "coming soon"
   * placeholder instead of a dead link.
   */
  liveUrl: string;
  /** GitHub repository URL. Keep `TODO` until pushed. */
  repoUrl: string;
  /**
   * Optional screenshot path under `public/` (for example `/projects/quote-compare.png`).
   * When empty, a generated SVG placeholder is shown. See README for how to swap it in.
   */
  image?: string;
  art: { variant: ProjectArtVariant; from: string; to: string };
}

export const projects: Project[] = [
  {
    slug: "insurance-quote-compare",
    title: "Insurance Quote Compare",
    summary:
      "A quote journey for a fictional insurer: a multi-step form with schema validation, then comparable results.",
    highlights: [
      "Multi-step quote form validated with react-hook-form and zod",
      "Results with URL-synced filters and sorting, so every view is shareable",
      "Side-by-side compare of selected plans",
    ],
    tech: ["Next.js", "React", "TypeScript", "react-hook-form", "zod", "Tailwind CSS"],
    liveUrl: "TODO",
    repoUrl: "TODO",
    art: { variant: "form", from: "#c2410c", to: "#f59e0b" },
  },
  {
    slug: "renewals-analytics-dashboard",
    title: "Renewals Analytics Dashboard",
    summary:
      "A data-dense dashboard for tracking policy renewals, backed by a mock API route.",
    highlights: [
      "KPI cards and Recharts charts",
      "Sortable, paginated table with filters kept in the URL",
      "CSV export and a mock API route",
    ],
    tech: ["Next.js", "React", "TypeScript", "Recharts", "Tailwind CSS"],
    liveUrl: "TODO",
    repoUrl: "TODO",
    art: { variant: "dashboard", from: "#0f766e", to: "#38bdf8" },
  },
  {
    slug: "email-template-builder",
    title: "Email Template Builder",
    summary:
      "A block-based email editor that turns your layout into production-ready HTML email.",
    highlights: [
      "Block-based editor with live 600px and 375px previews",
      "Exports table-based email HTML with MSO/Outlook support",
      "Built from the same email-engineering practice I use at work",
    ],
    tech: ["Next.js", "React", "TypeScript", "HTML email", "Tailwind CSS"],
    liveUrl: "TODO",
    repoUrl: "TODO",
    art: { variant: "builder", from: "#6d28d9", to: "#ec4899" },
  },
];
